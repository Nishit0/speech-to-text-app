const Transcription = require("../models/Transcription")

const uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      })
    }

    const newTranscription =
      await Transcription.create({
        fileName: req.file.filename,
        filePath: req.file.path,
      })

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: newTranscription,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  uploadAudio,
}