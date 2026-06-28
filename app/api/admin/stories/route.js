import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const stories = await prisma.story.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(stories)
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const { description, ...data } = await request.json()
    if (!data.excerpt) data.excerpt = description || ""
    if (data.date === null) data.date = ""
    if (!Array.isArray(data.images)) data.images = []
    const story = await prisma.story.create({ data })
    revalidatePath("/stories")
    return NextResponse.json(story, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}
