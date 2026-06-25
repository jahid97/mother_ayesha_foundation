import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Calendar, MapPin, ArrowLeft, CheckCircle2, AlertCircle, Trophy } from "lucide-react"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { id: slug } })
  if (!project) return { title: "Project Not Found | Mother Ayesha Foundation" }
  return {
    title: `${project.title} | Mother Ayesha Foundation`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params

  const [project, relatedProjects] = await Promise.all([
    prisma.project.findUnique({ where: { id: slug } }),
    prisma.project.findMany({
      where: { id: { not: slug }, active: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
  ])

  if (!project || project.active === false) notFound()

  const timeline = [
    { date: project.startDate, event: "Project launched", done: true },
    { date: project.endDate, event: "Expected completion", done: project.status === "completed" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-[#3d3d3d] py-16">
          <div className="container mx-auto px-4">
            <Link href="/projects" className="inline-flex items-center text-[#4db6ac] hover:text-white transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="flex gap-2 mb-4">
                  <Badge className="bg-[#4db6ac] text-white">{project.category}</Badge>
                  <Badge className={
                    project.status?.toLowerCase() === "ongoing" ? "bg-green-500 text-white" :
                    project.status?.toLowerCase() === "completed" ? "bg-blue-500 text-white" :
                    "bg-amber-500 text-white"
                  }>
                    {project.status}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
                <p className="text-gray-300 text-lg mb-6">{project.description}</p>

                <div className="flex flex-col space-y-3 mb-6 text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-[#4db6ac]" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-[#4db6ac]" />
                    <span>{project.startDate} — {project.endDate}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/donate?project=${project.id}`}>
                    <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Donate to This Project</Button>
                  </Link>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="goals">Goals & Achievements</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              {/* About */}
              <TabsContent value="about" className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">About This Project</h2>
                <p className="text-[#5a5a5a] leading-relaxed mb-8">
                  {project.longDescription || project.description}
                </p>

                {project.challenges?.length > 0 && (
                  <>
                    <h3 className="text-lg font-bold text-[#3d3d3d] mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" /> Challenges
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {project.challenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 h-5 w-5 rounded-full bg-amber-100 text-amber-600 text-xs font-medium flex items-center justify-center shrink-0">{i + 1}</span>
                          <span className="text-[#5a5a5a]">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Link href={`/donate?project=${project.id}`}>
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Support This Project</Button>
                </Link>
              </TabsContent>

              {/* Goals & Achievements */}
              <TabsContent value="goals" className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  {project.goals?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-[#3d3d3d] mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-[#4db6ac]" /> Goals
                      </h3>
                      <ul className="space-y-3">
                        {project.goals.map((g, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-[#4db6ac] shrink-0 mt-0.5" />
                            <span className="text-[#5a5a5a]">{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.achievements?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-[#3d3d3d] mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" /> Achievements
                      </h3>
                      <ul className="space-y-3">
                        {project.achievements.map((a, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Trophy className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="text-[#5a5a5a]">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!project.goals?.length && !project.achievements?.length && (
                    <p className="text-gray-400 col-span-2">No goals or achievements recorded yet.</p>
                  )}
                </div>
              </TabsContent>

              {/* Timeline */}
              <TabsContent value="timeline" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-[#3d3d3d] mb-6">Project Timeline</h3>
                <div className="relative pl-8 border-l-2 border-[#4db6ac]/30 space-y-8">
                  {timeline.map((item, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-[2.35rem] h-4 w-4 rounded-full border-2 ${item.done ? "bg-[#4db6ac] border-[#4db6ac]" : "bg-white border-gray-300"}`} />
                      <p className="text-xs text-gray-400 mb-1">{item.date}</p>
                      <p className="font-medium text-[#3d3d3d]">{item.event}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-8 text-center">Other Projects</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <Link key={p.id} href={`/projects/${p.id}`} className="group block">
                    <div className="bg-[#faf6ed] rounded-lg overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg">
                      <div className="relative h-48">
                        <Image
                          src={p.image || "/placeholder.svg"}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#4db6ac] text-white">{p.category}</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-[#3d3d3d] mb-2 group-hover:text-[#4db6ac] transition-colors">{p.title}</h3>
                        <p className="text-[#5a5a5a] text-sm line-clamp-2">{p.description}</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Support This Project</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Your donation directly supports {project.title}, helping us achieve our goals and create lasting impact.
            </p>
            <Link href={`/donate?project=${project.id}`}>
              <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white px-8 py-6 text-lg">
                Donate Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
