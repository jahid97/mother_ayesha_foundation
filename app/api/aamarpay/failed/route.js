import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request) {
  try {
    const body = await request.formData()
    const data = Object.fromEntries(body.entries())

    const donationId = data.opt_a
    const tranId     = data.mer_txnid || data.tran_id

    if (donationId) {
      await prisma.donation.update({
        where: { id: parseInt(donationId) },
        data: {
          status:        "failed",
          transactionId: tranId || undefined,
        },
      }).catch(() => {})
    }
  } catch {
    // Never block the redirect
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return NextResponse.redirect(`${siteUrl}/donate/failed`, { status: 303 })
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return NextResponse.redirect(`${siteUrl}/donate/failed`, { status: 303 })
}
