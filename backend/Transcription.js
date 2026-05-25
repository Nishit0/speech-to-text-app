const mongoose = require("mongoose")

const transcriptionSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    transcription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  "Transcription",
  transcriptionSchema
)