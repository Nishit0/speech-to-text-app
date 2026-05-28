const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db")
const transcriptionRoutes = require("./routes/transcriptionRoutes")

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use("/api/transcription", transcriptionRoutes)

app.get("/", (req, res) => {
  res.send("Backend Running")
})

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
