"use client"

import { useState } from "react"
import ImageUpload from "@/components/admin/image-upload"

export default function SiteSettingsForm({ settings }) {
  const [heroBackground, setHeroBackground] = useState(settings.heroBackground || "")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  const handleSave = async () => {
    setLoading(true)
    setError("")
    setSaved(false)
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroBackground }),
      })
      if (!res.ok) throw new Error(await res.text())
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-1">Page Hero Background</h2>
        <p className="text-sm text-gray-500 mb-4">
          This image is used as the background on all inner page headers (Projects, Blog, Gallery, Contact).
        </p>
        <ImageUpload
          label="Background Image"
          value={heroBackground}
          onChange={setHeroBackground}
          aspectRatio="aspect-[3/1]"
          folder="site"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#4db6ac] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3d9d93] disabled:opacity-60 transition-colors"
        >
          {loading ? "Saving…" : "Save Settings"}
        </button>
        {saved && <span className="text-sm text-green-600">Saved successfully.</span>}
      </div>
    </div>
  )
}
