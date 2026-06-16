"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/image-upload"

export default function HeroSlideForm({ slide, projects = [] }) {
  const router = useRouter()
  const isEdit = !!slide

  const [type, setType] = useState(slide?.type ?? "charity_project")
  const [src, setSrc] = useState(slide?.src ?? "")
  const [alt, setAlt] = useState(slide?.alt ?? "")
  const [title, setTitle] = useState(slide?.title ?? "")
  const [subtitle, setSubtitle] = useState(slide?.subtitle ?? "")
  const [projectId, setProjectId] = useState(slide?.projectId ?? "")
  const [order, setOrder] = useState(slide?.order ?? 0)
  const [active, setActive] = useState(slide?.active ?? true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleProjectChange(e) {
    const id = e.target.value
    setProjectId(id)
    // Auto-fill title & subtitle from the selected project if fields are empty
    if (id) {
      const project = projects.find((p) => p.id === id)
      if (project) {
        if (!title) setTitle(project.title)
        if (!subtitle) setSubtitle(project.description?.slice(0, 160) || "")
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!src) { setError("Please upload an image."); return }
    setLoading(true)
    setError("")

    const payload = {
      type,
      src,
      alt,
      order: parseInt(order) || 0,
      active,
      title: type === "charity_project" ? title : null,
      subtitle: type === "charity_project" ? subtitle : null,
      projectId: type === "charity_project" && projectId ? projectId : null,
    }

    const url = isEdit ? `/api/admin/hero-slides/${slide.id}` : "/api/admin/hero-slides"
    const method = isEdit ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    setLoading(false)
    if (res.ok) {
      router.push("/admin/hero-slides")
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error || "Something went wrong.")
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this slide? This cannot be undone.")) return
    setLoading(true)
    const res = await fetch(`/api/admin/hero-slides/${slide.id}`, { method: "DELETE" })
    setLoading(false)
    if (res.ok) {
      router.push("/admin/hero-slides")
      router.refresh()
    } else {
      setError("Failed to delete slide.")
    }
  }

  const linkedProject = projects.find((p) => p.id === projectId)

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      {/* Type selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Slide Type</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setType("charity_project")}
            className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${
              type === "charity_project"
                ? "border-[#4db6ac] bg-[#4db6ac]/10 text-[#4db6ac]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold">Charity Project</div>
            <div className="text-xs mt-0.5 opacity-70">Shows title, description, Donate &amp; Learn More buttons</div>
          </button>
          <button
            type="button"
            onClick={() => setType("photo_only")}
            className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${
              type === "photo_only"
                ? "border-[#4db6ac] bg-[#4db6ac]/10 text-[#4db6ac]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold">Photo Only</div>
            <div className="text-xs mt-0.5 opacity-70">Full-screen image with no text overlay</div>
          </button>
        </div>
      </div>

      {/* Image upload */}
      <ImageUpload
        label="Slide Image"
        value={src}
        onChange={setSrc}
        aspectRatio="aspect-video"
        folder="hero"
      />

      {/* Alt text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image Description (alt text)</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="e.g. Children learning in a classroom"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
        />
      </div>

      {/* Charity project fields */}
      {type === "charity_project" && (
        <>
          {/* Project link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link to Project <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <select
              value={projectId}
              onChange={handleProjectChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac] bg-white"
            >
              <option value="">— General donation (no specific project) —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            {linkedProject && (
              <p className="text-xs text-[#4db6ac] mt-1">
                ✓ "Donate Now" button will link to <strong>{linkedProject.title}</strong>
              </p>
            )}
            {!linkedProject && (
              <p className="text-xs text-gray-400 mt-1">
                "Donate Now" button will link to the general donation page.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Building a Better Bangladesh Through Compassion"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={3}
              placeholder="A short description shown below the title on the slide"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
            />
          </div>
        </>
      )}

      {/* Order + Active */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            min={0}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
          />
          <p className="text-xs text-gray-400 mt-1">Lower numbers appear first (0, 1, 2…)</p>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4 accent-[#4db6ac]"
            />
            <span className="text-sm font-medium text-gray-700">Active (visible on site)</span>
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-60"
        >
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Slide"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/hero-slides")}
          className="text-sm font-medium px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="ml-auto text-sm font-medium px-6 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            Delete Slide
          </button>
        )}
      </div>
    </form>
  )
}
