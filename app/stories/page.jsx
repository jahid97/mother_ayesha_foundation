import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { prisma } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"
import PageHero from "@/components/page-hero"

export const revalidate = 3600

export const metadata = {
  title: "Stories | Mother Ayesha Foundation",
  description: "Read inspiring stories of hope, resilience, and transformation from our work around the world.",
}

export default async function StoriesPage() {
  const stories = await prisma.story.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <>
      <SiteHeader />
      <div className="bg-[#faf6ed] min-h-screen">
        <PageHero
          page="stories"
          badge="REAL STORIES"
          title="Stories of Hope & Transformation"
          description="Inspiring stories and updates from our orphaned children's community, highlighting the impact of your support and generosity. Discover the power of compassion in action."
        />

        {/* Stories Grid */}
        <div className="container mx-auto px-4 pb-16">
          {stories.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-xl font-semibold text-[#3d3d3d] mb-2">No stories published yet</p>
              <p className="text-[#5a5a5a]">We're gathering inspiring stories from our communities. Check back soon.</p>
            </div>
          ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => (
              <AnimateOnScroll key={story.id} variant="up" delay={(index % 3) * 100}>
                <Link
                  href={`/stories/${story.slug}`}
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
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
