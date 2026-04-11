/**
 * Full NextAuth configuration — only imported in Node.js runtime (not Edge).
 * Edge-compatible config (callbacks, pages) lives in auth.config.js.
 *
 * Only the Credentials provider is used: email + bcrypt-hashed password.
 * The session only stores id, name, email, and role — no sensitive fields.
 */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null

        const email = String(credentials.email).toLowerCase().trim()
        const password = String(credentials.password)

        // Neon serverless Postgres can have cold-start delays on the first connection.
        // We retry once (with an 800ms pause) before giving up, so transient
        // connection errors don't immediately fail the login attempt.
        let lastError
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) return null

            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) return null

            // Only expose safe fields to the session — never the hashed password
            return { id: user.id, name: user.name, email: user.email, role: user.role }
          } catch (err) {
            lastError = err
            if (attempt < 1) await new Promise((r) => setTimeout(r, 800))
          }
        }

        console.error("[auth] authorize failed after retries:", lastError?.message)
        return null
      },
    }),
  ],
})
