import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const category = searchParams.get("category")

    const posts = await prisma.blogPost.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Blog API error:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts." }, { status: 500 })
  }
}
