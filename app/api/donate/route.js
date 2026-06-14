import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// AamarPay credentials — set these in Vercel environment variables once registered
// AAMARPAY_STORE_ID=your_store_id
// AAMARPAY_SIGNATURE_KEY=your_signature_key
// AAMARPAY_BASE_URL=https://secure.aamarpay.com  (use https://sandbox.aamarpay.com for testing)

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, amount, paymentMethod, projectId, currency = "BDT", message } = body

    if (!firstName || !lastName || !email || !phone || !amount || !paymentMethod) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 })
    }

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid donation amount." }, { status: 400 })
    }

    // Save donation record with pending status
    const donation = await prisma.donation.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        amount: parsedAmount,
        currency,
        paymentMethod,
        projectId: projectId || null,
        message: message?.trim() || null,
        status: "pending",
      },
    })

    // ── AamarPay Payment Initiation ──────────────────────────────────────────
    // Fill in AAMARPAY_STORE_ID and AAMARPAY_SIGNATURE_KEY in your environment
    // variables once you register with AamarPay (aamarpay.com).
    const storeId = process.env.AAMARPAY_STORE_ID
    const signatureKey = process.env.AAMARPAY_SIGNATURE_KEY
    const baseUrl = process.env.AAMARPAY_BASE_URL || "https://sandbox.aamarpay.com"
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://motheraishafoundation.vercel.app"

    if (storeId && signatureKey) {
      const transactionId = `DON-${donation.id}-${Date.now()}`

      const params = new URLSearchParams({
        store_id: storeId,
        tran_id: transactionId,
        success_url: `${siteUrl}/donate/success?tran_id=${transactionId}&donation_id=${donation.id}`,
        fail_url: `${siteUrl}/donate/failed?donation_id=${donation.id}`,
        cancel_url: `${siteUrl}/donate?cancelled=1`,
        amount: parsedAmount.toFixed(2),
        currency,
        signature_key: signatureKey,
        desc: projectId ? `Donation to project ${projectId}` : "General Donation",
        cus_name: `${firstName} ${lastName}`,
        cus_email: email,
        cus_phone: phone,
        cus_add1: "Bangladesh",
        cus_city: "Dhaka",
        cus_country: "BD",
        opt_a: String(donation.id),
        opt_b: paymentMethod,
      })

      const aamarRes = await fetch(`${baseUrl}/request.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })

      const aamarData = await aamarRes.json()

      if (aamarData?.payment_url) {
        return NextResponse.json({ success: true, paymentUrl: aamarData.payment_url, donationId: donation.id })
      }
    }

    // AamarPay not configured yet — return success so UI can redirect to a holding page
    return NextResponse.json({ success: true, donationId: donation.id })
  } catch (error) {
    console.error("Donate API error:", error)
    return NextResponse.json({ error: "Failed to process. Please try again." }, { status: 500 })
  }
}
