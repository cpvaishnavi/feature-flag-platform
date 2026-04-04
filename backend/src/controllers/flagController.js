const prisma = require("../prisma")

exports.createFlag = async (req, res) => {
  try {
    const { name, description, rollout } = req.body

    const flag = await prisma.featureFlag.create({
  data: {
    name,
    description,
    rollout: rollout || 0,
    createdBy: req.user.userId
  }
})

    res.json(flag)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error creating flag" })
  }
}

exports.getFlags = async (req, res) => {
  try {
    const flags = await prisma.featureFlag.findMany()
    res.json(flags)
  } catch (error) {
    res.status(500).json({ message: "Error fetching flags" })
  }
}

exports.evaluateFlag = async (req, res) => {
  try {
    const { flagName } = req.params

    const flag = await prisma.featureFlag.findUnique({
      where: { name: flagName }
    })

    if (!flag) {
      return res.status(404).json({ message: "Flag not found" })
    }

     if (!flag.isActive) {
      return res.json({
        flag: flag.name,
        enabled: false
      })
    }

    const userId = req.user.userId

    const percentage = userId % 100
    const enabled = percentage < flag.rollout

    res.json({
      flag: flag.name,
      enabled
    })
  } catch (error) {
    res.status(500).json({ message: "Error evaluating flag" })
  }
}

exports.toggleFlag = async (req, res) => {
  try {
    const { flagName } = req.params

    const flag = await prisma.featureFlag.findUnique({
      where: { name: flagName }
    })

    if (!flag) {
      return res.status(404).json({ message: "Flag not found" })
    }

    const updated = await prisma.featureFlag.update({
      where: { name: flagName },
      data: { isActive: !flag.isActive }
    })

    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: "Error toggling flag" })
  }
}

exports.updateRollout = async (req, res) => {
  try {
    const { flagName } = req.params
    const { rollout } = req.body

    const updated = await prisma.featureFlag.update({
      where: { name: flagName },
      data: { rollout }
    })

    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: "Error updating rollout" })
  }
}

exports.deleteFlag = async (req, res) => {
  try {
    const { flagName } = req.params

    await prisma.featureFlag.delete({
      where: { name: flagName }
    })

    res.json({ message: "Flag deleted" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting flag" })
  }
}