"use client"

/**
 * Wraps children in a tag that animates into view when scrolled to.
 * Uses react-intersection-observer; animation plays once and stays visible.
 *
 * Props:
 *   variant   - animation direction: "up" | "down" | "left" | "right" | "fade" | "scale"
 *   delay     - ms before transition starts (applied via inline style, not Tailwind)
 *   duration  - ms for the transition — passed as an inline style because Tailwind
 *               cannot generate dynamic class names like `duration-${n}` at runtime
 *   threshold - 0–1, how much of the element must be visible to trigger
 *   as        - HTML tag to render (default "div")
 */
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const variants = {
  up:    { hidden: "opacity-0 translate-y-8",   visible: "opacity-100 translate-y-0" },
  down:  { hidden: "opacity-0 -translate-y-8",  visible: "opacity-100 translate-y-0" },
  left:  { hidden: "opacity-0 -translate-x-10", visible: "opacity-100 translate-x-0" },
  right: { hidden: "opacity-0 translate-x-10",  visible: "opacity-100 translate-x-0" },
  fade:  { hidden: "opacity-0",                  visible: "opacity-100" },
  scale: { hidden: "opacity-0 scale-95",         visible: "opacity-100 scale-100" },
}

export default function AnimateOnScroll({
  children,
  variant = "up",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.1,
  as: Tag = "div",
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold, rootMargin: "60px 0px" })
  const { hidden, visible } = variants[variant] || variants.up

  return (
    <Tag
      ref={ref}
      className={cn("transition-all ease-out", inView ? visible : hidden, className)}
      // duration and delay must be inline styles — Tailwind purges dynamic class strings
      style={{
        transitionDuration: `${duration}ms`,
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
      }}
    >
      {children}
    </Tag>
  )
}
