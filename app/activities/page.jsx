import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import PageHero from "@/components/page-hero"
import AnimateOnScroll from "@/components/animate-on-scroll"
import CallToAction from "@/components/call-to-action"
import { Calendar, Tag, Images } from "lucide-react"
import { prisma } from "@/lib/db"

export const revalidate = 3600

export const metadata = {
  title: "Activities | Mother Ayesha Foundation",
  description: "Updates and highlights from our ongoing and completed projects.",
}

export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    include: { project: { select: { id: true, title: true } } },
  })

  const categories = ["All", ...Array.from(new Set(activities.map((a) => a.category).filter(Boolean)))]

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <PageHero
          page="activities"
          badge="ACTIVITIES"
          title="Our Activities"
          description="Follow the latest updates, milestones, and highlights from our projects and programs across Bangladesh."
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            {activities.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl font-semibold text-[#3d3d3d] mb-2">No activities posted yet</p>
                <p className="text-[#5a5a5a]">Check back soon for updates on our work.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity, index) => (
                  <AnimateOnScroll key={activity.id} variant="up" delay={(index % 3) * 100}>
                    <Link href={`/activities/${activity.slug}`} className="group block h-full">
                      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                        {/* Cover image */}
                        <div className="relative h-52 overflow-hidden">
                          {activity.coverImage ? (
                            <Image
                              src={activity.coverImage}
                              alt={activity.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#4db6ac]/20 to-[#3d3d3d]/10 flex items-center justify-center">
                              <Images className="h-12 w-12 text-[#4db6ac]/40" />
                            </div>
                          )}
                          {activity.category && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-[#4db6ac] text-white text-xs">{activity.category}</Badge>
                            </div>
                          )}
                          {activity.images?.length > 0 && (
                            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Images className="h-3 w-3" />
                              {activity.images.length + 1}
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 text-xs text-[#5a5a5a] mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-[#4db6ac]" />
                              {activity.date}
                            </span>
                            {activity.project && (
                              <span className="flex items-center gap-1 truncate">
                                <Tag className="h-3.5 w-3.5 text-[#4db6ac]" />
                                {activity.project.title}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-[#3d3d3d] mb-2 group-hover:text-[#4db6ac] transition-colors line-clamp-2">
                            {activity.title}
                          </h3>

                          <p className="text-sm text-[#5a5a5a] line-clamp-3 flex-grow">{activity.excerpt}</p>

                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-sm font-medium text-[#4db6ac] group-hover:underline">
                              Read more →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            )}
          </div>
        </section>

        <CallToAction
          title="Support Our Work"
          description="Your donation helps us continue these activities and create lasting change in communities across Bangladesh."
          primaryButtonText="Donate Now"
          primaryButtonLink="/donate"
          secondaryButtonText="Our Projects"
          secondaryButtonLink="/projects"
        />
      </main>

      <Footer />
    </div>
  )
}
