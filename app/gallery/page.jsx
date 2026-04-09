"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { X } from "lucide-react"
import { galleryImages, galleryCategories } from "@/lib/gallery-data"
import PageHero from "@/components/page-hero"
import CallToAction from "@/components/call-to-action"
import AnimateOnScroll from "@/components/animate-on-scroll"

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageAlt, setSelectedImageAlt] = useState("")

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <PageHero
          badge="GALLERY"
          title="Our Gallery"
          description="A visual record of our programs, communities, and people — from healthcare camps and TVET institutes to humanitarian relief efforts across Bangladesh."
        />

        {/* Gallery Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Category Filters */}
            <AnimateOnScroll variant="up" className="mb-10 flex flex-wrap justify-center gap-2">
              {galleryCategories.map((category) => (
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

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredImages.map((image, i) => (
                <AnimateOnScroll key={image.id} variant="scale" delay={(i % 4) * 80}>
                  <div
                    className="group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => {
                      setSelectedImage(image.src)
                      setSelectedImageAlt(image.alt)
                    }}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute bottom-0 w-full p-4 text-white">
                          <span className="mb-1 inline-block rounded-full bg-[#4db6ac]/80 px-2 py-0.5 text-xs font-medium">
                            {image.category}
                          </span>
                          <h3 className="text-lg font-medium">{image.alt}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
              <div className="mt-10 text-center">
                <p className="text-[#5a5a5a]">No images found for this category.</p>
                <Button
                  className="mt-4 bg-[#4db6ac] text-white hover:bg-[#3d9d93]"
                  onClick={() => setSelectedCategory("All")}
                >
                  View All Images
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <CallToAction
          title="Want to Help Our Cause?"
          description="Your support can make a real difference in the lives of orphaned children. Join us in our mission to provide care, education, and hope."
          primaryButtonText="Donate Now"
          primaryButtonLink="/donate"
          secondaryButtonText="Become a Volunteer"
          secondaryButtonLink="/volunteer-registration"
          bgColor="bg-[#3d3d3d]"
        />
      </main>

      <Footer />

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
