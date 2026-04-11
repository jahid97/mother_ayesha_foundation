import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    const contact = await prisma.contactMessage.create({
      data: { name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() },
    })

    return NextResponse.json({ success: true, id: contact.id })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
