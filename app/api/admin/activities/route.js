import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: { select: { id: true, title: true } } },
  })
  return NextResponse.json(activities)
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const { project, ...data } = await request.json()
    if (!Array.isArray(data.videos)) data.videos = []
    const activity = await prisma.activity.create({ data })
    revalidatePath("/activities")
    return NextResponse.json(activity, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 })
  }
}
