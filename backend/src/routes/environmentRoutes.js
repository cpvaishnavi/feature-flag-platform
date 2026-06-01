const express = require("express")
const prisma = require("../prisma")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const environments =
      await prisma.environment.findMany({
        include: {
          project: true
        }
      })

    res.json(environments)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to fetch environments"
    })
  }
})

router.post("/", async (req, res) => {
  try {
    const { name, projectId } = req.body

    const environment =
      await prisma.environment.create({
        data: {
          name,
          projectId
        }
      })

    res.status(201).json(environment)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to create environment"
    })
  }
})

module.exports = router