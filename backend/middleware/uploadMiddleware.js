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
  console.log(file)

  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

module.exports = upload
