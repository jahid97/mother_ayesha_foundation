"use client"

import { useState } from "react"
import { X } from "lucide-react"

// Floating "Chat with our AI Psychologist" bubble. Opens a small window that embeds
// the live AI Psychologist app (philosopher-henna). Used only on the social-business section.
export default function AiPsychBubble() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="fixed bottom-24 left-4 sm:left-6 z-50 w-[min(384px,calc(100vw-2rem))] h-[560px] max-h-[calc(100vh-7rem)] rounded-2xl bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in">
          <div className="flex items-center justify-between px-4 py-3 bg-[#3d3d3d] text-white shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">🧠</span>
              <div>
                <div className="font-semibold text-sm leading-tight">AI Psychologist</div>
                <div className="text-[11px] text-gray-300 leading-tight">A warm, private space to talk things through</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/70 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <iframe
            src="https://philosopher-henna.vercel.app"
            title="AI Psychologist"
            className="flex-1 w-full border-0"
            allow="microphone; clipboard-write"
          />
          <div className="text-[10px] text-gray-400 text-center py-1.5 border-t border-gray-100 shrink-0">
            An AI companion from Mother Ayesha Foundation — not a licensed clinician.
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with our AI Psychologist"
        className="fixed bottom-6 left-4 sm:left-6 z-50 flex items-center gap-2 rounded-full bg-[#4db6ac] hover:bg-[#3d9d93] text-white shadow-lg pl-3.5 pr-4 py-3 transition-colors"
      >
        <span className="text-xl leading-none">🧠</span>
        <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
          {open ? "Close" : "Chat with our AI Psychologist"}
        </span>
      </button>
    </>
  )
}
