/**
 * File upload API — admin only.
 *
 * POST  /api/upload  — accepts multipart/form-data with a "file" field,
 *                      saves to public/uploads/, returns { url: "/uploads/…" }
 * DELETE /api/upload — accepts JSON { url: "/uploads/…" }, deletes the file.
 *
 * Security notes:
 *   - Both endpoints require an active admin session.
 *   - DELETE uses path.basename() to strip any directory traversal (e.g. "../../secret").
 *   - Only paths starting with "/uploads/" are accepted — external URLs are rejected.
 *   - Filenames are sanitised and timestamped to prevent collisions and injection.
 */
import { NextResponse } from "next/server"
import { writeFile, mkdir, unlink } from "fs/promises"
import path from "path"
import { auth } from "@/auth"

export async function POST(req) {
  const session = await auth()
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file")

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Sanitize original filename and make it unique
  const ext = path.extname(file.name).toLowerCase() || ".jpg"
  const base = path.basename(file.name, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .slice(0, 60)
  const unique = `${base}-${Date.now()}${ext}`

  const uploadDir = path.join(process.cwd(), "public", "uploads")
  await mkdir(uploadDir, { recursive: true })

  const filePath = path.join(uploadDir, unique)
  await writeFile(filePath, buffer)

  return NextResponse.json({ url: `/uploads/${unique}` })
}

export async function DELETE(req) {
  const session = await auth()
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { url } = await req.json()

  // Only allow deleting files inside /uploads/ — never anything else
  if (!url || !url.startsWith("/uploads/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  // Prevent path traversal (e.g. /uploads/../../secret)
  const filename = path.basename(url)
  const filePath = path.join(process.cwd(), "public", "uploads", filename)

  try {
    await unlink(filePath)
  } catch {
    // File already gone — treat as success
  }

  return NextResponse.json({ ok: true })
}
