import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"
import { randomBytes } from "crypto"

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
    if (!data.id) data.id = randomBytes(8).toString("hex")
    const project = await prisma.project.create({ data })
    revalidatePath("/projects")
    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
