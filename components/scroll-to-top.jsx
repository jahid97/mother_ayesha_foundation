"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // When the pathname changes, scroll to the top of the page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use 'instant' instead of 'smooth' for immediate scrolling
    })
  }, [pathname])

  return null
}

