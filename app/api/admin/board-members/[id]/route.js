import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

function normalizeImage(image) {
  if (!image) return image
  return image
    .replace(/\\/g, "/")
    .replace(/^public\//, "/")
    .replace(/^(?!\/)(?!https?)/, "/")
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const { id: _id, createdAt, updatedAt, ...data } = await request.json()
  if (data.image) data.image = normalizeImage(data.image)
  const member = await prisma.boardMember.update({ where: { id: parseInt(id) }, data })
  return NextResponse.json(member)
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  await prisma.boardMember.delete({ where: { id: parseInt(id) } })
  return NextResponse.json({ success: true })
}
