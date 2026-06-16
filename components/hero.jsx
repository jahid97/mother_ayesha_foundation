"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

const FALLBACK_SLIDES = [
  {
    id: "fallback-1",
    type: "charity_project",
    src: "/placeholder.svg?height=700&width=1920&text=Children+Smiling",
    alt: "Children smiling and showing artwork",
    title: "Building a Better Bangladesh Through Compassion",
    subtitle: "Mother Ayesha Foundation is dedicated to healthcare, education, research, skills development, and social welfare for underprivileged communities across Bangladesh.",
    active: true,
    order: 0,
  },
  {
    id: "fallback-2",
    type: "charity_project",
    src: "/placeholder.svg?height=700&width=1920&text=Education+Programs",
    alt: "Children in education programs",
    title: "Empowering Communities Through Education & Skills",
    subtitle: "From scholarships and TVET institutes to financial literacy — we equip people with the tools to build self-sufficient, dignified lives.",
    active: true,
    order: 1,
  },
  {
    id: "fallback-3",
    type: "charity_project",
    src: "/placeholder.svg?height=700&width=1920&text=Healthcare",
    alt: "Healthcare programs",
    title: "Quality Healthcare for Every Community",
    subtitle: "We establish clinics, hospitals, eye care facilities, and elderly care programs to serve those most in need across Bangladesh.",
    active: true,
    order: 2,
  },
  {
    id: "fallback-4",
    type: "charity_project",
    src: "/placeholder.svg?height=700&width=1920&text=Research",
    alt: "Research and development",
    title: "Research-Driven Solutions for Sustainable Development",
    subtitle: "We connect academia, industry, and government to drive evidence-based policy change aligned with UN SDG 2030 goals.",
    active: true,
    order: 3,
  },
]

export default function Hero({ slides: dbSlides = [] }) {
  const slides = dbSlides.length > 0 ? dbSlides : FALLBACK_SLIDES
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
  }, [slides.length])

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [startInterval])

  const goTo = (index) => {
    setCurrentIndex(index)
    startInterval()
  }

  const prev = () => goTo((currentIndex - 1 + slides.length) % slides.length)
  const next = () => goTo((currentIndex + 1) % slides.length)

  const current = slides[currentIndex]

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt || ""}
            fill
            className="object-cover brightness-[0.6]"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay — always present for visual polish */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />

      {/* Content overlay — only for charity_project type */}
      {current.type === "charity_project" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
          <div
            key={`${currentIndex}-content`}
            style={{ animation: "fadeInUp 0.7s ease forwards" }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              {current.title}
            </h1>
            {current.subtitle && (
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 drop-shadow">
                {current.subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={current.projectId ? `/donate?project=${current.projectId}` : "/donate"}
                className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg"
              >
                Donate Now
              </Link>
              <Link
                href={current.projectId ? `/projects/${current.projectId}` : "/about-us"}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors border border-white/40"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2.5 bg-[#4db6ac]"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-11 h-11 rounded-full flex items-center justify-center z-20 transition-colors"
            onClick={prev}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-11 h-11 rounded-full flex items-center justify-center z-20 transition-colors"
            onClick={next}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
