"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Calendar, Play } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"

function getYear(dateStr) {
  if (!dateStr) return null
  const y = new Date(dateStr).getFullYear()
  return isNaN(y) ? null : y
}

export default function GalleryGrid({ images }) {
  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category).filter(Boolean)))]
  const years      = ["All", ...Array.from(new Set(images.map((img) => getYear(img.date)).filter(Boolean))).sort((a, b) => b - a)]

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedYear,     setSelectedYear]     = useState("All")
  const [selectedImage,    setSelectedImage]    = useState(null)
  const [selectedImageAlt, setSelectedImageAlt] = useState("")
  const [selectedType,     setSelectedType]     = useState("image")

  const openImage = (src, alt, type = "image") => { setSelectedImage(src); setSelectedImageAlt(alt); setSelectedType(type) }

  // Base filter by category
  const categoryFiltered = images.filter((img) =>
    selectedCategory === "All" || img.category === selectedCategory
  )

  // When a year is selected → group by label
  const yearFiltered = categoryFiltered.filter((img) =>
    selectedYear === "All" || getYear(img.date) === selectedYear
  )

  // Build label groups for grouped view
  const groupedByLabel = yearFiltered.reduce((acc, img) => {
    const key = img.label?.trim() || "Other"
    if (!acc[key]) acc[key] = []
    acc[key].push(img)
    return acc
  }, {})

  const labelGroups = Object.entries(groupedByLabel).sort(([a], [b]) => {
    if (a === "Other") return 1
    if (b === "Other") return -1
    return a.localeCompare(b)
  })

  const isGrouped = selectedYear !== "All"

  const PhotoCard = ({ image, index }) => (
    <AnimateOnScroll key={image.id} variant="scale" delay={(index % 4) * 80}>
      <div
        className="group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
        onClick={() => openImage(image.src, image.alt, image.type)}
      >
        <div className="relative aspect-square">
          {image.type === "video" ? (
            <>
              <video src={image.src} className="absolute inset-0 w-full h-full object-cover" muted preload="metadata" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-5 w-5 text-white fill-white" />
                </div>
              </div>
            </>
          ) : (
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute bottom-0 w-full p-4 text-white">
              <span className="inline-block rounded-full bg-[#4db6ac]/80 px-2 py-0.5 text-xs font-medium mb-1">
                {image.category}
              </span>
              <h3 className="text-sm font-medium">{image.alt}</h3>
              {image.location && <p className="text-xs text-white/70 mt-0.5">{image.location}</p>}
            </div>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  )

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

          {/* Year filter */}
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

          {/* All years — flat grid */}
          {!isGrouped && (
            yearFiltered.length === 0 ? (
              <EmptyState images={images} onClear={() => { setSelectedCategory("All"); setSelectedYear("All") }} />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {yearFiltered.map((image, i) => <PhotoCard key={image.id} image={image} index={i} />)}
              </div>
            )
          )}

          {/* Year selected — grouped by label */}
          {isGrouped && (
            yearFiltered.length === 0 ? (
              <EmptyState images={images} onClear={() => { setSelectedCategory("All"); setSelectedYear("All") }} />
            ) : (
              <div className="space-y-14">
                {labelGroups.map(([label, photos]) => (
                  <div key={label}>
                    {/* Label heading */}
                    <div className="flex items-center gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#3d3d3d]">{label}</h3>
                        <p className="text-xs text-[#5a5a5a] mt-0.5">{photos.length} photo{photos.length !== 1 ? "s" : ""}</p>
                      </div>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {photos.map((image, i) => <PhotoCard key={image.id} image={image} index={i} />)}
                    </div>
                  </div>
                ))}
              </div>
            )
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
              {selectedType === "video" ? (
                <video src={selectedImage} className="w-full h-full object-contain" controls autoPlay />
              ) : (
                <Image src={selectedImage || "/placeholder.svg"} alt={selectedImageAlt} fill className="object-contain" />
              )}
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

function EmptyState({ images, onClear }) {
  if (images.length === 0) return (
    <div className="mt-10 text-center">
      <p className="text-lg font-semibold text-[#3d3d3d] mb-1">No photos added yet</p>
      <p className="text-sm text-[#5a5a5a]">Our gallery is coming soon. Check back for updates.</p>
    </div>
  )
  return (
    <div className="mt-10 text-center">
      <p className="text-[#5a5a5a]">No images found for this filter.</p>
      <Button className="mt-4 bg-[#4db6ac] text-white hover:bg-[#3d9d93]" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  )
}
