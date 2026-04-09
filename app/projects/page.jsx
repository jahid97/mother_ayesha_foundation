/**
 * Projects Page Component
 *
 * This page displays all projects of the Mother Aysha Foundation.
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
import { Calendar, MapPin, Target } from "lucide-react"
import { projects } from "@/lib/project-data"
import PageHero from "@/components/page-hero"
import ImpactStats from "@/components/impact-stats"
import CallToAction from "@/components/call-to-action"
import AnimateOnScroll from "@/components/animate-on-scroll"

export default function ProjectsPage() {
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects &&
                projects.map((project, index) => (
                  <AnimateOnScroll key={project.id} variant="up" delay={(index % 3) * 110}>
                    <Card className="overflow-hidden bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {/* Project image with category and status badges */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
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
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-2 text-[#4db6ac]" />
                            <span>Target: {project.targetAmount}</span>
                          </div>
                        </div>

                        <p className="text-[#5a5a5a] mb-4">{project.description}</p>

                        {/* Progress Bar */}
                        <div className="mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-[#4db6ac] h-2.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                          <span className="text-[#4db6ac] font-medium">{project.raisedAmount} raised</span>
                          <span className="text-[#5a5a5a]">{project.progress}%</span>
                        </div>
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

            <AnimateOnScroll variant="up" delay={100} className="mt-12">
              <div className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-[#3d3d3d]">General Donation</h3>
                    <p className="text-[#5a5a5a] mb-6">
                      Your general donation helps us allocate resources where they are needed most — across
                      healthcare, education, research, elderly care, and humanitarian relief in Bangladesh.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/donate">
                        <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Donate Now</Button>
                      </Link>
                      <Link href="/about-us">
                        <Button
                          variant="outline"
                          className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="relative h-[300px]">
                    <Image
                      src="/placeholder.svg?height=600&width=800&text=Support+Our+Mission"
                      alt="General donation"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Featured Project Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="text-center mb-12">
              <span className="inline-block bg-[#4db6ac]/10 text-[#4db6ac] font-medium px-4 py-1 rounded-full text-sm mb-4">
                Featured Project
              </span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">TVET Skills Development Initiative</h2>
              <p className="text-[#5a5a5a] max-w-3xl mx-auto">
                Our flagship project provides practical vocational training, soft skills coaching, and employment
                guidance to equip underprivileged youth for sustainable livelihoods across Bangladesh.
              </p>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimateOnScroll variant="left">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=800&width=600&text=Education+For+All"
                    alt="Education For All Initiative"
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll variant="right">
                <h3 className="text-2xl font-bold text-[#3d3d3d] mb-4">Project Goals</h3>
                <ul className="space-y-3 mb-6">
                  {projects &&
                    projects[0] &&
                    projects[0].goals &&
                    projects[0].goals.map((goal, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-[#4db6ac]/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-[#4db6ac] text-sm font-medium">{index + 1}</span>
                        </div>
                        <span className="text-[#5a5a5a]">{goal}</span>
                      </li>
                    ))}
                </ul>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-[#4db6ac] h-3 rounded-full"
                      style={{ width: `${projects && projects[0] ? projects[0].progress : 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-[#4db6ac] font-medium">
                      {projects && projects[0] ? projects[0].raisedAmount : 0} raised
                    </span>
                    <span className="text-[#5a5a5a]">
                      Target: {projects && projects[0] ? projects[0].targetAmount : 0}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/projects/education-for-all">
                    <Button
                      variant="outline"
                      className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                  <Link href="/donate?project=education-for-all">
                    <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Support This Project</Button>
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>
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
          secondaryButtonText="Become a Volunteer"
          secondaryButtonLink="/volunteer-registration"
        />
      </main>

      <Footer />
    </div>
  )
}
