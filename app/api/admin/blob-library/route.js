import { list } from "@vercel/blob"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder") || ""

    const { blobs } = await list({ prefix: folder || undefined })
    const images = blobs
      .filter((b) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(b.pathname))
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))

    return NextResponse.json(images)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to list blobs" }, { status: 500 })
  }
}
