import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, amount, isRecurring, projectId, paymentMethod, message } = body

    if (!firstName || !lastName || !email || !amount || !paymentMethod) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 })
    }

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid donation amount." }, { status: 400 })
    }

    const donation = await prisma.donation.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        amount: parsedAmount,
        isRecurring: isRecurring || false,
        projectId: projectId || null,
        paymentMethod,
        message: message?.trim() || null,
        status: "pending",
      },
    })

    return NextResponse.json({ success: true, id: donation.id })
  } catch (error) {
    console.error("Donation API error:", error)
    return NextResponse.json({ error: "Failed to process donation. Please try again." }, { status: 500 })
  }
}
