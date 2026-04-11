import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")

    const images = await prisma.galleryImage.findMany({
      where: {
        ...(featured === "true" ? { featured: true } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: { id: "asc" },
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error("Gallery API error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images." }, { status: 500 })
  }
}
