import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import DonationForm from "@/components/donation-form"
import { blogPosts } from "@/lib/blog-data"

// Helper function to find a blog post by its slug
function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

export default function BlogPostPage({ params }) {
  // Get the blog post by slug or use the fallback data
  const blogPost = getBlogPostBySlug(params.slug) || {
    category: "Children",
    date: "Friday, April 4, 2023",
    title: "The Impact of Your Donations: Real Stories from Orphaned Children",
    content: `Your generosity has the power to transform lives. Every donation, no matter how big or small, brings hope and support to orphaned children around the world. Here are three stories of children who have benefited from your kindness.`,
    sections: [
      // Blog post sections with titles, content, bullet points, and conclusions
      {
        title: "A Home to Call Their Own",
        content: `Meet Sophia, a 10-year-old orphan who lived on the streets, scrounging for food and seeking shelter at night. But everything changed when she found a loving home at our Little Angels orphanage. Your donations provided Sophia with:`,
        bulletPoints: [
          "A warm bed and a safe place to sleep",
          "Nutritious meals and access to clean water",
          "A supportive community and counseling services",
        ],
        conclusion: "Today, Sophia is thriving in school and has big dreams for her future.",
      },
      {
        title: "A Chance to Thrive",
        content: `Your support enabled us to provide educational resources and tutoring to John, a bright and curious 12-year-old orphan. John's love for learning was evident, but he lacked the tools to succeed. Your donations helped us provide:`,
        bulletPoints: [
          "School supplies and uniforms",
          "Tutoring services and academic support",
          "Access to technology and online resources",
        ],
        conclusion:
          "Today, John excels in school and dreams of becoming a doctor, inspiring others with his determination and passion.",
      },
      {
        title: "A Brighter Future",
        content: `Thanks to your kindness, we were able to provide medical care and therapy to Maria, a 7-year-old orphan who suffered from a life-threatening illness. Your donations helped us cover:`,
        bulletPoints: [
          "Medical expenses and hospital bills",
          "Therapy sessions and rehabilitation services",
          "Nutritional support and care",
        ],
        conclusion:
          "Maria is now healthy and full of joy, with a future full of promise. She loves playing with her friends and exploring the world around her.",
      },
    ],
    conclusion: `These stories are just a few examples of the impact your donations have on the lives of orphaned children. Your compassion and generosity bring hope, support, and transformation to those who need it most. Thank you for being a part of our community and for making a difference in the lives of these incredible children.`,
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Article Section */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center text-[#4db6ac] hover:text-[#3d9d93] transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>

            {/* Category and Date */}
            <div className="mb-4">
              <span className="text-[#4db6ac] mr-2">{blogPost.category}</span>
              <span className="text-[#5a5a5a]">{blogPost.date}</span>
            </div>

            {/* Title */}
            <h1 className="mb-8 text-4xl font-bold text-[#3d3d3d] md:text-5xl max-w-4xl">{blogPost.title}</h1>

            {/* Featured Image */}
            <div className="relative mb-8 h-[400px] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=800&width=1200&text=Featured+Image"
                alt="Featured image"
                fill
                className="object-cover"
              />
            </div>

            {/* Introduction */}
            <p className="mb-12 text-lg text-[#5a5a5a] max-w-3xl">{blogPost.content}</p>

            {/* Story Sections */}
            <div className="space-y-12 max-w-3xl">
              {blogPost.sections &&
                blogPost.sections.map((section, index) => (
                  <section key={index}>
                    <h2 className="mb-4 text-2xl font-bold text-[#3d3d3d]">{section.title}</h2>
                    <p className="mb-4 text-[#5a5a5a]">{section.content}</p>
                    <ul className="mb-4 space-y-2 pl-6">
                      {section.bulletPoints.map((point, i) => (
                        <li key={i} className="text-[#5a5a5a] list-disc">
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[#5a5a5a] italic">{section.conclusion}</p>
                  </section>
                ))}
            </div>

            {/* Conclusion */}
            <div className="mt-12 max-w-3xl">
              <p className="text-[#5a5a5a]">{blogPost.conclusion}</p>
            </div>
          </div>
        </article>

        {/* Partners Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-8 text-[#3d3d3d]">
              Over <span className="font-bold text-[#4db6ac]">200+</span> partner currently help us
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {/* Partner logos */}
              {["Save the Children", "UNICEF", "American Red Cross", "Amazon", "World Vision"].map((partner) => (
                <div key={partner} className="relative h-16 w-32">
                  <Image
                    src={`/placeholder.svg?height=64&width=128&text=${partner.replace(/\s+/g, "+")}`}
                    alt={partner}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="py-16 bg-[#3d3d3d]">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=800&width=600&text=Donate+Now"
                  alt="Donate now"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>
              <div>
                <DonationForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

