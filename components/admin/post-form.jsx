"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/image-upload"
import BlockEditor from "@/components/admin/block-editor"
import MediaPicker from "@/components/admin/media-picker"
import { X, Images, Video as VideoIcon } from "lucide-react"

const defaultPost = {
  slug: "",
  title: "",
  description: "",
  excerpt: "",
  content: "",
  author: "",
  date: "",
  category: "",
  image: "",
  images: [],
  videos: [],
  featured: false,
}

export default function PostForm({ post, type = "blog" }) {
  const router   = useRouter()
  const apiPath  = type === "blog" ? "/api/admin/blog" : "/api/admin/stories"
  const adminPath = type === "blog" ? "/admin/blog" : "/admin/stories"

  const [form, setForm] = useState(post ? {
    ...post,
    date:   post.date ? post.date.split("T")[0] : "",
    images: post.images || [],
    videos: post.videos || [],
  } : defaultPost)
  const [loading,       setLoading]       = useState(false)
  const [error,         setError]         = useState("")
  const [pickerOpen,    setPickerOpen]    = useState(false)   // cover image picker
  const [galleryOpen,   setGalleryOpen]   = useState(false)   // multi-image picker
  const [videoPickerOpen, setVideoPickerOpen] = useState(false) // multi-video picker

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const removeExtraImage = (idx) =>
    setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))

  const removeExtraVideo = (idx) =>
    setForm((p) => ({ ...p, videos: p.videos.filter((_, i) => i !== idx) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const payload = {
      ...form,
      date:   form.date ? new Date(form.date).toISOString() : null,
      images: form.images.filter(Boolean),
      videos: form.videos.filter(Boolean),
    }

    try {
      const res = await fetch(
        post ? `${apiPath}/${post.id}` : apiPath,
        { method: post ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      )
      if (!res.ok) throw new Error(await res.text())
      router.push(adminPath)
      router.refresh()
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Delete this? This cannot be undone.")) return
    setLoading(true)
    try {
      await fetch(`${apiPath}/${post.id}`, { method: "DELETE" })
      router.push(adminPath)
      router.refresh()
    } catch {
      setError("Failed to delete")
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-5 max-w-2xl">
        {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input required value={form.title} onChange={set("title")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input required value={form.slug} onChange={set("slug")} placeholder="url-friendly-name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input value={form.author} onChange={set("author")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input value={form.category} onChange={set("category")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={form.date} onChange={set("date")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
          </div>

          {/* Cover image */}
          <div className="col-span-2">
            <ImageUpload
              label="Cover Image"
              value={form.image}
              onChange={(url) => setForm((p) => ({ ...p, image: url }))}
              aspectRatio="aspect-video"
              folder={type === "blog" ? "blog" : "stories"}
            />
            {type === "story" && (
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="mt-2 flex items-center gap-1.5 text-xs text-[#4db6ac] hover:underline"
              >
                <Images className="h-3.5 w-3.5" />
                Or pick from media library
              </button>
            )}
          </div>

          {/* Extra photos — stories only */}
          {type === "story" && (
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Photos <span className="text-gray-400 font-normal">(shown as gallery on story page)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-[#4db6ac] border border-[#4db6ac]/40 px-3 py-1.5 rounded-lg hover:bg-[#4db6ac]/5 transition-colors"
                >
                  <Images className="h-3.5 w-3.5" />
                  Add from Library
                </button>
              </div>

              {form.images.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {form.images.map((src, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExtraImage(idx)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 py-3 text-center border border-dashed border-gray-200 rounded-lg">
                  No additional photos yet — click "Add from Library" to pick some
                </p>
              )}
            </div>
          )}

          {/* Extra videos — stories only */}
          {type === "story" && (
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Videos <span className="text-gray-400 font-normal">(shown on story page)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setVideoPickerOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-[#4db6ac] border border-[#4db6ac]/40 px-3 py-1.5 rounded-lg hover:bg-[#4db6ac]/5 transition-colors"
                >
                  <VideoIcon className="h-3.5 w-3.5" />
                  Add from Library
                </button>
              </div>

              {form.videos.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {form.videos.map((src, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                      <video src={src} className="w-full h-full object-cover" muted preload="metadata" />
                      <button
                        type="button"
                        onClick={() => removeExtraVideo(idx)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 py-3 text-center border border-dashed border-gray-200 rounded-lg">
                  No videos yet — click "Add from Library" to upload or pick some
                </p>
              )}
            </div>
          )}

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === "blog" ? "Description (excerpt)" : "Excerpt"}
            </label>
            <textarea
              value={form.description ?? form.excerpt ?? ""}
              onChange={set(type === "blog" ? "description" : "excerpt")}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <BlockEditor
              value={form.content}
              onChange={(val) => setForm((p) => ({ ...p, content: val }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured} onChange={set("featured")} className="h-4 w-4 accent-[#4db6ac]" />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured on homepage</label>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-[#4db6ac] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3d9d93] disabled:opacity-60 transition-colors">
            {loading ? "Saving..." : post ? "Save Changes" : "Publish"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          {post && (
            <button type="button" onClick={handleDelete} disabled={loading} className="ml-auto px-4 py-2 rounded-lg text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
              Delete
            </button>
          )}
        </div>
      </form>

      {/* Cover image picker */}
      {pickerOpen && (
        <MediaPicker
          multiple={false}
          selected={form.image ? [form.image] : []}
          onSelect={(url) => setForm((p) => ({ ...p, image: url }))}
          onClose={() => setPickerOpen(false)}
        />
      )}

      {/* Gallery image picker */}
      {galleryOpen && (
        <MediaPicker
          multiple={true}
          selected={form.images}
          onSelect={(urls) => setForm((p) => ({ ...p, images: [...new Set([...p.images, ...urls])] }))}
          onClose={() => setGalleryOpen(false)}
        />
      )}

      {/* Gallery video picker */}
      {videoPickerOpen && (
        <MediaPicker
          multiple={true}
          mediaType="video"
          selected={form.videos}
          onSelect={(urls) => setForm((p) => ({ ...p, videos: [...new Set([...p.videos, ...urls])] }))}
          onClose={() => setVideoPickerOpen(false)}
        />
      )}
    </>
  )
}
