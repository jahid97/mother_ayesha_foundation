"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Eye, EyeOff, Mail, Lock, Facebook, Github, Loader2 } from "lucide-react"

export default function LoginPage() {
  // State variables for form inputs and UI state
  const [email, setEmail] = useState("") // Email input state
  const [password, setPassword] = useState("") // Password input state
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [rememberMe, setRememberMe] = useState(false) // Remember me checkbox state
  const [isLoading, setIsLoading] = useState(false) // Loading state during form submission
  const [mounted, setMounted] = useState(false) // Track if component is mounted for animations

  const { toast } = useToast() // Initialize toast notifications
  const router = useRouter() // Initialize router for navigation

  // Effect to handle the mounting animation
  useEffect(() => {
    setMounted(true) // Set mounted to true after component mounts
  }, [])

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission

    // Validate form inputs
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true) // Set loading state to true

    try {
      // This would be replaced with actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

      // Show success toast
      toast({
        title: "Login successful",
        description: "Welcome back to Mother Aysha Foundation",
      })

      router.push("/") // Redirect to homepage after successful login
    } catch (error) {
      // Show error toast if login fails
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false) // Reset loading state
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
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=600&text=Mother+Aysha+Foundation"
                  alt="Mother Aysha Foundation"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d3d3d]/70 to-[#3d3d3d]/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white p-3 shadow-md transition-transform duration-300 hover:scale-105">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#4db6ac]">
                      <Image
                        src="/placeholder.svg?height=64&width=64&text=MA"
                        alt="Mother Aysha Foundation Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email input field */}
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
                        className="pl-10 transition-all duration-200 focus:border-[#4db6ac] focus:ring-[#4db6ac]/20"
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {/* Password input field with show/hide toggle */}
                  <div className="space-y-2">
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
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
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

                {/* Social login options */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-[#5a5a5a]">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {/* Facebook login button */}
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2 border-gray-300 text-[#3d3d3d] transition-all duration-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                    >
                      <Facebook className="h-4 w-4 text-blue-600" />
                      <span>Facebook</span>
                    </Button>

                    {/* GitHub login button */}
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2 border-gray-300 text-[#3d3d3d] transition-all duration-200 hover:bg-gray-100 hover:border-gray-400"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </Button>
                  </div>
                </div>

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

