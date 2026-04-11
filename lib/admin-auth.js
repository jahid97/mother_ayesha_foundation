/**
 * Server-side auth guard for admin API routes.
 *
 * Usage in any /api/admin/* route handler:
 *   const { session, error } = await requireAdmin()
 *   if (error) return error   // returns 401 or 403 JSON response
 *
 * Returns 401 if the user is not logged in, 403 if logged in but not an admin.
 * Middleware handles page-level protection; this guards the API layer.
 */
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function requireAdmin() {
  const session = await auth()
  if (!session) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }
  if (session.user?.role !== "admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) }
  }
  return { session }
}
