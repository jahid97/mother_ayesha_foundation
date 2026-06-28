import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const story = await prisma.story.findUnique({ where: { id: parseInt(id) } })
  if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(story)
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const { id: _id, createdAt, updatedAt, description, ...data } = await request.json()
    if (!data.excerpt) data.excerpt = description || ""
    if (data.date === null) data.date = ""
    const story = await prisma.story.update({ where: { id: parseInt(id) }, data })
    revalidatePath("/stories")
    revalidatePath(`/stories/${story.slug}`)
    return NextResponse.json(story)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const story = await prisma.story.findUnique({ where: { id: parseInt(id) } })
    if (story?.image?.includes("blob.vercel-storage.com")) {
      await del(story.image).catch(() => {})
    }
    await prisma.story.delete({ where: { id: parseInt(id) } })
    revalidatePath("/stories")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 })
  }
}
