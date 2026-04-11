import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(posts)
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const data = await request.json()
    const post = await prisma.blogPost.create({ data })
    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
