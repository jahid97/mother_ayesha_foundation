"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Menu, X, User, Globe, LogIn, UserPlus, LayoutDashboard, LogOut, UserCircle } from "lucide-react"

const languages = [
  { code: "en", label: "EN", native: "English" },
  { code: "ar", label: "AR", native: "العربية" },
  { code: "es", label: "ES", native: "Español" },
  { code: "bn", label: "BN", native: "বাংলা" },
]

function getActiveLang() {
  if (typeof document === "undefined") return "en"
  const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/)
  return match ? match[1] : "en"
}

function applyGoogleTranslate(langCode) {
  const host = window.location.hostname
  if (langCode === "en") {
    // Clear cookie in all domain variants
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host}`
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host}`
    // Try using the GT widget directly — most reliable way to restore English
    const combo = document.querySelector(".goog-te-combo")
    if (combo) {
      combo.value = "en"
      combo.dispatchEvent(new Event("change"))
      return
    }
  } else {
    document.cookie = `googtrans=/en/${langCode}; path=/`
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${host}`
  }
  window.location.reload()
}

const BRAND_NAMES = {
  en: { name: "Mother Ayesha", sub: "Foundation" },
  bn: { name: "মাদার আয়েশা", sub: "ফাউন্ডেশন" },
  ar: { name: "ماذر عائشة",   sub: "فاونديشن" },
  es: { name: "Mother Ayesha", sub: "Foundation" },
}

const navLinks = [
  { href: "/",            label: "Home" },
  { href: "/about-us",   label: "About" },
  { href: "/activities", label: "Activities" },
  { href: "/projects",   label: "Projects" },
  { href: "/gallery",    label: "Gallery" },
  { href: "/contact-us", label: "Contact" },
]

const mobileLinks = [
  { href: "/",                   label: "Home" },
  { href: "/about-us",          label: "About" },
  { href: "/social-business",   label: "Social Business" },
  { href: "/projects",          label: "Projects" },
  { href: "/activities",        label: "Activities" },
  { href: "/stories",           label: "Stories" },
  { href: "/blog",              label: "Blog" },
  { href: "/gallery",           label: "Gallery" },
  { href: "/board-of-members",  label: "Board of Members" },
  { href: "/contact-us",        label: "Contact" },
  { href: "/donate",            label: "Donate" },
]

// Shared dark content style for all three dropdowns
const darkContent = "bg-[#3d3d3d] border border-white/10 text-white shadow-xl"
const darkItem    = "text-white/80 hover:text-white hover:bg-white/10 focus:text-white focus:bg-white/10 cursor-pointer"
const darkLabel   = "text-white/50 text-xs uppercase tracking-wider"
const darkSep     = "bg-white/10"

export default function SiteHeader() {
  const [isScrolled, setIsScrolled]       = useState(false)
  const [isMobileMenuOpen, setMobileMenu] = useState(false)
  const [isExtraOpen, setExtraOpen]       = useState(false)
  const [activeLang, setActiveLang]       = useState("en")
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    setActiveLang(getActiveLang())
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href) => pathname === href

  const LanguageSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-2 text-white hover:bg-white/10 gap-1.5">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-xs font-medium">{activeLang.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-44", darkContent)}>
        <DropdownMenuLabel className={darkLabel}>Language</DropdownMenuLabel>
        <DropdownMenuSeparator className={darkSep} />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={cn(darkItem, "flex justify-between", activeLang === lang.code && "text-[#4db6ac] focus:text-[#4db6ac]")}
            onClick={() => applyGoogleTranslate(lang.code)}
          >
            <span>{lang.native}</span>
            {activeLang === lang.code && <span className="text-[#4db6ac] text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white hover:bg-white/10 relative p-0">
          {session ? (
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-[#4db6ac] text-white font-semibold text-sm select-none ring-2 ring-[#4db6ac]/50">
              {session.user.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#3d3d3d]" />
            </span>
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-56", darkContent)}>
        {session ? (
          <>
            <DropdownMenuLabel>
              <div className="font-medium text-white">{session.user.name}</div>
              <div className="text-xs text-white/50 font-normal truncate">{session.user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={darkSep} />
            <Link href="/profile" className="w-full">
              <DropdownMenuItem className={darkItem}>
                <UserCircle className="mr-2 h-4 w-4" />My Profile
              </DropdownMenuItem>
            </Link>
            {session.user.role === "admin" && (
              <Link href="/admin" className="w-full">
                <DropdownMenuItem className={darkItem}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />Admin Panel
                </DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuSeparator className={darkSep} />
            <DropdownMenuItem
              className="text-red-400 hover:text-red-300 hover:bg-white/10 focus:text-red-300 focus:bg-white/10 cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className={darkLabel}>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className={darkSep} />
            <Link href="/login" className="w-full">
              <DropdownMenuItem className={darkItem}>
                <LogIn className="mr-2 h-4 w-4" />Sign In
              </DropdownMenuItem>
            </Link>
            <Link href="/signup" className="w-full">
              <DropdownMenuItem className={darkItem}>
                <UserPlus className="mr-2 h-4 w-4" />Register
              </DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-[#3d3d3d]/95 backdrop-blur-sm shadow-md py-2" : "bg-[#3d3d3d] py-3",
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center overflow-visible">
            <Image src="/logo.png" alt="Mother Ayesha Foundation Logo" width={56} height={56} className="object-contain scale-[1.7] origin-left shrink-0" />
            <div className="hidden sm:flex flex-col leading-none ml-10" translate="no">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#4ecdc4] via-[#44b8e0] to-[#2196f3] bg-clip-text text-transparent">
                {(BRAND_NAMES[activeLang] || BRAND_NAMES.en).name}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60 mt-0.5">
                {(BRAND_NAMES[activeLang] || BRAND_NAMES.en).sub}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <nav className="flex items-center space-x-1">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className={cn(
                  "px-3 py-2 text-sm transition-colors relative",
                  isActive(href)
                    ? "text-[#4db6ac] font-medium after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#4db6ac] after:rounded-full"
                    : "text-white hover:text-[#4db6ac]",
                )}>
                  {label}
                </Link>
              ))}
            </nav>

            <LanguageSelector />
            <UserMenu />

            <div className="flex items-center space-x-2 ml-6">
              <Link href="/donate">
                <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Donate</Button>
              </Link>

              {/* 3-line extra menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setExtraOpen(v => !v)}
                >
                  {isExtraOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                <div className={cn(
                  "absolute right-0 top-11 w-52 rounded-xl overflow-hidden transition-all duration-200 z-50",
                  darkContent,
                  isExtraOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
                )}>
                  <div className={cn("px-4 py-2.5 text-xs font-semibold uppercase tracking-wider", darkLabel)}>More</div>
                  <div className={cn("h-px", darkSep)} />
                  {[
                    { href: "/social-business",   label: "Social Business" },
                    { href: "/stories",           label: "Stories" },
                    { href: "/blog",              label: "Blog" },
                    { href: "/board-of-members",  label: "Board of Members" },
                  ].map(({ href, label }) => (
                    <Link key={href} href={href} onClick={() => setExtraOpen(false)}
                      className={cn("block px-4 py-2.5 text-sm transition-colors", darkItem)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center lg:hidden space-x-1">
            <LanguageSelector />
            <UserMenu />
            <Link href="/donate" className="ml-2">
              <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white text-sm px-3">Donate</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setMobileMenu(v => !v)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-[520px] opacity-100 mt-4" : "max-h-0 opacity-0",
        )}>
          <nav className="flex flex-col space-y-1 py-4">
            {mobileLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={cn(
                  "px-2 py-2 rounded transition-colors",
                  isActive(href) ? "text-[#4db6ac] bg-white/10 font-medium" : "text-white hover:text-[#4db6ac] hover:bg-white/10",
                )}
                onClick={() => setMobileMenu(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
