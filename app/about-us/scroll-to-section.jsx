"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToSection() {
  const pathname = usePathname()

  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)

      if (element) {
        // Wait a bit for the page to fully render before scrolling
        setTimeout(() => {
          // First scroll to top to ensure consistent behavior
          window.scrollTo(0, 0)

          // Then scroll to the section
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }, 300)
      }
    }
  }, [pathname])

  return null
}

