/**
 * Edge-compatible middleware for route protection.
 * Uses NextAuth's lightweight JWT check (no DB call) via authConfig.
 *
 * Protected routes:
 *   /admin/*  → must be logged in AND have role "admin"; anyone else is redirected
 *   /profile  → must be logged in; guests are sent to /login with a callbackUrl
 *
 * The `matcher` at the bottom tells Next.js which paths to run this middleware on,
 * so it never runs on public routes, API handlers, or static assets.
 */
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Admin section: requires an active session with the "admin" role
  if (pathname.startsWith("/admin")) {
    if (!req.auth) {
      // Not logged in → send to login, remember where they were going
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url))
    }
    if (req.auth.user?.role !== "admin") {
      // Logged in but not admin → send to homepage
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // Profile section: requires any active session
  if (pathname.startsWith("/profile")) {
    if (!req.auth) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url))
    }
  }
})

export const config = {
  // Only run middleware on these paths — keeps cold-start fast for public pages
  matcher: ["/admin/:path*", "/profile/:path*", "/profile"],
}
