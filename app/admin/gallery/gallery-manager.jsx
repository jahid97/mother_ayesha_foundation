"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Pencil, Trash2, Star, StarOff } from "lucide-react"

export default function GalleryManager({ images: initialImages }) {
  const router = useRouter()
  const [images, setImages] = useState(initialImages)
  const [activeCategory, setActiveCategory] = useState("All")
  const [deleting, setDeleting] = useState(null)

  const categories = ["All", ...Array.from(new Set(images.map((i) => i.category).filter(Boolean)))]

  const filtered = activeCategory === "All"
    ? images
    : images.filter((i) => i.category === activeCategory)

  const handleDelete = async (id) => {
    if (!confirm("Delete this image? This cannot be undone.")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
      if (res.ok) {
        setImages((prev) => prev.filter((i) => i.id !== id))
        router.refresh()
      }
    } finally {
      setDeleting(null)
    }
  }

  const handleToggleFeatured = async (image) => {
    const res = await fetch(`/api/admin/gallery/${image.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...image, featured: !image.featured }),
    })
    if (res.ok) {
      const updated = await res.json()
      setImages((prev) => prev.map((i) => i.id === updated.id ? updated : i))
    }
  }

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-[#4db6ac] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#4db6ac] hover:text-[#4db6ac]"
            }`}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-70">
              ({cat === "All" ? images.length : images.filter((i) => i.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center text-gray-400">No images in this category</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div key={img.id} className="group relative rounded-lg overflow-hidden bg-gray-200 aspect-square">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "" }}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => handleToggleFeatured(img)}
                    className={`p-1.5 rounded-md transition-colors ${
                      img.featured ? "bg-yellow-400 text-white" : "bg-white/20 text-white hover:bg-white/40"
                    }`}
                    title={img.featured ? "Remove from featured" : "Mark as featured"}
                  >
                    {img.featured ? <Star className="h-3.5 w-3.5 fill-current" /> : <StarOff className="h-3.5 w-3.5" />}
                  </button>
                  <Link
                    href={`/admin/gallery/${img.id}`}
                    className="p-1.5 rounded-md bg-white/20 text-white hover:bg-white/40 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={deleting === img.id}
                    className="p-1.5 rounded-md bg-red-500/80 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="bg-black/40 rounded-md px-2 py-1">
                  <p className="text-white text-xs font-medium truncate">{img.alt}</p>
                  <p className="text-white/60 text-xs truncate">{img.category} · {img.location}</p>
                </div>
              </div>

              {/* Featured badge */}
              {img.featured && (
                <div className="absolute top-2 left-2 pointer-events-none">
                  <span className="bg-yellow-400 text-white text-xs px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-current" /> Featured
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
