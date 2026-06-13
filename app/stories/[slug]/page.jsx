import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, User, Tag } from "lucide-react"

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

  // Sample content for the story if not provided
  const storyContent =
    story.content ||
    `
    <p>
      ${story.excerpt}
    </p>
    <p>
      At Mother Ayesha Foundation, we believe in the power of stories to inspire change and build connections. This story exemplifies our mission to provide care, education, and hope to orphaned children around the world.
    </p>
    <p>
      Through our programs and your generous support, we continue to make a difference in the lives of children who need it most. Every child deserves the opportunity to thrive, and together, we can create lasting change.
    </p>
    <p>
      Thank you for being part of our journey and for taking the time to learn about the impact of our work. Your support makes stories like this possible.
    </p>
  `

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
                <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-primary">
                  <p className="text-xl text-gray-700 font-medium mb-6 leading-relaxed">{story.excerpt}</p>
                  <div dangerouslySetInnerHTML={{ __html: storyContent }} />
                </div>

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

