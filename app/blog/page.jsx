import BlogCard from "@/components/blog-card"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import PageHero from "@/components/page-hero"
import PartnersDisplay from "@/components/partners-display"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ed]">
      {/* Header/Navigation */}
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <PageHero
          badge="BLOG & UPDATES"
          title="News, Insights & Updates"
          description="The latest from Mother Ayesha Foundation — program updates, research insights, community stories, and announcements from our work across Bangladesh."
        />

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Map through blog posts and render a BlogCard for each */}
              {blogPosts.map((post, index) => (
                <BlogCard key={index} {...post} />
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersDisplay />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

