import BlogCard from "@/components/blog-card"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import PageHero from "@/components/page-hero"
import PartnersDisplay from "@/components/partners-display"
import { prisma } from "@/lib/db"

export const revalidate = 3600 // re-fetch once per hour

export default async function BlogPage() {
  const blogPosts = await prisma.blogPost.findMany({ take: 50, orderBy: { createdAt: "desc" } })

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
            {blogPosts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl font-semibold text-[#3d3d3d] mb-2">No posts published yet</p>
                <p className="text-[#5a5a5a]">We're working on our latest updates. Check back soon.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <BlogCard key={index} {...post} />
                ))}
              </div>
            )}
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

