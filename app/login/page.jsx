"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError("")
    setPasswordError("")

    if (!email) { setEmailError("Please enter your email address."); return }
    if (!password) { setPasswordError("Please enter your password."); return }

    setIsLoading(true)

    try {
      // Step 1: check if email exists
      const check = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const { exists } = await check.json()

      if (!exists) {
        setEmailError("No account found with this email address.")
        setIsLoading(false)
        return
      }

      // Step 2: try signing in — if it fails now, password is wrong
      const result = await signIn("credentials", { email, password, redirect: false })

      if (result?.error) {
        setPasswordError("Incorrect password. Please try again.")
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setPasswordError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div
            className={`mx-auto max-w-md transition-all duration-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-[#3d3d3d]">Welcome Back</h1>
              <p className="text-[#5a5a5a]">Sign in to continue to your account</p>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              {/* Header image with logo */}
              <div className="relative h-32 w-full flex items-center justify-center bg-[#3d3d3d]">
                <Image
                  src="/logo.png"
                  alt="Mother Ayesha Foundation Logo"
                  width={108}
                  height={108}
                  className="object-contain"
                />
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email input field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-[#3d3d3d]">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${emailError ? "text-red-400" : "text-gray-400"}`} />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError("") }}
                        placeholder="Enter your email"
                        className={`pl-10 transition-all duration-200 ${emailError ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "focus:border-[#4db6ac] focus:ring-[#4db6ac]/20"}`}
                      />
                    </div>
                    {emailError && (
                      <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />{emailError}
                      </p>
                    )}
                  </div>

                  {/* Password input field with show/hide toggle */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-[#3d3d3d]">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-[#4db6ac] transition-colors duration-200 hover:text-[#3d9d93] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${passwordError ? "text-red-400" : "text-gray-400"}`} />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}
                        placeholder="Enter your password"
                        className={`pl-10 transition-all duration-200 ${passwordError ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "focus:border-[#4db6ac] focus:ring-[#4db6ac]/20"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordError && (
                      <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />{passwordError}
                      </p>
                    )}
                  </div>

                  {/* Remember me checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked)}
                      className="data-[state=checked]:bg-[#4db6ac] data-[state=checked]:border-[#4db6ac]"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none text-[#5a5a5a] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* Sign in button with loading state */}
                  <Button
                    type="submit"
                    className="w-full bg-[#4db6ac] text-white transition-all duration-200 hover:bg-[#3d9d93] hover:shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {/* Sign up link */}
                <div className="mt-6 text-center text-sm">
                  <span className="text-[#5a5a5a]">Don&apos;t have an account? </span>
                  <Link
                    href="/signup"
                    className="font-medium text-[#4db6ac] transition-colors duration-200 hover:text-[#3d9d93] hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

