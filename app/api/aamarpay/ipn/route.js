import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// AamarPay posts to this URL after every payment attempt.
// Set this URL in your AamarPay merchant dashboard as the IPN / notification URL:
//   https://yourdomain.com/api/aamarpay/ipn
//
// AamarPay also sends the result to success_url and fail_url — but the IPN is
// the authoritative server-to-server confirmation that doesn't depend on the
// user's browser returning to your site.

export async function POST(request) {
  try {
    const body = await request.formData()
    const data = Object.fromEntries(body.entries())

    const payStatus   = data.pay_status   || data.status
    const tranId      = data.mer_txnid    || data.tran_id
    const donationId  = data.opt_a        // we stored donation.id in opt_a
    const paidAmount  = parseFloat(data.amount || "0")
    const storeId     = process.env.AAMARPAY_STORE_ID
    const signatureKey = process.env.AAMARPAY_SIGNATURE_KEY
    const baseUrl     = process.env.AAMARPAY_BASE_URL || "https://sandbox.aamarpay.com"

    if (!donationId || !tranId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // ── Verify with AamarPay (optional but recommended) ──
    let verified = false
    if (storeId && signatureKey) {
      try {
        const verifyRes = await fetch(
          `${baseUrl}/api/v1/trxcheck/request.php?request_id=${tranId}&store_id=${storeId}&signature_key=${signatureKey}&type=json`
        )
        const verifyData = await verifyRes.json()
        verified = verifyData?.pay_status === "Successful" || verifyData?.[0]?.pay_status === "Successful"
      } catch {
        // verification API failed — fall back to the posted pay_status
        verified = payStatus === "Successful"
      }
    } else {
      verified = payStatus === "Successful"
    }

    const newStatus = verified ? "completed" : "failed"

    await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: newStatus,
        transactionId: tranId,
        paidAmount: paidAmount || undefined,
      },
    })

    return NextResponse.json({ received: true, status: newStatus })
  } catch (err) {
    console.error("AamarPay IPN error:", err)
    return NextResponse.json({ error: "IPN processing failed" }, { status: 500 })
  }
}
