"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check, X } from "lucide-react"

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Add this effect to handle the mounting animation
  useEffect(() => {
    setMounted(true)
  }, [])

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { text: "At least one number", met: /[0-9]/.test(password) },
    { text: "At least one special character", met: /[^A-Za-z0-9]/.test(password) },
  ]

  const allRequirementsMet = passwordRequirements.every((req) => req.met)
  const passwordsMatch = password === confirmPassword
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormTouched(true)

    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!isValidEmail) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    if (!allRequirementsMet) {
      toast({
        title: "Password requirements",
        description: "Please ensure your password meets all requirements",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    if (!agreeTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        toast({
          title: "Registration failed",
          description: data.error || "Please try again later",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Account created",
        description: "Your account has been created. Please sign in.",
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
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
              <h1 className="mb-2 text-3xl font-bold text-[#3d3d3d]">Create an Account</h1>
              <p className="text-[#5a5a5a]">Join us to make a difference in children's lives</p>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=600&text=Join+Our+Community"
                  alt="Join Our Community"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d3d3d]/70 to-[#3d3d3d]/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white p-3 shadow-md transition-transform duration-300 hover:scale-105">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white">
                      <Image
                        src="/logo.png"
                        alt="Mother Ayesha Foundation Logo"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-[#3d3d3d]">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10 transition-all duration-200 focus:border-[#4db6ac] focus:ring-[#4db6ac]/20"
                        required
                        aria-required="true"
                      />
                      {formTouched && fullName && (
                        <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#3d3d3d]">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`pl-10 transition-all duration-200 focus:border-[#4db6ac] focus:ring-[#4db6ac]/20 ${
                          formTouched && email && !isValidEmail ? "border-red-500" : ""
                        }`}
                        required
                        aria-required="true"
                      />
                      {formTouched &&
                        email &&
                        (isValidEmail ? (
                          <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
                        ) : (
                          <X className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
                        ))}
                    </div>
                    {formTouched && email && !isValidEmail && (
                      <p className="text-xs text-red-500">Please enter a valid email address</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-[#3d3d3d]">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="pl-10 transition-all duration-200 focus:border-[#4db6ac] focus:ring-[#4db6ac]/20"
                        required
                        aria-required="true"
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

                    {/* Password requirements */}
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <div
                            className={`mr-2 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                              req.met ? "bg-green-500" : password ? "bg-red-300" : "bg-gray-300"
                            }`}
                          ></div>
                          <span
                            className={`transition-colors duration-300 ${
                              req.met ? "text-green-600" : password ? "text-red-500" : "text-gray-500"
                            }`}
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-[#3d3d3d]">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className={`pl-10 transition-all duration-200 focus:border-[#4db6ac] focus:ring-[#4db6ac]/20 ${
                          confirmPassword && !passwordsMatch ? "border-red-500" : ""
                        }`}
                        required
                        aria-required="true"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {confirmPassword && !passwordsMatch && (
                      <p className="text-xs text-red-500">Passwords don't match</p>
                    )}
                    {confirmPassword && passwordsMatch && (
                      <p className="text-xs text-green-500 flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Passwords match
                      </p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked)}
                      className="mt-1 data-[state=checked]:bg-[#4db6ac] data-[state=checked]:border-[#4db6ac]"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-tight text-[#5a5a5a] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-[#4db6ac] transition-colors duration-200 hover:text-[#3d9d93] hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-[#4db6ac] transition-colors duration-200 hover:text-[#3d9d93] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#4db6ac] text-white transition-all duration-200 hover:bg-[#3d9d93] hover:shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-[#5a5a5a]">Already have an account? </span>
                  <Link
                    href="/login"
                    className="font-medium text-[#4db6ac] transition-colors duration-200 hover:text-[#3d9d93] hover:underline"
                  >
                    Sign in
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

