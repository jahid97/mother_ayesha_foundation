import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus } from "lucide-react"
import GalleryManager from "./gallery-manager"

export default async function AdminGallery() {
  const images = await prisma.galleryImage.findMany({ orderBy: { id: "asc" } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="flex items-center gap-2 bg-[#4db6ac] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3d9d93] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Image
        </Link>
      </div>

      <GalleryManager images={images} />
    </div>
  )
}
