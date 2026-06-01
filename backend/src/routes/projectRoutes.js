console.log("PROJECT ROUTES LOADED")

const express = require("express")
const prisma = require("../prisma")
const authMiddleware =
  require("../middleware/authMiddleware")

const router = express.Router()

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
  try {
    const projects =
  await prisma.project.findMany({
    where: {
      ownerId: req.user.userId
    },
        orderBy: {
          createdAt: "desc"
        }
      })

    res.json(projects)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: error.message
    })
  }
})

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const { name } = req.body

      const project =
        await prisma.project.create({
          data: {
            name,
            ownerId: req.user.userId
          }
        })

      res.status(201).json(project)
    } catch (error) {
      console.error(error)

      res.status(500).json({
        message: "Failed to create project"
      })
    }
  }
)

module.exports = router