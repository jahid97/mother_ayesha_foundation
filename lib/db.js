/**
 * Prisma client singleton for Neon serverless Postgres.
 *
 * PrismaNeon uses Neon's HTTP driver so queries work in Edge/serverless
 * environments where persistent TCP connections aren't supported.
 *
 * In development, we attach the client to `globalThis` so hot-reloads
 * don't create a new connection pool on every file change. In production
 * each serverless instance gets its own client (no global needed).
 */
import { PrismaClient } from "@/lib/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

function createPrismaClient() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
