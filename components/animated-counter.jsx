// Animated counter component - Displays a number that animates from 0 to a target value
"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

export default function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const animationRef = useRef(null)

  // Use a lower threshold and rootMargin to prevent ResizeObserver issues
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "200px 0px", // Increase rootMargin
  })

  useEffect(() => {
    if (!inView) return

    let isMounted = true
    countRef.current = 0
    const startTime = Date.now()

    const animate = () => {
      if (!isMounted) return

      try {
        const timePassed = Date.now() - startTime
        const progress = Math.min(timePassed / duration, 1)

        // Easing function for smoother animation
        const easeOutQuad = (t) => t * (2 - t)
        const easedProgress = easeOutQuad(progress)

        countRef.current = Math.floor(easedProgress * end)
        setCount(countRef.current)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      } catch (error) {
        console.error("Animation error:", error)
      }
    }

    // Delay start of animation slightly
    setTimeout(() => {
      if (isMounted) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }, 100)

    return () => {
      isMounted = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [end, duration, inView])

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

