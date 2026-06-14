import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } })
  return NextResponse.json(slides)
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const data = await request.json()
    const slide = await prisma.heroSlide.create({ data })
    revalidatePath("/")
    return NextResponse.json(slide, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create slide" }, { status: 500 })
  }
}
