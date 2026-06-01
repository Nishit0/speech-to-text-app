const express = require("express")
const router = express.Router()

const upload = require("../middleware/uploadMiddleware")

const protect =
 require(
 "../middleware/authMiddleware"
)

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
  protect,
  getTranscriptions
)

module.exports = router