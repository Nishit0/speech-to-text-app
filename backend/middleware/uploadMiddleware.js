const multer = require("multer")
const fs = require("fs")
const path = require("path")

const uploadDir = path.join(__dirname, "..", "uploads")

fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9)

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    )
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "audio/mpeg",
    "audio/wav",
    "audio/webm",
    "audio/mp4",
    "audio/x-m4a",
  ]

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true)
  } else {
    cb(
      new Error(
        "Only audio files allowed"
      )
    )
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

module.exports = upload
