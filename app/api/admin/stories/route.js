import { NextResponse } from "next/server"
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
    const story = await prisma.story.create({ data })
    return NextResponse.json(story, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}
