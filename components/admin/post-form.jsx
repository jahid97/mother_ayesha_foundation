"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/image-upload"

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
  featured: false,
}

export default function PostForm({ post, type = "blog" }) {
  const router = useRouter()
  const apiPath = type === "blog" ? "/api/admin/blog" : "/api/admin/stories"
  const adminPath = type === "blog" ? "/admin/blog" : "/admin/stories"

  const [form, setForm] = useState(post ? {
    ...post,
    date: post.date ? post.date.split("T")[0] : "",
  } : defaultPost)
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
        post ? `${apiPath}/${post.id}` : apiPath,
        {
          method: post ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
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
        <div className="col-span-2">
          <ImageUpload
            label="Image"
            value={form.image}
            onChange={(url) => setForm((p) => ({ ...p, image: url }))}
            aspectRatio="aspect-video"
            folder={type === "blog" ? "blog" : "stories"}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type === "blog" ? "Description (excerpt)" : "Excerpt"}
          </label>
          <textarea value={form.description ?? form.excerpt ?? ""} onChange={set(type === "blog" ? "description" : "excerpt")} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea value={form.content} onChange={set("content")} rows={12} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" placeholder="Write your content here..." />
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
  )
}
