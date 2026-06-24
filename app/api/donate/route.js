import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

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

    // Save donation record
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

    const storeId      = process.env.AAMARPAY_STORE_ID
    const signatureKey = process.env.AAMARPAY_SIGNATURE_KEY
    const baseUrl      = process.env.AAMARPAY_BASE_URL || "https://sandbox.aamarpay.com"
    const siteUrl      = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    if (storeId && signatureKey) {
      // AamarPay requires alphanumeric tran_id only — no hyphens or special chars
      const transactionId = `DON${donation.id}X${Date.now()}`

      const payload = {
        store_id:      storeId,
        signature_key: signatureKey,
        tran_id:       transactionId,
        success_url:   `${siteUrl}/donate/success?tran_id=${transactionId}&donation_id=${donation.id}`,
        fail_url:      `${siteUrl}/donate/failed?donation_id=${donation.id}`,
        cancel_url:    `${siteUrl}/donate?cancelled=1`,
        ipn_url:       `${siteUrl}/api/aamarpay/ipn`,
        amount:        parsedAmount.toFixed(2),
        currency,
        desc:          projectId ? `Donation for ${projectId}` : "General Donation to Mother Ayesha Foundation",
        cus_name:      `${firstName.trim()} ${lastName.trim()}`,
        cus_email:     email.trim(),
        cus_phone:     phone.trim(),
        cus_add1:      "Dhaka, Bangladesh",
        cus_city:      "Dhaka",
        cus_state:     "Dhaka",
        cus_country:   "Bangladesh",
        opt_a:         String(donation.id),
        opt_b:         paymentMethod || "aamarpay",
        type:          "json",
      }

      let aamarData
      try {
        const aamarRes = await fetch(`${baseUrl}/jsonpost.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        aamarData = await aamarRes.json()
      } catch (fetchErr) {
        console.error("AamarPay fetch error:", fetchErr)
        return NextResponse.json({ error: "Could not connect to payment gateway. Please try again." }, { status: 502 })
      }

      console.log("AamarPay response:", JSON.stringify(aamarData))

      if (aamarData?.payment_url) {
        await prisma.donation.update({
          where: { id: donation.id },
          data:  { transactionId },
        })
        return NextResponse.json({ success: true, paymentUrl: aamarData.payment_url, donationId: donation.id })
      }

      // Surface the exact AamarPay error to the client
      const reason =
        aamarData?.failreason ||
        aamarData?.reason ||
        aamarData?.error ||
        aamarData?.message ||
        (Array.isArray(aamarData) ? JSON.stringify(aamarData[0]) : JSON.stringify(aamarData))

      console.error("AamarPay error reason:", reason)
      return NextResponse.json({ error: `AamarPay: ${reason}` }, { status: 502 })
    }

    // Credentials not set — record donation and go to success
    return NextResponse.json({ success: true, donationId: donation.id })
  } catch (error) {
    console.error("Donate API error:", error)
    return NextResponse.json({ error: "Failed to process. Please try again." }, { status: 500 })
  }
}
