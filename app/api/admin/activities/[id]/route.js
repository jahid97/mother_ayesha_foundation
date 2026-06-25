import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const activity = await prisma.activity.findUnique({
    where: { id: parseInt(id) },
    include: { project: { select: { id: true, title: true } } },
  })
  if (!activity) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(activity)
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const { id: _id, createdAt, updatedAt, project, ...data } = await request.json()
    const activity = await prisma.activity.update({ where: { id: parseInt(id) }, data })
    revalidatePath("/activities")
    revalidatePath(`/activities/${activity.slug}`)
    return NextResponse.json(activity)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const activity = await prisma.activity.findUnique({ where: { id: parseInt(id) } })
    // Delete blob images
    const blobUrls = [activity?.coverImage, ...(activity?.images || [])].filter(
      (u) => u?.includes("blob.vercel-storage.com")
    )
    await Promise.all(blobUrls.map((u) => del(u).catch(() => {})))
    await prisma.activity.delete({ where: { id: parseInt(id) } })
    revalidatePath("/activities")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete activity" }, { status: 500 })
  }
}
