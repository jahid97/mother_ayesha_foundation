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
    const data = await request.json()
    // excerpt is required — fall back to description if the form omitted it
    if (!data.excerpt) data.excerpt = data.description || ""
    const story = await prisma.story.create({ data })
    revalidatePath("/stories")
    return NextResponse.json(story, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}
