import { NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const { id: _id, createdAt, updatedAt, donations, ...data } = await request.json()
    const project = await prisma.project.update({ where: { id }, data })
    return NextResponse.json(project)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  try {
    const project = await prisma.project.findUnique({ where: { id } })
    if (project?.image?.includes("blob.vercel-storage.com")) {
      await del(project.image).catch(() => {})
    }
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
