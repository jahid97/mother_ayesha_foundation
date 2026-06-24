import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// AamarPay POSTs payment result data to this endpoint after successful payment.
// We update the donation status then redirect the user to the thank-you page.
export async function POST(request) {
  try {
    const body = await request.formData()
    const data = Object.fromEntries(body.entries())

    const donationId = data.opt_a
    const tranId     = data.mer_txnid || data.tran_id
    const payStatus  = data.pay_status
    const paidAmount = parseFloat(data.amount || "0")

    if (donationId) {
      await prisma.donation.update({
        where: { id: parseInt(donationId) },
        data: {
          status:        payStatus === "Successful" ? "completed" : "pending",
          transactionId: tranId   || undefined,
          paidAmount:    paidAmount || undefined,
        },
      }).catch(() => {})
    }
  } catch {
    // Never block the redirect even if DB update fails
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return NextResponse.redirect(`${siteUrl}/donate/success`, { status: 303 })
}

// Allow GET too in case AamarPay ever redirects instead of posting
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return NextResponse.redirect(`${siteUrl}/donate/success`, { status: 303 })
}
