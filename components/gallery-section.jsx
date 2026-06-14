"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { X } from "lucide-react"

export default function GallerySection({ images = [] }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: "200px 0px" })
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageAlt, setSelectedImageAlt] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return <div className="py-16 bg-[#faf6ed]" ref={ref}></div>

  return (
    <section ref={ref} className="py-16 bg-[#faf6ed]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#4db6ac]/10 text-[#4db6ac] font-medium px-4 py-1 rounded-full text-sm mb-4">
            Our Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3d3d3d] mb-4">Moments of Impact and Hope</h2>
          <p className="text-[#5a5a5a] max-w-2xl mx-auto">A visual record of our programs, communities, and people across Bangladesh.</p>
        </div>

        {images.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold text-[#3d3d3d] mb-1">No photos added yet</p>
            <p className="text-sm text-[#5a5a5a]">Our gallery is coming soon. Check back for updates.</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => { setSelectedImage(image.src); setSelectedImageAlt(image.alt) }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d3d3d]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-xs font-medium text-[#4db6ac] bg-white/20 px-2 py-1 rounded-full">
                      {image.category}
                    </span>
                    <h3 className="text-white font-medium mt-2">{image.alt}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="text-center mt-10">
          <Link href="/gallery">
            <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">View Full Gallery</Button>
          </Link>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative aspect-video">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={selectedImageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
              />
            </div>
            <div className="mt-2 text-center text-white">
              <p>{selectedImageAlt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
