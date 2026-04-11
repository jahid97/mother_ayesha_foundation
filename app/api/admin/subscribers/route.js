import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(subscribers)
}
