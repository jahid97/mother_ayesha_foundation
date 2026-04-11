import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  })

  return NextResponse.json(user)
}

export async function PUT(request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { name, currentPassword, newPassword } = await request.json()

    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const updates = {}

    if (name && name.trim() !== user.name) {
      updates.name = name.trim()
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password." }, { status: 400 })
      }
      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid) {
        return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 })
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 })
      }
      updates.password = await bcrypt.hash(newPassword, 12)
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No changes to save." }, { status: 400 })
    }

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: updates,
      select: { id: true, name: true, email: true, role: true },
    })

    return NextResponse.json({ success: true, user: updated })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 })
  }
}
