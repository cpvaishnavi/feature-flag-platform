const express = require("express")
const prisma = require("../prisma")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const projects =
      await prisma.project.findMany({
        orderBy: {
          createdAt: "desc"
        }
      })

    res.json(projects)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to fetch projects"
    })
  }
})

router.post("/", async (req, res) => {
  try {
    const { name } = req.body

    const project =
      await prisma.project.create({
        data: {
          name
        }
      })

    res.status(201).json(project)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to create project"
    })
  }
})
module.exports = router