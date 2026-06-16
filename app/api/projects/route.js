import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    const projects = await prisma.project.findMany({
      where: featured === "true" ? { featured: true, active: true } : { active: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Projects API error:", error)
    return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 })
  }
}
