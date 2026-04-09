// Stories page client component - Displays a grid of all stories
"use client"

import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { getAllStories } from "@/lib/stories-data"
import StoryCard from "@/components/story-card"
import PageHero from "@/components/page-hero"

export default function StoriesPageClient() {
  const stories = getAllStories()

  return (
    <>
      <SiteHeader />
      <style jsx global>{`
        body {
          background-color: #faf6ed !important;
        }
      `}</style>
      <div className="bg-[#faf6ed] min-h-screen" style={{ backgroundColor: "#faf6ed" }}>
        <PageHero
          title="Our Stories"
          description="Real stories of hope, resilience, and transformation from the communities we serve."
          hasImage={false}
          bgColor="bg-white"
        />

        <main className="container mx-auto px-4 py-12 bg-[#faf6ed]">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

