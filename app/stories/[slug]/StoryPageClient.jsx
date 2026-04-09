// Story page client component - Displays a single story with full content
"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getStoryBySlug } from "@/lib/stories-data"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "lucide-react"

export default function StoryPageClient({ params }) {
  const story = getStoryBySlug(params.slug)

  if (!story) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <style jsx global>{`
        body {
          background-color: #faf6ed !important;
        }
      `}</style>
      <div className="bg-[#faf6ed] min-h-screen" style={{ backgroundColor: "#faf6ed" }}>
        <main className="container mx-auto px-4 py-12 bg-[#faf6ed]">
          <Link href="/stories" className="mb-8 inline-flex items-center text-primary hover:underline">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Stories
          </Link>

          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {story.category}
              </Badge>
              <span className="text-sm text-muted-foreground">{story.date}</span>
            </div>

            <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">{story.title}</h1>

            <p className="mb-8 text-xl text-muted-foreground">{story.excerpt}</p>

            <div className="mb-8 flex items-center">
              <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-full bg-primary/20"></div>
              </div>
              <div>
                <p className="font-medium">By {story.author}</p>
              </div>
            </div>

            <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src={story.image || "/placeholder.svg"}
                alt={story.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </div>

            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

