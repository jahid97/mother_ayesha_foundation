"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react"

function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const [confirmError, setConfirmError] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) setError("Invalid reset link. Please request a new one.")
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setConfirmError("")

    if (password.length < 8) { setError("Password must be at least 8 characters."); return }
    if (password !== confirm) { setConfirmError("Passwords do not match."); return }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong."); return }
      setDone(true)
      setTimeout(() => router.push("/login"), 3000)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {done ? (
        <div className="text-center py-4">
          <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-7 w-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-[#3d3d3d] mb-2">Password updated!</h2>
          <p className="text-[#5a5a5a] text-sm mb-4">Your password has been changed. Redirecting you to sign in…</p>
          <Link href="/login">
            <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Go to Sign In</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#3d3d3d] mb-1">Set new password</h1>
            <p className="text-[#5a5a5a] text-sm">Choose a strong password for your account.</p>
          </div>

          {error && !loading && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
              <AlertCircle className="h-4 w-4 shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#3d3d3d]">New password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${error ? "text-red-400" : "text-gray-400"}`} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError("") }}
                  placeholder="Min. 8 characters"
                  className={`pl-10 pr-10 ${error ? "border-red-400" : "focus:border-[#4db6ac]"}`}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && <p className="flex items-center gap-1.5 text-xs text-red-600"><AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#3d3d3d]">Confirm new password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${confirmError ? "text-red-400" : "text-gray-400"}`} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setConfirmError("") }}
                  placeholder="Repeat your password"
                  className={`pl-10 ${confirmError ? "border-red-400" : "focus:border-[#4db6ac]"}`}
                />
              </div>
              {confirmError && <p className="flex items-center gap-1.5 text-xs text-red-600"><AlertCircle className="h-3.5 w-3.5 shrink-0" />{confirmError}</p>}
            </div>

            <Button type="submit" disabled={loading || !token} className="w-full bg-[#4db6ac] hover:bg-[#3d9d93] text-white">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating…</> : "Update Password"}
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />
      <main className="flex-grow flex items-center py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <Suspense fallback={<div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-400">Loading…</div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
