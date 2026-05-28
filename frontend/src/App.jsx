import { useState } from "react"
import axios from "axios"

function App() {
  const [audioFile, setAudioFile] = useState(null)
  const [transcription, setTranscription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Please select an audio file")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append("audio", audioFile)

      const response = await axios.post(
        "http://localhost:5000/api/transcription/upload",
        formData
      )

      setTranscription(
        response.data.data.transcription
      )
    } catch (error) {
  console.error(error)

  console.log(error.response)

  alert(
    error.response?.data?.message ||
    "Upload failed"
  )
}finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Speech to Text App
        </h1>

        <input
          type="file"
          accept=".mp3,.wav,.m4a,.webm,audio/mp4,audio/x-m4a"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700"
        >
          {loading
            ? "Generating Transcription..."
            : "Upload Audio"}
        </button>

        {transcription && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Transcription
            </h2>

            <div className="bg-gray-100 p-4 rounded-lg">
              {transcription}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App