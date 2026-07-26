import { list } from "@vercel/blob"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder") || ""
    const type = searchParams.get("type") || "image" // "image" | "video" | "all"

    const { blobs } = await list({ prefix: folder || undefined })
    const withType = blobs
      .map((b) => ({
        ...b,
        type: /\.(mp4|webm|mov|mkv|m4v)$/i.test(b.pathname) ? "video" : "image",
      }))
      .filter((b) => /\.(jpg|jpeg|png|webp|gif|svg|mp4|webm|mov|mkv|m4v)$/i.test(b.pathname))
      .filter((b) => type === "all" || b.type === type)
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))

    return NextResponse.json(withType)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to list blobs" }, { status: 500 })
  }
}
