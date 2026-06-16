import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const rows = await prisma.siteSetting.findMany()
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  return NextResponse.json(settings)
}

export async function PUT(request) {
  const { error } = await requireAdmin()
  if (error) return error

  try {
    const data = await request.json()
    await Promise.all(
      Object.entries(data).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      )
    )
    revalidatePath("/projects")
    revalidatePath("/blog")
    revalidatePath("/gallery")
    revalidatePath("/contact-us")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
