"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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
import { Search, Menu, X, User, Globe, LogIn, UserPlus, Settings, HelpCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const languages = [
  { code: "EN", name: "English", native: "English" },
  { code: "AR", name: "Arabic", native: "العربية" },
  { code: "ES", name: "Spanish", native: "Español" },
  { code: "BN", name: "Bangla", native: "বাংলা" },
]

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, changeLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href) => pathname === href

  const navLinks = [
    { href: "/", key: "nav.home" },
    { href: "/about-us", key: "nav.about" },
    { href: "/stories", key: "nav.stories" },
    { href: "/projects", key: "nav.projects" },
    { href: "/gallery", key: "nav.gallery" },
    { href: "/contact-us", key: "nav.contact" },
  ]

  const mobileLinks = [
    { href: "/", key: "nav.home" },
    { href: "/about-us", key: "nav.about" },
    { href: "/projects", key: "nav.projects" },
    { href: "/stories", key: "nav.stories" },
    { href: "/blog", key: "nav.blog" },
    { href: "/gallery", key: "nav.gallery" },
    { href: "/volunteer-registration", key: "nav.volunteer" },
    { href: "/contact-us", key: "nav.contact" },
    { href: "/donate", key: "nav.donate" },
  ]

  const LanguageSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-2 text-white hover:bg-white/10 gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 bg-white">
        <DropdownMenuLabel>{t("common.selectLanguage")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={cn("cursor-pointer flex justify-between", language === lang.code && "bg-muted font-medium")}
            onClick={() => changeLanguage(lang.code)}
          >
            <span>{lang.native}</span>
            {language === lang.code && <span className="text-[#4db6ac] text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white hover:bg-white/10">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/login" className="w-full">
          <DropdownMenuItem className="cursor-pointer">
            <LogIn className="mr-2 h-4 w-4" />
            <span>Sign In</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/signup" className="w-full">
          <DropdownMenuItem className="cursor-pointer">
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Register</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help &amp; Support</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-[#3d3d3d]/95 backdrop-blur-sm shadow-md py-2" : "bg-[#3d3d3d] py-3",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#4db6ac]">
              <Image
                src="/placeholder.svg?height=40&width=40&text=MA"
                alt="Mother Ayesha Foundation Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-white leading-tight hidden sm:block">
              Mother Ayesha Foundation
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <nav className="flex items-center space-x-1">
              {navLinks.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "px-3 py-2 text-sm transition-colors relative",
                    isActive(href)
                      ? "text-[#4db6ac] font-medium after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#4db6ac] after:rounded-full"
                      : "text-white hover:text-[#4db6ac]",
                  )}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>

            <LanguageSelector />
            <UserMenu />

            <div className="flex items-center space-x-2 ml-1">
              <Link href="/donate">
                <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">
                  {t("nav.donate")}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Additional Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center lg:hidden space-x-1">
            <LanguageSelector />
            <UserMenu />
            <Link href="/donate">
              <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white text-sm px-3">
                {t("nav.donate")}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-[520px] opacity-100 mt-4" : "max-h-0 opacity-0",
          )}
        >
          <nav className="flex flex-col space-y-1 py-4">
            {mobileLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-2 py-2 rounded transition-colors",
                  isActive(href)
                    ? "text-[#4db6ac] bg-white/10 font-medium"
                    : "text-white hover:text-[#4db6ac] hover:bg-white/10",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
            <div className="relative mt-2 border-t border-white/10 pt-4">
              <Search className="absolute left-3 top-[calc(50%+8px)] transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <input
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-md bg-white/10 px-10 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#4db6ac] focus:bg-white/20"
              />
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop Additional Menu dropdown */}
      <div
        className={cn(
          "absolute right-4 top-16 w-64 bg-[#3d3d3d] shadow-lg rounded-md overflow-hidden transition-all duration-300 ease-in-out z-50 lg:block hidden",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        <nav className="flex flex-col py-2">
          <div className="px-4 py-2 text-[#4db6ac] text-sm font-medium">{t("nav.additionalLinks")}</div>
          {[
            { href: "/volunteer-registration", key: "nav.volunteer" },
            { href: "/blog", key: "nav.blog" },
            { href: "/board-of-members", key: "nav.team" },
          ].map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="text-white hover:text-[#4db6ac] px-4 py-2 hover:bg-white/10 block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
          <div className="border-t border-white/10 mt-2 pt-2 px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-full rounded-md bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#4db6ac] focus:bg-white/20"
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
