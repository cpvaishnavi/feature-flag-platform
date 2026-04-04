const express = require("express")
const router = express.Router()

const flagController = require("../controllers/flagController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, flagController.createFlag)
router.get("/", authMiddleware, flagController.getFlags)

router.get("/:flagName/evaluate", authMiddleware, flagController.evaluateFlag)

router.patch("/:flagName/toggle", authMiddleware, flagController.toggleFlag)
router.patch("/:flagName/rollout", authMiddleware, flagController.updateRollout)
router.delete("/:flagName", authMiddleware, flagController.deleteFlag)

module.exports = router