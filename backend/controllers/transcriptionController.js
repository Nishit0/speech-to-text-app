const fs = require("fs")

const Transcription = require("../models/Transcription")

const openai = require("../config/openai")

const uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      })
    }

const transcriptionResponse = {
  text: "This is a mock transcription for testing frontend integration."
}

    const newTranscription =
      await Transcription.create({
        fileName: req.file.filename,
        filePath: req.file.path,
        transcription: transcriptionResponse.text,
      })

    res.status(201).json({
      success: true,
      message: "Transcription generated successfully",
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