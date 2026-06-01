const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db")
const transcriptionRoutes = require("./routes/transcriptionRoutes")
const authRoutes =
 require(
 "./routes/authRoutes"
)

dotenv.config()

connectDB()

const app = express()

app.use(express.json())   // ADD THIS LINE

app.use(cors())

app.use(
 "/api/auth",
 authRoutes
)

app.use("/api/transcription", transcriptionRoutes)

app.get("/", (req, res) => {
  res.send("Backend Running")
})

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message:
 err.message ||
 "Internal server error",
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})