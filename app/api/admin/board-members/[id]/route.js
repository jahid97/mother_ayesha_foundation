import { NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function PUT(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const { id: _id, createdAt, updatedAt, ...data } = await request.json()
  const member = await prisma.boardMember.update({ where: { id: parseInt(id) }, data })
  return NextResponse.json(member)
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const member = await prisma.boardMember.findUnique({ where: { id: parseInt(id) } })
  if (member?.image?.includes("blob.vercel-storage.com")) {
    await del(member.image).catch(() => {})
  }
  await prisma.boardMember.delete({ where: { id: parseInt(id) } })
  return NextResponse.json({ success: true })
}
