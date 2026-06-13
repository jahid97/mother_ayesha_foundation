"use client"

import { useRef, useState } from "react"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"

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

export default function ImageUpload({ value, onChange, label = "Image", aspectRatio = "aspect-video" }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.")
      return
    }

    setError("")
    setUploading(true)

    const previous = value
    await deleteFromBlob(previous)

    try {
      const body = new FormData()
      body.append("file", file)

      const res = await fetch("/api/upload", { method: "POST", body })
      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}))
        throw new Error(msg || "Upload failed")
      }
      const { url } = await res.json()
      onChange(url)
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

      {/* Preview / drop zone */}
      <div
        className={`relative w-full ${aspectRatio} rounded-lg overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-[#4db6ac] transition-colors group`}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none" }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Upload className="h-6 w-6 text-white" />
              <span className="text-white text-xs font-medium">Click to replace</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 select-none">
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-[#4db6ac]" />
            ) : (
              <ImageIcon className="h-8 w-8" />
            )}
            <span className="text-sm">{uploading ? "Uploading…" : "Click to upload an image"}</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#4db6ac]" />
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* URL text input as fallback */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste an image URL…"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]/30 focus:border-[#4db6ac]"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove image"
          >
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
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
