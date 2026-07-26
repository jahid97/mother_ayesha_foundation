import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Calendar, Tag, ArrowLeft, FolderKanban } from "lucide-react"
import BlockContent from "@/components/block-content"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const { slug } = await params
  const activity = await prisma.activity.findUnique({ where: { slug } })
  if (!activity) return { title: "Not Found | Mother Ayesha Foundation" }
  return {
    title: `${activity.title} | Mother Ayesha Foundation`,
    description: activity.excerpt,
  }
}

export default async function ActivityDetailPage({ params }) {
  const { slug } = await params

  const [activity, recentActivities] = await Promise.all([
    prisma.activity.findUnique({
      where: { slug },
      include: { project: { select: { id: true, title: true } } },
    }),
    prisma.activity.findMany({
      where: { published: true, slug: { not: slug } },
      take: 3,
      orderBy: { date: "desc" },
    }),
  ])

  if (!activity || !activity.published) notFound()

  const allPhotos = [activity.coverImage, ...(activity.images || [])].filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-[#3d3d3d] py-16">
          {activity.coverImage && (
            <div className="absolute inset-0">
              <Image src={activity.coverImage} alt={activity.title} fill className="object-cover opacity-20" />
            </div>
          )}
          <div className="container mx-auto px-4 relative">
            <Link href="/activities" className="inline-flex items-center text-[#4db6ac] hover:text-white transition-colors mb-6 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Activities
            </Link>

            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {activity.category && <Badge className="bg-[#4db6ac] text-white">{activity.category}</Badge>}
                {activity.featured && <Badge className="bg-amber-500 text-white">Featured</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{activity.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{activity.excerpt}</p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#4db6ac]" />
                  {activity.date}
                </span>
                {activity.project && (
                  <Link href={`/projects/${activity.project.id}`} className="flex items-center gap-2 hover:text-[#4db6ac] transition-colors">
                    <FolderKanban className="h-4 w-4 text-[#4db6ac]" />
                    {activity.project.title}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Main content */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
                <BlockContent content={activity.content} />
              </div>

              {/* Photo gallery */}
              {allPhotos.length > 1 && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-[#3d3d3d] mb-4">Photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allPhotos.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <Image
                          src={src}
                          alt={`${activity.title} photo ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {activity.videos?.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-[#3d3d3d] mb-4">Videos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activity.videos.map((src, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden shadow-sm bg-black">
                        <video src={src} controls className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related project CTA */}
              {activity.project && (
                <div className="bg-[#4db6ac]/10 border border-[#4db6ac]/20 rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-grow">
                    <p className="text-sm text-[#5a5a5a] mb-1">This activity is part of</p>
                    <p className="font-bold text-[#3d3d3d]">{activity.project.title}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <Link href={`/projects/${activity.project.id}`}>
                      <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white text-sm">
                        View Project
                      </Button>
                    </Link>
                    <Link href={`/donate?project=${activity.project.id}`}>
                      <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white text-sm">Donate</Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Link href="/activities">
                  <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
                    ← All Activities
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Donate Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* More activities */}
        {recentActivities.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-8 text-center">More Activities</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {recentActivities.map((a) => (
                  <Link key={a.id} href={`/activities/${a.slug}`} className="group block">
                    <div className="bg-[#faf6ed] rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg">
                      <div className="relative h-44">
                        {a.coverImage ? (
                          <Image src={a.coverImage} alt={a.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#4db6ac]/20 to-[#3d3d3d]/10" />
                        )}
                        {a.category && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-[#4db6ac] text-white text-xs">{a.category}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-[#5a5a5a] mb-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-[#4db6ac]" />{a.date}
                        </p>
                        <h3 className="font-bold text-[#3d3d3d] mb-1 group-hover:text-[#4db6ac] transition-colors line-clamp-2">{a.title}</h3>
                        <p className="text-[#5a5a5a] text-sm line-clamp-2">{a.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
