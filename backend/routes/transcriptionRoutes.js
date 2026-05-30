const express = require("express")
const router = express.Router()

const upload = require("../middleware/uploadMiddleware")

const {
  uploadAudio,
  getTranscriptions,
} = require("../controllers/transcriptionController")

router.post(
  "/upload",
  upload.single("audio"),
  uploadAudio
)

router.get(
  "/history",
  getTranscriptions
)

module.exports = router