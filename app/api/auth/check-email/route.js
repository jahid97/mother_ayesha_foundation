import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request) {
  const { email } = await request.json()
  if (!email) return NextResponse.json({ exists: false })

  const user = await prisma.user.findUnique({
    where: { email: String(email).toLowerCase().trim() },
    select: { id: true },
  })

  return NextResponse.json({ exists: !!user })
}
