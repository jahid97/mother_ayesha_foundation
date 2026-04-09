"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const slideImages = [
  { src: "/placeholder.svg?height=700&width=1920&text=Children+Smiling", alt: "Children smiling and showing artwork" },
  { src: "/placeholder.svg?height=700&width=1920&text=Education+Programs", alt: "Children in education programs" },
  { src: "/placeholder.svg?height=700&width=1920&text=Clean+Water+Initiative", alt: "Clean water initiative for children" },
  { src: "/placeholder.svg?height=700&width=1920&text=Medical+Care+Support", alt: "Medical care support for orphaned children" },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)
  const { t } = useLanguage()

  const slides = t("hero.slides")

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [startInterval])

  const goTo = (index) => {
    setCurrentIndex(index)
    startInterval()
  }

  const prev = () => goTo((currentIndex - 1 + slideImages.length) % slideImages.length)
  const next = () => goTo((currentIndex + 1) % slideImages.length)

  const currentSlide = Array.isArray(slides) ? slides[currentIndex] : null
  const title = currentSlide?.title ?? slideImages[currentIndex].alt
  const subtitle = currentSlide?.subtitle ?? ""

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      {slideImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover brightness-[0.6]"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
        <div
          key={`${currentIndex}-${title}`}
          style={{ animation: "fadeInUp 0.7s ease forwards" }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 drop-shadow">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg"
            >
              {t("hero.donateBtn")}
            </Link>
            <Link
              href="/about-us"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors border border-white/40"
            >
              {t("hero.learnBtn")}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slideImages.map((_, index) => (
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

      {/* Navigation arrows */}
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

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
