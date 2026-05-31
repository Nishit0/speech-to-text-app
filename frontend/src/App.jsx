import { useState, useEffect } from "react"
import axios from "axios"

function App() {
  const [audioFile, setAudioFile] = useState(null)
  const [transcription, setTranscription] = useState("")
  const [loading, setLoading] = useState(false)

  const [recording, setRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] =
    useState(null)
const [history, setHistory] =
  useState([])
  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0])
  }

  const startRecording = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        })

      const recorder =
        new MediaRecorder(stream)

      const chunks = []

      recorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, {
          type: "audio/webm",
        })

        const file = new File(
          [audioBlob],
          "recording.webm",
          {
            type: "audio/webm",
          }
        )

        setAudioFile(file)

        recorder.onstop = () => {
          alert("Recording saved. Click upload.")
  const audioBlob = new Blob(chunks, {
    type: "audio/webm",
  })

  const file = new File(
    [audioBlob],
    "recording.webm",
    {
      type: "audio/webm",
    }
  )

  setAudioFile(file)

  alert(
    "Recording saved. Click Upload Audio."
  )

  stream.getTracks().forEach((track) =>
    track.stop()
  )
}

        stream.getTracks().forEach((track) =>
          track.stop()
        )
      }

      recorder.start()

      setMediaRecorder(recorder)
      setRecording(true)
    } catch (error) {
      console.error(error)

      alert("Microphone access denied")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()

      setRecording(false)
    }
  }

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Please select or record audio")
      return
    }

    try {
      setTranscription("")
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

      alert(
        error?.response?.data?.message ||
        error.message ||
        "Upload failed"
      )
    } finally {
      setLoading(false)
    }
  }

const fetchHistory = async () => {
  try {
    const response =
      await axios.get(
        "http://localhost:5000/api/transcription/history"
      )

    setHistory(response.data.data)
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  const loadHistory = async () => {
    await fetchHistory()
  }

  loadHistory()
}, [])


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-8">
          Speech to Text App
        </h1>

        <input
          type="file"
          accept=".mp3,.wav,.m4a,.webm,audio/mp4,audio/x-m4a"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />

        <p className="mb-4">
{audioFile && (
  <audio
    controls
    className="w-full mb-4"
    src={URL.createObjectURL(audioFile)}
  />
)}
        </p>

        <button
          onClick={
            recording
              ? stopRecording
              : startRecording
          }
          className="bg-red-500 text-white px-6 py-2 rounded-lg w-full mb-4"
        >
          {recording
            ? "Recording.... Click to Stop"
            : "Start Recording"}
        </button>
        {recording && (
  <p className="text-red-500 text-center mt-2 animate-pulse">
    ● Recording in progress...
  </p>
)}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full"
        >
          {loading
 ? "Processing Audio..."
 : "Upload Audio"}
 {loading && (
  <div className="text-center mt-3">
    Processing transcription...
  </div>
)}
        </button>

        {transcription && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">
              Transcription
            </h2>

            <div className="bg-gray-100 p-4 rounded-lg">
              {transcription}
            </div>
          </div>
        )}
        <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">
    History
  </h2>

  {history.length === 0 ? (
  <p>No transcriptions yet</p>
) : (
  history.map((item) => (
    <div
      key={item._id}
      className="bg-white border shadow-sm p-4 rounded-xl mb-4"
    >
      <p className="font-semibold">
        {item.fileName}
      </p>

      <p className="text-sm text-gray-500 mb-2">
        {new Date(
          item.createdAt
        ).toLocaleString()}
      </p>

      <p>{item.transcription}</p>
    </div>
  ))
)}
</div>

      </div>
    </div>
  )
}

export default App