const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")

const flagRoutes = require("./routes/flagRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)

app.use("/flags", flagRoutes)

app.get("/", (req, res) => {
  console.log("Request received")
  res.send("API running 🚀")
})

// keep server alive
const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

// prevent silent exit
process.on("uncaughtException", (err) => {
  console.error("Error:", err)
})