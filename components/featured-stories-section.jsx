import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"

export default function FeaturedStoriesSection({ stories = [] }) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <AnimateOnScroll variant="up" className="mb-10 text-center">
          <span className="inline-block bg-[#4db6ac]/10 text-[#4db6ac] font-medium px-4 py-1 rounded-full text-sm mb-4">
            REAL STORIES
          </span>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl text-[#3d3d3d]">Stories of Hope & Transformation</h2>
          <p className="mx-auto max-w-2xl text-[#5a5a5a]">
            Real stories of hope, resilience, and transformation from the communities we serve.
          </p>
        </AnimateOnScroll>

        {stories.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold text-[#3d3d3d] mb-1">No stories published yet</p>
            <p className="text-sm text-[#5a5a5a]">We're gathering inspiring stories from our communities. Check back soon.</p>
          </div>
        ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <AnimateOnScroll key={story.id} variant="up" delay={index * 120}>
              <Link href={`/stories/${story.slug}`} className="group block h-full">
                {/* Card: image fills entire card with gradient overlay text at bottom */}
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Permanent gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Category badge top-left */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-medium bg-[#4db6ac] text-white px-2.5 py-1 rounded-full">
                      {story.category}
                    </span>
                  </div>

                  {/* Text at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs text-gray-300 mb-1">{story.date} · By {story.author}</p>
                    <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-[#4db6ac] transition-colors duration-300">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1.5 line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {story.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
        )}

        <AnimateOnScroll variant="up" delay={200} className="mt-10 text-center">
          <Link
            href="/stories"
            className="inline-flex items-center bg-[#4db6ac] hover:bg-[#3d9d93] text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            View All Stories
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
