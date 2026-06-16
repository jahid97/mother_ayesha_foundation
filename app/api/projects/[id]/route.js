import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request, { params }) {
  const { id } = await params
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project || project.active === false) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Project detail API error:", error)
    return NextResponse.json({ error: "Failed to fetch project." }, { status: 500 })
  }
}
