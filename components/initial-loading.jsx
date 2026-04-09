"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function InitialLoading() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if this is the first load
    const hasLoaded = sessionStorage.getItem("hasLoaded")

    if (hasLoaded) {
      // If the site has already been loaded once in this session, don't show the loader
      setLoading(false)
      return
    }

    // Set a timeout to hide the loader after content has had time to load
    const timer = setTimeout(() => {
      setLoading(false)
      // Mark that the site has loaded in this session
      sessionStorage.setItem("hasLoaded", "true")
    }, 2000) // Adjust time as needed

    return () => clearTimeout(timer)
  }, [])

  // If not loading, don't render anything
  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf6ed]">
      <div className="relative w-32 h-32 mb-8">
        <Image src="/logo.png" alt="Mother Aysha Foundation Logo" fill className="object-contain" />
      </div>

      <h1 className="mb-6 text-3xl font-bold text-primary">Mother Aysha Foundation</h1>

      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>

      <p className="mt-6 text-sm text-gray-600">Loading amazing experiences...</p>
    </div>
  )
}

