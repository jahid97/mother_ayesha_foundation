import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const members = await prisma.boardMember.findMany({ orderBy: { order: "asc" } })
  return NextResponse.json(members)
}

// Normalize Windows paths like "public\foo\bar.jpg" → "/foo/bar.jpg"
function normalizeImage(image) {
  if (!image) return image
  return image
    .replace(/\\/g, "/")           // backslashes → forward slashes
    .replace(/^public\//, "/")     // strip leading "public/" → "/"
    .replace(/^(?!\/)(?!https?)/, "/") // ensure leading slash if relative
}

export async function POST(request) {
  const { error } = await requireAdmin()
  if (error) return error

  const data = await request.json()
  if (data.image) data.image = normalizeImage(data.image)
  const member = await prisma.boardMember.create({ data })
  return NextResponse.json(member)
}
