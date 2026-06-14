import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AnimateOnScroll from "@/components/animate-on-scroll"

export default function BlogSection({ posts = [] }) {
  return (
    <section className="py-16 bg-[#faf6ed]">
      <div className="container mx-auto px-4">
        <AnimateOnScroll variant="up" className="text-center mb-8">
          <span className="text-[#4db6ac] font-medium">Blog</span>
          <h2 className="text-3xl font-bold text-[#3d3d3d]">Stories, Insights, and Updates About Our Mission</h2>
          <p className="text-[#5a5a5a] mt-2 max-w-2xl mx-auto">The latest from Mother Ayesha Foundation — program updates, research insights, and community stories.</p>
        </AnimateOnScroll>

        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold text-[#3d3d3d] mb-1">No posts published yet</p>
            <p className="text-sm text-[#5a5a5a]">We're working on our latest updates. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <AnimateOnScroll key={post.id} variant="up" delay={index * 120}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <Card className="bg-white border-none shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-[#4db6ac] font-medium mb-2">{post.date}</p>
                      <h3 className="text-lg font-bold mb-2 text-[#3d3d3d] line-clamp-2">{post.title}</h3>
                      {post.description && (
                        <p className="text-sm text-[#5a5a5a] line-clamp-2">{post.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        )}

        <AnimateOnScroll variant="up" delay={100} className="mt-10 text-center">
          <Link href="/blog">
            <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
              View All Posts
            </Button>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
