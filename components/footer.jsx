"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Heart } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"
import { toast } from "sonner"

const socialIcons = {
  Facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Youtube: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  ),
}

const quickLinks = [
  { label: "About Us",        href: "/about-us" },
  { label: "Our Programs",    href: "/projects" },
  { label: "Projects",        href: "/projects" },
  { label: "Gallery",         href: "/gallery" },
  { label: "Board of Members", href: "/board-of-members" },
  { label: "Blog",            href: "/blog" },
  { label: "Stories",         href: "/stories" },
  { label: "Contact Us",      href: "/contact-us" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)

  const handleNewsletter = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribing(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to subscribe.")
      toast.success("Subscribed!", { description: "Thank you for subscribing to our newsletter." })
      setEmail("")
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <footer className="bg-[#3d3d3d] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#4db6ac]">
                <Image
                  src="/placeholder.svg?height=40&width=40&text=MA"
                  alt="Mother Aysha Foundation Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold leading-tight">Mother Ayesha Foundation</h2>
            </div>
            <p className="text-gray-300 mb-6">An independent, non-profit, non-political, non-governmental and charitable organization registered under the Societies Registration Act 1860 — dedicated to healthcare, education, research, and social welfare in Bangladesh.</p>
            <div className="flex space-x-3">
              {Object.entries(socialIcons).map(([name, icon]) => (
                <Link
                  key={name}
                  href="#"
                  aria-label={name}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#4db6ac] transition-colors duration-300"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#4db6ac]"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-[#4db6ac] transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#4db6ac]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-[#4db6ac] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  {siteConfig.contact.address.line1}
                  <br />
                  {siteConfig.contact.address.line2}
                  <br />
                  {siteConfig.contact.address.line3}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-[#4db6ac] flex-shrink-0" />
                <span className="text-gray-300">{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-[#4db6ac] flex-shrink-0" />
                <span className="text-gray-300">{siteConfig.contact.email}</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/donate">
                <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#4db6ac]"></span>
            </h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter to receive updates on our programs and how you can help make a difference.</p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#4db6ac]"
              />
              <Button type="submit" disabled={subscribing} className="w-full bg-[#4db6ac] hover:bg-[#3d9d93] text-white">
                {subscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-gray-400 mt-3">By subscribing, you agree to our Privacy Policy and consent to receive updates from our organization.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Mother Ayesha Foundation. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-[#4db6ac] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#4db6ac] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#4db6ac] transition-colors">
              Cookie Policy
            </Link>
            <div className="flex items-center">
              <span>Made with</span>
              <Heart className="h-3 w-3 mx-1 text-[#4db6ac]" />
              <span>for humanity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
