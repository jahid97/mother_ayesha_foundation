"use client"

import { useState } from "react"
import ImageUpload from "@/components/admin/image-upload"

const PAGES = [
  { key: "heroBackground_projects",   label: "Projects Page" },
  { key: "heroBackground_activities", label: "Activities Page" },
  { key: "heroBackground_blog",       label: "Blog Page" },
  { key: "heroBackground_gallery",    label: "Gallery Page" },
  { key: "heroBackground_contact",    label: "Contact Page" },
  { key: "heroBackground_stories",    label: "Stories Page" },
  { key: "heroBackground_about",      label: "About Us Page" },
]

export default function PageHeroBackgroundsForm({ settings }) {
  const [values, setValues] = useState(
    Object.fromEntries(PAGES.map((p) => [p.key, settings[p.key] || ""]))
  )
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
        body: JSON.stringify(values),
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
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-1">Page Hero Backgrounds</h2>
        <p className="text-sm text-gray-500">Set a background image for each page&apos;s hero section. Leave blank to use the default dark background.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PAGES.map(({ key, label }) => (
          <div key={key}>
            <ImageUpload
              label={label}
              value={values[key]}
              onChange={(url) => setValues((prev) => ({ ...prev, [key]: url }))}
              aspectRatio="aspect-[3/1]"
              folder="site"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="bg-[#4db6ac] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3d9d93] disabled:opacity-60 transition-colors"
        >
          {loading ? "Saving…" : "Save Backgrounds"}
        </button>
        {saved && <span className="text-sm text-green-600">Saved successfully.</span>}
      </div>
    </div>
  )
}
