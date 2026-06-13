import { NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id: parseInt(id) } })
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const { id: _id, createdAt, updatedAt, ...data } = await request.json()
    const post = await prisma.blogPost.update({ where: { id: parseInt(id) }, data })
    return NextResponse.json(post)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const post = await prisma.blogPost.findUnique({ where: { id: parseInt(id) } })
    if (post?.image?.includes("blob.vercel-storage.com")) {
      await del(post.image).catch(() => {})
    }
    await prisma.blogPost.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
