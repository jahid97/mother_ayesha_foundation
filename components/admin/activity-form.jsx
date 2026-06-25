"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/image-upload"
import { Plus, X, Loader2, Upload } from "lucide-react"

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

const defaultActivity = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  date: "",
  category: "",
  coverImage: "",
  images: [],
  projectId: "",
  published: true,
  featured: false,
}

export default function ActivityForm({ activity, projects = [] }) {
  const router = useRouter()
  const [form, setForm] = useState(activity ? {
    ...activity,
    images: activity.images || [],
    projectId: activity.projectId || "",
  } : defaultActivity)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState("")
  const [uploadingIdx, setUploadingIdx] = useState(null)

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === "title" && !activity) next.slug = slugify(value)
      return next
    })
  }

  // Extra photo upload
  const uploadExtraPhoto = async (file, idx) => {
    if (!file) return
    setUploadingIdx(idx)
    try {
      const body = new FormData()
      body.append("file", file)
      body.append("folder", "activities")
      const res = await fetch("/api/upload", { method: "POST", body })
      if (!res.ok) throw new Error("Upload failed")
      const { url } = await res.json()
      setForm((prev) => {
        const images = [...prev.images]
        if (idx === images.length) images.push(url)
        else images[idx] = url
        return { ...prev, images }
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setUploadingIdx(null)
    }
  }

  const removeExtraPhoto = (idx) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const payload = {
      ...form,
      projectId: form.projectId || null,
      images: form.images.filter(Boolean),
    }

    try {
      const res = await fetch(
        activity ? `/api/admin/activities/${activity.id}` : "/api/admin/activities",
        {
          method: activity ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) throw new Error(await res.text())
      router.push("/admin/activities")
      router.refresh()
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Delete this activity? This cannot be undone.")) return
    setLoading(true)
    try {
      await fetch(`/api/admin/activities/${activity.id}`, { method: "DELETE" })
      router.push("/admin/activities")
      router.refresh()
    } catch {
      setError("Failed to delete")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6 max-w-2xl">
      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</p>}

      {/* Cover image */}
      <ImageUpload
        label="Cover Image"
        value={form.coverImage}
        onChange={(url) => setForm((p) => ({ ...p, coverImage: url }))}
        aspectRatio="aspect-video"
        folder="activities"
      />

      {/* Title + Slug */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input required value={form.title} onChange={set("title")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input required value={form.slug} onChange={set("slug")} placeholder="auto-generated from title" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input required type="date" value={form.date} onChange={set("date")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input value={form.category} onChange={set("category")} placeholder="e.g. Healthcare, Education" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        {projects.length > 0 && (
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Related Project <span className="text-gray-400 font-normal">(optional)</span></label>
            <select value={form.projectId} onChange={set("projectId")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]">
              <option value="">— None —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
        <textarea required value={form.excerpt} onChange={set("excerpt")} rows={2} placeholder="Short summary shown on the listing page" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
        <textarea required value={form.content} onChange={set("content")} rows={10} placeholder="Full activity description / update…" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
      </div>

      {/* Extra photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photos <span className="text-gray-400 font-normal">(upload or paste URLs — shown as a gallery on the detail page)</span></label>
        <div className="grid grid-cols-3 gap-3">
          {form.images.map((src, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
              {src ? (
                <>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExtraPhoto(idx)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-400 hover:text-[#4db6ac] transition-colors">
                  {uploadingIdx === idx ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadExtraPhoto(e.target.files?.[0], idx)} />
                </label>
              )}
            </div>
          ))}

          {/* Add new photo slot */}
          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#4db6ac] hover:text-[#4db6ac] text-gray-400 transition-colors">
            {uploadingIdx === form.images.length ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <Plus className="h-6 w-6" />
                <span className="text-xs mt-1">Add photo</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadExtraPhoto(e.target.files?.[0], form.images.length)} />
          </label>
        </div>

        {/* Also allow pasting URLs */}
        <button
          type="button"
          onClick={() => setForm((p) => ({ ...p, images: [...p.images, ""] }))}
          className="mt-2 text-xs text-[#4db6ac] hover:underline"
        >
          + Add photo by URL instead
        </button>
        {form.images.map((src, idx) =>
          src === "" ? (
            <div key={`url-${idx}`} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Paste image URL…"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
                onChange={(e) => {
                  const val = e.target.value
                  setForm((p) => { const imgs = [...p.images]; imgs[idx] = val; return { ...p, images: imgs } })
                }}
              />
              <button type="button" onClick={() => removeExtraPhoto(idx)} className="text-gray-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null
        )}
      </div>

      {/* Flags */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={set("published")} className="h-4 w-4 accent-[#4db6ac]" />
          <span className="text-sm font-medium text-gray-700">Published (visible on site)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={set("featured")} className="h-4 w-4 accent-[#4db6ac]" />
          <span className="text-sm font-medium text-gray-700">Featured</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button type="submit" disabled={loading} className="bg-[#4db6ac] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3d9d93] disabled:opacity-60 transition-colors">
          {loading ? "Saving…" : activity ? "Save Changes" : "Create Activity"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        {activity && (
          <button type="button" onClick={handleDelete} disabled={loading} className="ml-auto px-4 py-2 rounded-lg text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
