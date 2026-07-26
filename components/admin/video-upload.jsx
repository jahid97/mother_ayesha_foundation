"use client"

import { useRef, useState } from "react"
import { upload } from "@vercel/blob/client"
import { Upload, X, Loader2, Video as VideoIcon } from "lucide-react"

const MAX_VIDEO_MB = 100

function isBlobUrl(url) {
  return typeof url === "string" && url.includes("blob.vercel-storage.com")
}

async function deleteFromBlob(url) {
  if (!isBlobUrl(url)) return
  await fetch("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
}

export default function VideoUpload({ value, onChange, label = "Video", folder = "uploads" }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("video/")) {
      setError("Please select a video file.")
      return
    }
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      setError(`Video must be under ${MAX_VIDEO_MB} MB.`)
      return
    }

    setError("")
    setUploading(true)
    setProgress(0)

    const previous = value

    try {
      const blob = await upload(`${folder}/${Date.now()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload/video",
        onUploadProgress: ({ percentage }) => setProgress(percentage),
      })
      await deleteFromBlob(previous)
      onChange(blob.url)
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  const handleClear = async () => {
    await deleteFromBlob(value)
    onChange("")
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div
        className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-[#4db6ac] transition-colors group"
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {value ? (
          <>
            <video src={value} className="absolute inset-0 w-full h-full object-cover" muted preload="metadata" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Upload className="h-6 w-6 text-white" />
              <span className="text-white text-xs font-medium">Click to replace</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 select-none">
            {uploading ? <Loader2 className="h-8 w-8 animate-spin text-[#4db6ac]" /> : <VideoIcon className="h-8 w-8" />}
            <span className="text-sm">{uploading ? `Uploading… ${progress}%` : "Click to upload a video"}</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#4db6ac]" />
            <span className="text-xs text-[#3d3d3d] font-medium">{progress}%</span>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste a video URL…"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]/30 focus:border-[#4db6ac]"
        />
        {value && (
          <button type="button" onClick={handleClear} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Remove video">
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-[#4db6ac] hover:text-[#4db6ac] transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? `${progress}%` : "Upload"}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
      <p className="text-[11px] text-gray-400">Max {MAX_VIDEO_MB}MB · MP4, WebM, MOV</p>
    </div>
  )
}
