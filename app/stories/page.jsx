import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { getAllStories } from "@/lib/stories-data"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"

export const metadata = {
  title: "Stories | Mother Aysha Foundation",
  description: "Read inspiring stories of hope, resilience, and transformation from our work around the world.",
}

export default function StoriesPage() {
  const stories = getAllStories()

  return (
    <>
      <SiteHeader />
      <div className="bg-[#faf6ed] min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-[#3d3d3d] py-16 mb-12">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/placeholder.svg?height=600&width=1200&text=Pattern"
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl">
              <AnimateOnScroll variant="up" delay={0}>
                <span className="inline-block bg-white/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                  REAL STORIES
                </span>
              </AnimateOnScroll>
              <AnimateOnScroll variant="up" delay={100}>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Stories of Hope & Transformation</h1>
              </AnimateOnScroll>
              <AnimateOnScroll variant="up" delay={200}>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Inspiring stories and updates from our orphaned children's community, highlighting the impact of your
                  support and generosity. Discover the power of compassion in action.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => (
              <AnimateOnScroll key={story.id} variant="up" delay={(index % 3) * 100}>
                <Link
                  href={`/stories/${story.id}`}
                  className="group block transform transition-all duration-300 hover:-translate-y-2 h-full"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
                    {/* Story image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Story content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-3 flex items-center justify-between">
                        <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                          {story.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{story.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{story.excerpt}</p>

                      {/* Author info and read more link */}
                      <div className="flex items-center mt-auto">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 overflow-hidden">
                            <span className="text-xs font-medium text-gray-600">
                              {story.author
                                .split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700">{story.author}</span>
                        </div>
                        <span className="ml-auto text-primary flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Read Story <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
