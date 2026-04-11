import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: { select: { title: true } } },
  })
  return NextResponse.json(donations)
}
