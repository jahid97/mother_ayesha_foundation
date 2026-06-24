"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Calendar, Tag } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"

function getYear(dateStr) {
  if (!dateStr) return null
  const y = new Date(dateStr).getFullYear()
  return isNaN(y) ? null : y
}

export default function GalleryGrid({ images }) {
  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category).filter(Boolean)))]
  const years      = ["All", ...Array.from(new Set(images.map((img) => getYear(img.date)).filter(Boolean))).sort((a, b) => b - a)]
  const labels     = ["All", ...Array.from(new Set(images.map((img) => img.label).filter(Boolean)))]

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedYear,     setSelectedYear]     = useState("All")
  const [selectedLabel,    setSelectedLabel]    = useState("All")
  const [selectedImage,    setSelectedImage]    = useState(null)
  const [selectedImageAlt, setSelectedImageAlt] = useState("")

  const filteredImages = images.filter((img) => {
    const categoryMatch = selectedCategory === "All" || img.category === selectedCategory
    const yearMatch     = selectedYear     === "All" || getYear(img.date) === selectedYear
    const labelMatch    = selectedLabel    === "All" || img.label === selectedLabel
    return categoryMatch && yearMatch && labelMatch
  })

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">

          {/* Category filter */}
          <AnimateOnScroll variant="up" className="mb-4 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-[#4db6ac] text-white hover:bg-[#3d9d93]"
                    : "border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </AnimateOnScroll>

          {/* Label filter — only show if at least one image has a label */}
          {labels.length > 1 && (
            <AnimateOnScroll variant="up" className="mb-4 flex flex-wrap justify-center gap-2 items-center">
              <span className="text-xs text-[#5a5a5a] font-medium flex items-center gap-1 mr-1">
                <Tag className="w-3.5 h-3.5 text-[#4db6ac]" /> Label:
              </span>
              {labels.map((label) => (
                <button
                  key={label}
                  onClick={() => setSelectedLabel(label)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                    selectedLabel === label
                      ? "bg-[#4db6ac] text-white border-[#4db6ac]"
                      : "border-gray-300 text-[#5a5a5a] hover:border-[#4db6ac] hover:text-[#4db6ac]"
                  }`}
                >
                  {label === "All" ? "All Labels" : label}
                </button>
              ))}
            </AnimateOnScroll>
          )}

          {/* Year filter — only show if at least one image has a date */}
          {years.length > 1 && (
            <AnimateOnScroll variant="up" className="mb-10 flex flex-wrap justify-center gap-2 items-center">
              <span className="text-xs text-[#5a5a5a] font-medium flex items-center gap-1 mr-1">
                <Calendar className="w-3.5 h-3.5 text-[#4db6ac]" /> Year:
              </span>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                    selectedYear === year
                      ? "bg-[#3d3d3d] text-white border-[#3d3d3d]"
                      : "border-gray-300 text-[#5a5a5a] hover:border-[#3d3d3d] hover:text-[#3d3d3d]"
                  }`}
                >
                  {year === "All" ? "All Years" : year}
                </button>
              ))}
            </AnimateOnScroll>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((image, i) => (
              <AnimateOnScroll key={image.id} variant="scale" delay={(i % 4) * 80}>
                <div
                  className="group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => { setSelectedImage(image.src); setSelectedImageAlt(image.alt) }}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute bottom-0 w-full p-4 text-white">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="inline-block rounded-full bg-[#4db6ac]/80 px-2 py-0.5 text-xs font-medium">
                            {image.category}
                          </span>
                          {image.label && (
                            <span className="inline-block rounded-full bg-purple-500/80 px-2 py-0.5 text-xs font-medium flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5" />{image.label}
                            </span>
                          )}
                          {image.date && (
                            <span className="inline-block rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium">
                              {getYear(image.date)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-medium">{image.alt}</h3>
                        {image.location && (
                          <p className="text-xs text-white/70 mt-0.5">{image.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="mt-10 text-center">
              {images.length === 0 ? (
                <>
                  <p className="text-lg font-semibold text-[#3d3d3d] mb-1">No photos added yet</p>
                  <p className="text-sm text-[#5a5a5a]">Our gallery is coming soon. Check back for updates.</p>
                </>
              ) : (
                <>
                  <p className="text-[#5a5a5a]">No images found for this filter.</p>
                  <Button
                    className="mt-4 bg-[#4db6ac] text-white hover:bg-[#3d9d93]"
                    onClick={() => { setSelectedCategory("All"); setSelectedYear("All"); setSelectedLabel("All") }}
                  >
                    Clear Filters
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative aspect-video">
              <Image src={selectedImage || "/placeholder.svg"} alt={selectedImageAlt} fill className="object-contain" />
            </div>
            <div className="mt-2 text-center text-white">
              <p>{selectedImageAlt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
