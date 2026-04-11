import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request, { params }) {
  const { slug } = await params
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Blog detail API error:", error)
    return NextResponse.json({ error: "Failed to fetch blog post." }, { status: 500 })
  }
}
