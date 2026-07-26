"use client"

import { useState, useEffect, useRef } from "react"
import { upload } from "@vercel/blob/client"
import { X, Search, Upload, Loader2, Check, Images, Play } from "lucide-react"

function filename(url) {
  try {
    const parts = new URL(url).pathname.split("/")
    return parts[parts.length - 1]
  } catch {
    return url
  }
}

export default function MediaPicker({ onSelect, onClose, multiple = false, selected = [], mediaType = "image" }) {
  const [blobs,     setBlobs]     = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState("")
  const [search,    setSearch]    = useState("")
  const [picked,    setPicked]    = useState(selected)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const noun = mediaType === "video" ? "video" : mediaType === "all" ? "media" : "image"

  useEffect(() => {
    fetch(`/api/admin/blob-library?type=${mediaType}`)
      .then((r) => r.json())
      .then((data) => { setBlobs(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => { setError("Could not load media library."); setLoading(false) })
  }, [mediaType])

  const filtered = blobs.filter((b) =>
    !search || b.pathname.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (url) => {
    if (multiple) {
      setPicked((prev) => prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url])
    } else {
      onSelect(url)
      onClose()
    }
  }

  const confirmMultiple = () => {
    onSelect(picked)
    onClose()
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const isVideo = file.type.startsWith("video/")
    setUploading(true)
    try {
      let url
      if (isVideo) {
        const blob = await upload(`stories/${Date.now()}-${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/upload/video",
        })
        url = blob.url
      } else {
        const body = new FormData()
        body.append("file", file)
        body.append("folder", "stories")
        const res = await fetch("/api/upload", { method: "POST", body })
        if (!res.ok) throw new Error("Upload failed")
        ;({ url } = await res.json())
      }
      setBlobs((prev) => [{ url, pathname: filename(url), uploadedAt: new Date(), type: isVideo ? "video" : "image" }, ...prev])
      if (!multiple) { onSelect(url); onClose() }
      else setPicked((prev) => [...prev, url])
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Images className="h-5 w-5 text-[#4db6ac]" />
            <h2 className="text-lg font-semibold text-gray-800">Media Library</h2>
            {multiple && picked.length > 0 && (
              <span className="bg-[#4db6ac] text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {picked.length} selected
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by filename…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4db6ac]/40 focus:border-[#4db6ac]"
            />
          </div>
          <label className="flex items-center gap-2 px-4 py-2 bg-[#4db6ac] text-white text-sm font-medium rounded-lg hover:bg-[#3d9d93] transition-colors cursor-pointer shrink-0">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading…" : "Upload New"}
            <input
              ref={fileRef}
              type="file"
              accept={mediaType === "video" ? "video/*" : mediaType === "all" ? "image/*,video/*" : "image/*"}
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-[#4db6ac]" />
            </div>
          ) : error ? (
            <p className="text-center text-red-500 py-12">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No {noun}s found{search ? " for that search" : ""}.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filtered.map((blob) => {
                const isSelected = picked.includes(blob.url)
                return (
                  <button
                    key={blob.url}
                    type="button"
                    onClick={() => toggle(blob.url)}
                    className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected ? "border-[#4db6ac] ring-2 ring-[#4db6ac]/30" : "border-gray-200 hover:border-[#4db6ac]"
                    }`}
                  >
                    {blob.type === "video" ? (
                      <>
                        <video src={blob.url} className="w-full h-full object-cover" muted preload="metadata" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                          <div className="bg-black/50 rounded-full p-1.5">
                            <Play className="h-4 w-4 text-white fill-white" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img src={blob.url} alt="" className="w-full h-full object-cover" />
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#4db6ac]/20 flex items-center justify-center">
                        <div className="bg-[#4db6ac] rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-[10px] truncate">{filename(blob.url)}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer (multiple mode) */}
        {multiple && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">{picked.length} {noun}{picked.length !== 1 ? "s" : ""} selected</p>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="button" onClick={confirmMultiple} className="px-4 py-2 text-sm bg-[#4db6ac] text-white rounded-lg hover:bg-[#3d9d93] transition-colors font-medium">
                Add {picked.length > 0 ? `${picked.length} ` : ""}Selected
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
