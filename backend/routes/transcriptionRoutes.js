const express = require("express")
const router = express.Router()

const upload = require("../middleware/uploadMiddleware")

const {
  uploadAudio,
} = require("../controllers/transcriptionController")

router.post(
  "/upload",
  upload.single("audio"),
  uploadAudio
)

module.exports = router