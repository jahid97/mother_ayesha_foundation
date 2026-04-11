import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request) {
  const { token, password } = await request.json()

  if (!token || !password)
    return NextResponse.json({ error: "Token and password are required" }, { status: 400 })

  if (password.length < 8)
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })

  const record = await prisma.passwordResetToken.findUnique({ where: { token } })

  if (!record)
    return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 })

  if (new Date() > record.expiresAt)
    return NextResponse.json({ error: "This reset link has expired. Please request a new one." }, { status: 400 })

  const hashed = await bcrypt.hash(password, 12)

  await prisma.user.update({
    where: { email: record.email },
    data: { password: hashed },
  })

  await prisma.passwordResetToken.delete({ where: { token } })

  return NextResponse.json({ success: true })
}
