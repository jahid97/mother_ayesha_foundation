import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const image = await prisma.galleryImage.findUnique({ where: { id: parseInt(id) } })
  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(image)
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const data = await request.json()
    // strip fields that shouldn't be updated
    const { id: _id, ...updateData } = data
    const image = await prisma.galleryImage.update({ where: { id: parseInt(id) }, data: updateData })
    revalidatePath("/gallery")
    return NextResponse.json(image)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const image = await prisma.galleryImage.findUnique({ where: { id: parseInt(id) } })
    if (image?.src?.includes("blob.vercel-storage.com")) {
      await del(image.src).catch(() => {})
    }
    await prisma.galleryImage.delete({ where: { id: parseInt(id) } })
    revalidatePath("/gallery")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
