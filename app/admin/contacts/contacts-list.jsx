"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ContactsList({ messages: initialMessages }) {
  const [messages, setMessages] = useState(initialMessages)
  const router = useRouter()

  const markRead = async (id, read) => {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    })
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read } : m))
    router.refresh()
  }

  if (messages.length === 0) {
    return <div className="bg-white rounded-lg shadow-sm p-12 text-center text-gray-400">No messages yet</div>
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div key={m.id} className={`bg-white rounded-lg shadow-sm p-5 border-l-4 ${m.read ? "border-gray-200" : "border-[#4db6ac]"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{m.name}</span>
                {!m.read && (
                  <span className="text-xs bg-[#4db6ac] text-white px-1.5 py-0.5 rounded-full">New</span>
                )}
              </div>
              <a href={`mailto:${m.email}`} className="text-sm text-[#4db6ac] hover:underline">{m.email}</a>
              <p className="mt-2 text-gray-700 text-sm whitespace-pre-wrap">{m.message}</p>
              <p className="mt-2 text-xs text-gray-400">{new Date(m.createdAt).toLocaleString("en-GB")}</p>
            </div>
            <button
              onClick={() => markRead(m.id, !m.read)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                m.read
                  ? "border-gray-200 text-gray-500 hover:bg-gray-50"
                  : "border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac]/5"
              }`}
            >
              {m.read ? "Mark unread" : "Mark read"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
