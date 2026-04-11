import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request, { params }) {
  const { slug } = await params
  try {
    const story = await prisma.story.findUnique({
      where: { slug },
    })

    if (!story) {
      return NextResponse.json({ error: "Story not found." }, { status: 404 })
    }

    return NextResponse.json(story)
  } catch (error) {
    console.error("Story detail API error:", error)
    return NextResponse.json({ error: "Failed to fetch story." }, { status: 500 })
  }
}
