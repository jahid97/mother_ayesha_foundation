import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, User, Tag } from "lucide-react"
import BlockContent from "@/components/block-content"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const story = await prisma.story.findUnique({ where: { slug } })

  if (!story) {
    return { title: "Story Not Found | Mother Ayesha Foundation" }
  }

  return {
    title: `${story.title} | Mother Ayesha Foundation`,
    description: story.excerpt,
  }
}

export default async function StoryPage({ params }) {
  const { slug } = await params
  const story = await prisma.story.findUnique({ where: { slug } })

  if (!story) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <div className="bg-[#faf6ed] min-h-screen">
        <main className="container mx-auto px-4 py-12">
          {/* Back to stories link */}
          <Link href="/stories" className="mb-8 inline-flex items-center text-primary hover:underline">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Stories
          </Link>

          <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Story hero image with title overlay */}
              <div className="relative h-[400px] w-full">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <Badge variant="outline" className="bg-primary/20 text-white border-none mb-3">
                    {story.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{story.title}</h1>
                </div>
              </div>

              {/* Story content */}
              <div className="p-8">
                {/* Story metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 border-b border-gray-100 pb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-primary" />
                    <span>By {story.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-primary" />
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1 text-primary" />
                    <span>{story.category}</span>
                  </div>
                </div>

                {/* Story body content */}
                <div>
                  <p className="text-xl text-[#5a5a5a] font-medium mb-6 leading-relaxed">{story.excerpt}</p>
                  <BlockContent content={story.content} />
                </div>

                {/* Photo gallery */}
                {story.images?.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {story.images.map((src, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <Image
                            src={src}
                            alt={`${story.title} photo ${i + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {story.videos?.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Videos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {story.videos.map((src, i) => (
                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden shadow-sm bg-black">
                          <video src={src} controls className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author information and back link */}
                <div className="mt-12 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                        <span className="text-sm font-medium text-gray-600">
                          {story.author
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">About the Author</p>
                        <p className="text-sm text-gray-600">{story.author}</p>
                      </div>
                    </div>
                    <Link href="/stories" className="text-primary hover:underline flex items-center">
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Back to Stories
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

