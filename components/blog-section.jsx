"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getFeaturedBlogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import AnimateOnScroll from "@/components/animate-on-scroll"
import { useLanguage } from "@/lib/language-context"

export default function BlogSection() {
  const { t } = useLanguage()
  const featuredPosts = getFeaturedBlogPosts(3)

  return (
    <section className="py-16 bg-[#faf6ed]">
      <div className="container mx-auto px-4">
        <AnimateOnScroll variant="left" className="flex justify-between items-center mb-8">
          <div>
            <span className="text-[#4db6ac] font-medium">{t("blog.badge")}</span>
            <h2 className="text-3xl font-bold text-[#3d3d3d]">{t("blog.heading")}</h2>
            <p className="text-[#5a5a5a] mt-2 max-w-2xl">{t("blog.description")}</p>
          </div>
          <Link href="/blog" className="hidden md:block">
            <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
              {t("blog.viewAll")}
            </Button>
          </Link>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <AnimateOnScroll key={index} variant="up" delay={index * 120}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <Card className="bg-white border-none shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
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

        <div className="text-center mt-8 md:hidden">
          <Link href="/blog">
            <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
              {t("blog.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
