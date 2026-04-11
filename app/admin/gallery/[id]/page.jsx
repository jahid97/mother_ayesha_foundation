import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import GalleryForm from "@/components/admin/gallery-form"

export default async function EditGalleryImage({ params }) {
  const { id } = await params
  const image = await prisma.galleryImage.findUnique({ where: { id: parseInt(id) } })
  if (!image) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Gallery Image</h1>
      <GalleryForm image={image} />
    </div>
  )
}
