import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(messages)
}

export async function PATCH(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const { id, read } = await request.json()
    const message = await prisma.contactMessage.update({ where: { id }, data: { read } })
    return NextResponse.json(message)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}
