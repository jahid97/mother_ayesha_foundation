import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  const slide = await prisma.heroSlide.findUnique({ where: { id } })
  if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(slide)
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  try {
    const { id: _id, createdAt, updatedAt, ...data } = await request.json()
    const slide = await prisma.heroSlide.update({ where: { id }, data })
    revalidatePath("/")
    return NextResponse.json(slide)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update slide" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error
  const { id } = await params
  try {
    const slide = await prisma.heroSlide.findUnique({ where: { id } })
    if (slide?.src?.includes("blob.vercel-storage.com")) {
      await del(slide.src).catch(() => {})
    }
    await prisma.heroSlide.delete({ where: { id } })
    revalidatePath("/")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 })
  }
}
