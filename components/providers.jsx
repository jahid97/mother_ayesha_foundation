"use client"

import dynamic from "next/dynamic"
import { SessionProvider } from "next-auth/react"

const ChatHelp = dynamic(() => import("@/components/chat-help"), { ssr: false })

export default function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
      <ChatHelp />
    </SessionProvider>
  )
}
