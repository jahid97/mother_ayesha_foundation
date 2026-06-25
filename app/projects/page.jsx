/**
 * Projects Page Component
 *
 * This page displays all projects of the Mother Ayesha Foundation.
 * It includes:
 * - A hero section with a description of our projects
 * - A grid of project cards showing all available projects
 * - A featured project section highlighting our main initiative
 * - Impact statistics and a call to action
 */
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Calendar, MapPin } from "lucide-react"
import { prisma } from "@/lib/db"
import PageHero from "@/components/page-hero"

export const revalidate = 3600
import ImpactStats from "@/components/impact-stats"
import CallToAction from "@/components/call-to-action"
import AnimateOnScroll from "@/components/animate-on-scroll"

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } })
  const impactStats = [
    { value: "50,000+", label: "People Supported" },
    { value: "6+",      label: "Program Categories" },
    { value: "25+",     label: "Years of Service" },
    { value: "10+",     label: "Partner Institutions" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <PageHero
          page="projects"
          badge="OUR WORK"
          title="Our Projects"
          description="Explore our ongoing initiatives dedicated to healthcare, education, skills development, research, and social welfare across Bangladesh. Each project addresses a critical need in our communities."
        />

        {/* Projects Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Our Projects</h2>
              <p className="text-[#5a5a5a] max-w-3xl mx-auto">
                Explore our ongoing and upcoming initiatives dedicated to healthcare, education, skills development,
                research, elderly care, and humanitarian relief across Bangladesh.
              </p>
            </AnimateOnScroll>

            {/* Projects Grid */}
            {projects.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl font-semibold text-[#3d3d3d] mb-2">No projects listed yet</p>
                <p className="text-[#5a5a5a]">We're preparing our programs for launch. Check back soon.</p>
              </div>
            ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                  <AnimateOnScroll key={project.id} variant="up" delay={(index % 3) * 110}>
                    <Card className="overflow-hidden bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {/* Project image with category and status badges */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <Badge className="bg-[#4db6ac] text-white">{project.category}</Badge>
                          <Badge
                            className={
                              project.status === "Ongoing" ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Project details */}
                      <CardContent className="p-6 flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-[#3d3d3d]">{project.title}</h3>

                        <div className="flex flex-col space-y-2 mb-4 text-sm text-[#5a5a5a]">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-[#4db6ac]" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-[#4db6ac]" />
                            <span>
                              {project.startDate} - {project.endDate}
                            </span>
                          </div>
                        </div>

                        <p className="text-[#5a5a5a] mb-4">{project.description}</p>
                      </CardContent>

                      {/* Action buttons */}
                      <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                        <Link href={`/projects/${project.id}`}>
                          <Button
                            variant="outline"
                            className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                          >
                            View Details
                          </Button>
                        </Link>
                        <Link href={`/donate?project=${project.id}`}>
                          <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Donate Now</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </AnimateOnScroll>
                ))}
            </div>
            )}

          </div>
        </section>

        {/* Impact Statistics */}
        <ImpactStats
          title="Our Impact So Far"
          description="Through our projects and your generous support, we have made significant progress in improving the lives of communities across Bangladesh."
          stats={impactStats}
        />

        {/* Call to Action */}
        <CallToAction
          title="Ready to Make a Difference?"
          description="Your support can transform communities across Bangladesh. Choose a project to support or make a general donation to help us where it is needed most."
          primaryButtonText="Donate Now"
          primaryButtonLink="/donate"
          secondaryButtonText="Contact Us"
          secondaryButtonLink="/contact-us"
        />
      </main>

      <Footer />
    </div>
  )
}
