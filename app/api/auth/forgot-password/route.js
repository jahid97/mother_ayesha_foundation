import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { Resend } from "resend"
import crypto from "node:crypto"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { email } = await request.json()
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

  const normalised = String(email).toLowerCase().trim()
  const user = await prisma.user.findUnique({ where: { email: normalised }, select: { name: true } })

  // Always return success so we don't leak whether an email exists
  if (!user) return NextResponse.json({ success: true })

  // Delete any existing tokens for this email
  await prisma.passwordResetToken.deleteMany({ where: { email: normalised } })

  // Create new token — expires in 1 hour
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  await prisma.passwordResetToken.create({ data: { email: normalised, token, expiresAt } })

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`

  await resend.emails.send({
    from: "Mother Ayesha Foundation <noreply@motherayesha.org>",
    to: normalised,
    subject: "Reset your password",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#faf6ed;border-radius:12px;">
        <h2 style="color:#3d3d3d;margin-bottom:8px;">Reset your password</h2>
        <p style="color:#5a5a5a;">Hi ${user.name},</p>
        <p style="color:#5a5a5a;">We received a request to reset your password. Click the button below — this link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block;margin:24px 0;background:#4db6ac;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;">Reset Password</a>
        <p style="color:#9a9a9a;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0;" />
        <p style="color:#9a9a9a;font-size:12px;">Mother Ayesha Foundation</p>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
