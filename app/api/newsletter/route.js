import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    await prisma.newsletterSubscriber.create({
      data: { email: email.trim().toLowerCase() },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "This email is already subscribed." }, { status: 409 })
    }
    console.error("Newsletter API error:", error)
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
  }
}
