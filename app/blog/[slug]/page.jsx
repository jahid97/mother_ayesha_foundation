import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) return { title: "Post Not Found | Mother Ayesha Foundation" }
  return {
    title: `${post.title} | Mother Ayesha Foundation`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const [post, recentPosts] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug } }),
    prisma.blogPost.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
  ])

  if (!post) notFound()

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back */}
            <Link href="/blog" className="mb-8 inline-flex items-center text-[#4db6ac] hover:text-[#3d9d93] transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Category & date */}
            <div className="mb-4 flex items-center gap-3">
              <Badge className="bg-[#4db6ac] text-white">{post.category}</Badge>
              <span className="text-sm text-[#5a5a5a]">{post.date}</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold text-[#3d3d3d] leading-tight">{post.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#4db6ac]" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#4db6ac]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-[#4db6ac]" />
                <span>{post.category}</span>
              </div>
            </div>

            {/* Featured image */}
            {post.image && (
              <div className="relative mb-8 h-[400px] overflow-hidden rounded-xl">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>
            )}

            {/* Excerpt */}
            <p className="text-xl text-[#5a5a5a] font-medium mb-8 leading-relaxed">{post.description}</p>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-[#3d3d3d] prose-p:text-[#5a5a5a] prose-a:text-[#4db6ac] prose-strong:text-[#3d3d3d]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author card */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#4db6ac] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">
                  {post.author.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#3d3d3d]">{post.author}</p>
                <p className="text-sm text-gray-500">Mother Ayesha Foundation</p>
              </div>
            </div>
          </div>
        </article>

        {/* Recent posts */}
        {recentPosts.filter((p) => p.id !== post.id).length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-8">More Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {recentPosts
                  .filter((p) => p.id !== post.id)
                  .slice(0, 3)
                  .map((p) => (
                    <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                      <div className="rounded-lg overflow-hidden bg-[#faf6ed] shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative h-40">
                          <Image
                            src={p.image || "/placeholder.svg"}
                            alt={p.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <Badge className="bg-[#4db6ac]/10 text-[#4db6ac] mb-2 text-xs">{p.category}</Badge>
                          <h3 className="font-semibold text-[#3d3d3d] text-sm line-clamp-2 group-hover:text-[#4db6ac] transition-colors">{p.title}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-[#3d3d3d]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Make a Difference Today</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Support our mission to bring healthcare, education, and hope to those who need it most.
            </p>
            <Link
              href="/donate"
              className="inline-block bg-[#4db6ac] hover:bg-[#3d9d93] text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
