import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const images = await prisma.galleryImage.findMany({ orderBy: { id: "asc" } })
  return NextResponse.json(images)
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const data = await request.json()
    const image = await prisma.galleryImage.create({ data })
    return NextResponse.json(image, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 })
  }
}
