/**
 * File upload API — admin only.
 *
 * POST   /api/upload — accepts multipart/form-data with a "file" field,
 *                      uploads to Vercel Blob, returns { url: "https://…" }
 * DELETE /api/upload — accepts JSON { url: "https://…" }, deletes from Vercel Blob.
 *
 * Security notes:
 *   - Both endpoints require an active admin session.
 *   - Only Vercel Blob URLs are accepted for deletion.
 *   - Filenames are sanitised and timestamped to prevent collisions and injection.
 */
import { NextResponse } from "next/server"
import { put, del } from "@vercel/blob"
import path from "path"
import { auth } from "@/auth"

export async function POST(req) {
  const session = await auth()
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file")
  const folder = (formData.get("folder") || "uploads").replace(/[^a-zA-Z0-9-_]/g, "")

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  // Sanitize original filename and make it unique
  const ext = path.extname(file.name).toLowerCase() || ".jpg"
  const base = path.basename(file.name, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .slice(0, 60)
  const unique = `${folder}/${base}-${Date.now()}${ext}`

  const blob = await put(unique, file, {
    access: "public",
    contentType: file.type || "application/octet-stream",
  })

  return NextResponse.json({ url: blob.url })
}

export async function DELETE(req) {
  const session = await auth()
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { url } = await req.json()

  // Only allow deleting valid Vercel Blob URLs
  if (!url || !url.includes("blob.vercel-storage.com")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 })
  }

  try {
    await del(url)
  } catch {
    // File already gone — treat as success
  }

  return NextResponse.json({ ok: true })
}
