// app/page.jsx
// This is the homepage of the website
// It imports and renders various section components

import SiteHeader from "@/components/site-header" // Import the site header component
import Footer from "@/components/footer" // Import the footer component
import Hero from "@/components/hero" // Import the hero section component
import FocusAreasSection from "@/components/focus-areas-section" // Import the focus areas section
import GallerySection from "@/components/gallery-section" // Import the gallery section
import FeaturedProjectsSection from "@/components/featured-projects-section" // Import the featured projects section
import BlogSection from "@/components/blog-section" // Import the blog section
import FeaturedStoriesSection from "@/components/featured-stories-section" // Import the featured stories section
import MissionStatement from "@/components/mission-statement" // Import the mission statement component
import VolunteerCtaSection from "@/components/volunteer-cta-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ed]">
      {/* Header/Navigation */}
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero Section with Slideshow */}
        <Hero />

        {/* Mission Statement - Enhanced with Animation */}
        <MissionStatement />

        {/* Focus Areas Section */}
        <FocusAreasSection />

        {/* Gallery Section */}
        <GallerySection />

        {/* Projects Section */}
        <FeaturedProjectsSection />

        {/* Volunteer CTA Section */}
        <VolunteerCtaSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Featured Stories Section */}
        <FeaturedStoriesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

