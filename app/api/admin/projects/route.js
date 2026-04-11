import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(projects)
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const data = await request.json()
    const project = await prisma.project.create({ data })
    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
