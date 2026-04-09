"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getAllStories } from "@/lib/stories-data"
import StoryCard from "@/components/story-card"
import AnimateOnScroll from "@/components/animate-on-scroll"
import { useLanguage } from "@/lib/language-context"

export default function FeaturedStoriesSection() {
  const { t } = useLanguage()
  const stories = getAllStories().slice(0, 3)

  return (
    <section className="bg-[#faf6ed] py-16">
      <div className="container mx-auto px-4">
        <AnimateOnScroll variant="up" className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("stories.heading")}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("stories.description")}</p>
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <AnimateOnScroll key={story.id} variant="up" delay={index * 120}>
              <StoryCard story={story} />
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll variant="fade" delay={200} className="mt-10 text-center">
          <Link
            href="/stories"
            className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-colors"
          >
            {t("stories.viewAll")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
