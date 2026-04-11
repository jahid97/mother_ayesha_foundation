import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const category = searchParams.get("category")

    const stories = await prisma.story.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json(stories)
  } catch (error) {
    console.error("Stories API error:", error)
    return NextResponse.json({ error: "Failed to fetch stories." }, { status: 500 })
  }
}
