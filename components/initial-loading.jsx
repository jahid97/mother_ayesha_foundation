"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function InitialLoading() {
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded")
    if (hasLoaded) return

    setVisible(true)

    // Animate progress bar
    const steps = [
      { target: 40, delay: 0, duration: 400 },
      { target: 70, delay: 400, duration: 500 },
      { target: 90, delay: 900, duration: 400 },
      { target: 100, delay: 1500, duration: 200 },
    ]

    steps.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay)
    })

    // Start fade-out after progress completes
    const fadeTimer = setTimeout(() => setFadeOut(true), 1900)

    // Remove from DOM after fade
    const removeTimer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem("hasLoaded", "true")
    }, 2600)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf6ed]"
      style={{
        transition: "opacity 0.7s ease, visibility 0.7s ease",
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? "hidden" : "visible",
      }}
    >
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-200">
        <div
          className="h-full bg-[#4db6ac]"
          style={{
            width: `${progress}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Center content */}
      <div
        className="flex flex-col items-center"
        style={{
          animation: "loadingFadeUp 0.6s ease forwards",
        }}
      >
        {/* Logo ring */}
        <div className="relative mb-6">
          <div
            className="absolute inset-0 rounded-full bg-[#4db6ac]/20"
            style={{ animation: "loadingPulse 1.8s ease-in-out infinite" }}
          />
          <div className="relative h-20 w-20 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-2 border-[#4db6ac]/30">
            <Image
              src="/logo.png"
              alt="Mother Ayesha Foundation"
              fill
              className="object-contain p-2"
              onError={(e) => {
                e.target.style.display = "none"
              }}
            />
            {/* Fallback initials if logo missing */}
            <span className="text-[#4db6ac] font-bold text-2xl select-none">MA</span>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-[#3d3d3d] tracking-tight mb-1">
          Mother Ayesha Foundation
        </h1>
        <p className="text-sm text-gray-400 mb-8">Helping those who need it most</p>

        {/* Thin animated bar */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1 w-6 rounded-full bg-[#4db6ac]"
              style={{
                animation: `loadingBar 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loadingFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loadingPulse {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%       { transform: scale(1.35); opacity: 0.15; }
        }
        @keyframes loadingBar {
          0%, 100% { opacity: 0.25; transform: scaleY(1); }
          50%       { opacity: 1;    transform: scaleY(1.6); }
        }
      `}</style>
    </div>
  )
}
