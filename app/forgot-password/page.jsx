"use client"

import { useState } from "react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!email) { setError("Please enter your email address."); return }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />
      <main className="flex-grow flex items-center py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">

            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-[#4db6ac] hover:text-[#3d9d93] mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Sign In
            </Link>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              {sent ? (
                <div className="text-center py-4">
                  <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-[#3d3d3d] mb-2">Check your email</h2>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed mb-6">
                    If an account exists for <strong>{email}</strong>, we've sent a password reset link. Check your inbox — it expires in 1 hour.
                  </p>
                  <p className="text-xs text-gray-400 mb-4">Didn't get it? Check your spam folder.</p>
                  <Button
                    variant="outline"
                    className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                    onClick={() => { setSent(false); setEmail("") }}
                  >
                    Try a different email
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#3d3d3d] mb-1">Forgot password?</h1>
                    <p className="text-[#5a5a5a] text-sm">Enter your email and we'll send you a reset link.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-[#3d3d3d]">Email address</label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${error ? "text-red-400" : "text-gray-400"}`} />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError("") }}
                          placeholder="you@example.com"
                          className={`pl-10 ${error ? "border-red-400 focus:border-red-400" : "focus:border-[#4db6ac]"}`}
                        />
                      </div>
                      {error && (
                        <p className="flex items-center gap-1.5 text-xs text-red-600">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#4db6ac] hover:bg-[#3d9d93] text-white"
                    >
                      {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</> : "Send Reset Link"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
