"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex-1 text-center text-xs text-white/70 hover:text-white py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-1"
    >
      <LogOut className="h-3 w-3" />
      Sign Out
    </button>
  )
}
