import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import FocusAreasSection from "@/components/focus-areas-section"
import GallerySection from "@/components/gallery-section"
import FeaturedProjectsSection from "@/components/featured-projects-section"
import BlogSection from "@/components/blog-section"
import FeaturedStoriesSection from "@/components/featured-stories-section"
import MissionStatement from "@/components/mission-statement"
import VolunteerCtaSection from "@/components/volunteer-cta-section"
import { prisma } from "@/lib/db"

export const revalidate = 60 // re-fetch at most once per minute

export default async function Home() {
  const [featuredProjects, stories, blogPosts, galleryImages, heroSlides] = await Promise.all([
    prisma.project.findMany({ where: { featured: true }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.story.findMany({ where: { featured: true }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.blogPost.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
    prisma.galleryImage.findMany({ where: { featured: true }, take: 8, orderBy: { id: "asc" } }),
    prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
  ])

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <Hero slides={heroSlides} />
        <MissionStatement />
        <FocusAreasSection />
        <GallerySection images={galleryImages} />
        <FeaturedProjectsSection projects={featuredProjects} />
        <VolunteerCtaSection />
        <BlogSection posts={blogPosts} />
        <FeaturedStoriesSection stories={stories} />
      </main>

      <Footer />
    </div>
  )
}
