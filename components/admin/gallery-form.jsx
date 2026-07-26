"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/image-upload"
import VideoUpload from "@/components/admin/video-upload"

const defaultImage = {
  src: "",
  type: "image",
  alt: "",
  category: "",
  location: "",
  date: "",
  label: "",
  featured: false,
}

export default function GalleryForm({ image }) {
  const router = useRouter()
  const [form, setForm] = useState(image ? {
    ...image,
    date:  image.date  ? image.date.split("T")[0] : "",
    label: image.label || "",
    type:  image.type || "image",
  } : defaultImage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const payload = {
      ...form,
      date: form.date ? new Date(form.date).toISOString() : null,
    }

    try {
      const res = await fetch(
        image ? `/api/admin/gallery/${image.id}` : "/api/admin/gallery",
        {
          method: image ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) throw new Error(await res.text())
      router.push("/admin/gallery")
      router.refresh()
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Delete this image? This cannot be undone.")) return
    setLoading(true)
    try {
      await fetch(`/api/admin/gallery/${image.id}`, { method: "DELETE" })
      router.push("/admin/gallery")
      router.refresh()
    } catch {
      setError("Failed to delete")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-5 max-w-lg">
      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</p>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <div className="flex gap-2">
            {["image", "video"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((p) => ({ ...p, type: t, src: p.type === t ? p.src : "" }))}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors capitalize ${
                  form.type === t
                    ? "bg-[#4db6ac] text-white border-[#4db6ac]"
                    : "border-gray-300 text-gray-600 hover:border-[#4db6ac] hover:text-[#4db6ac]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {form.type === "video" ? (
          <VideoUpload
            label="Video *"
            value={form.src}
            onChange={(url) => setForm((p) => ({ ...p, src: url }))}
            folder="gallery"
          />
        ) : (
          <ImageUpload
            label="Image *"
            value={form.src}
            onChange={(url) => setForm((p) => ({ ...p, src: url }))}
            aspectRatio="aspect-video"
            folder="gallery"
          />
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text *</label>
          <input required value={form.alt} onChange={set("alt")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input value={form.category} onChange={set("category")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input value={form.location} onChange={set("location")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label <span className="text-gray-400 font-normal">(optional — groups photos together)</span></label>
          <input value={form.label} onChange={set("label")} placeholder="e.g. Healthcare Camp 2024, Eid Celebration" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input type="date" value={form.date} onChange={set("date")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" checked={form.featured} onChange={set("featured")} className="h-4 w-4 accent-[#4db6ac]" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured on homepage</label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-[#4db6ac] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3d9d93] disabled:opacity-60 transition-colors">
          {loading ? "Saving..." : image ? "Save Changes" : "Add Image"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        {image && (
          <button type="button" onClick={handleDelete} disabled={loading} className="ml-auto px-4 py-2 rounded-lg text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
