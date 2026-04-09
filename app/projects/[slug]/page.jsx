/**
 * Project Detail Page Component
 *
 * This dynamic page displays detailed information about a specific project.
 * It shows:
 * - Project overview with image and key details
 * - Progress information with a visual progress bar
 * - Tabbed sections for different aspects of the project
 * - Related projects suggestions
 * - A call to action for donations
 *
 * The component includes error handling for cases where a project isn't found
 * and defensive coding to prevent errors when data is loading.
 */
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Calendar, MapPin, Target, ArrowLeft } from "lucide-react"
import { projects } from "@/lib/project-data"

export default function ProjectDetailPage({ params }) {
  // Find the project by slug or use the first project as fallback
  const project = projects
    ? projects.find((p) => p.id === params.slug) || (projects.length > 0 ? projects[0] : null)
    : null

  // If no project is found, we should handle this case
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col bg-[#faf6ed]">
        <SiteHeader />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-[#3d3d3d] mb-4">Project Not Found</h1>
            <p className="text-[#5a5a5a] mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/projects">
              <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">View All Projects</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Default values for missing properties
  const defaultDescription = "Detailed description coming soon."
  const defaultChallenges = ["Funding", "Resource allocation", "Community engagement"]
  const defaultAchievements = ["Project planning completed", "Initial funding secured", "Team assembled"]
  const defaultTimeline = [
    { date: project.startDate, event: "Project launched" },
    { date: project.endDate, event: "Expected completion" },
  ]
  const defaultGallery = [
    "/placeholder.svg?height=400&width=600&text=Project+Image+1",
    "/placeholder.svg?height=400&width=600&text=Project+Image+2",
    "/placeholder.svg?height=400&width=600&text=Project+Image+3",
  ]
  const defaultTeamMembers = [
    { name: "Project Director", role: "Director", image: "/placeholder.svg?height=200&width=200&text=Director" },
    { name: "Project Manager", role: "Manager", image: "/placeholder.svg?height=200&width=200&text=Manager" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#3d3d3d] py-16">
          <div className="container mx-auto px-4">
            <Link
              href="/projects"
              className="inline-flex items-center text-[#4db6ac] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Project information */}
              <div className="text-white">
                <div className="flex gap-2 mb-4">
                  <Badge className="bg-[#4db6ac] text-white">{project.category}</Badge>
                  <Badge
                    className={project.status === "Ongoing" ? "bg-green-500 text-white" : "bg-amber-500 text-white"}
                  >
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
                    <span>
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-5 w-5 mr-3 text-[#4db6ac]" />
                    <span>Target: {project.targetAmount}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/donate?project=${project.id}`}>
                    <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Donate to This Project</Button>
                  </Link>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Share Project
                  </Button>
                </div>
              </div>

              {/* Project image */}
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="text-[#5a5a5a]">Raised so far:</span>
                <span className="text-2xl font-bold text-[#3d3d3d] ml-2">{project.raisedAmount}</span>
                <span className="text-[#5a5a5a] ml-2">of {project.targetAmount} goal</span>
              </div>

              {/* Progress bar */}
              <div className="w-full md:w-1/2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-[#4db6ac] h-4 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
                <div className="flex justify-end text-sm mt-1">
                  <span className="text-[#4db6ac] font-medium">{project.progress}% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="about" className="w-full">
              {/* Tab navigation */}
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="goals">Goals & Achievements</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              {/* About tab content */}
              <TabsContent value="about" className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">About This Project</h2>
                <p className="text-[#5a5a5a] whitespace-pre-line mb-6">
                  {project.longDescription || project.description}
                </p>

                <h3 className="text-xl font-bold text-[#3d3d3d] mb-3">Challenges</h3>
                <ul className="space-y-2 mb-6">
                  {(project.challenges || defaultChallenges).map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#4db6ac]/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-[#4db6ac] text-xs font-medium">{index + 1}</span>
                      </div>
                      <span className="text-[#5a5a5a]">{challenge}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/donate?project=${project.id}`}>
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Support This Project</Button>
                </Link>
              </TabsContent>

              {/* Goals & Achievements tab content */}
              <TabsContent value="goals" className="bg-white p-6 rounded-lg shadow-md">
                {/* Tab content */}
              </TabsContent>

              {/* Timeline tab content */}
              <TabsContent value="timeline" className="bg-white p-6 rounded-lg shadow-md">
                {/* Tab content */}
              </TabsContent>

              {/* Gallery tab content */}
              <TabsContent value="gallery" className="bg-white p-6 rounded-lg shadow-md">
                {/* Tab content */}
              </TabsContent>

              {/* Team tab content */}
              <TabsContent value="team" className="bg-white p-6 rounded-lg shadow-md">
                {/* Tab content */}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Projects */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-8 text-center">Related Projects</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {projects &&
                projects
                  .filter((p) => p.id !== project.id)
                  .slice(0, 3)
                  .map((relatedProject) => (
                    <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`} className="group block">
                      <div className="bg-[#faf6ed] rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                        <div className="relative h-48">
                          <Image
                            src={relatedProject.image || "/placeholder.svg"}
                            alt={relatedProject.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-[#4db6ac] text-white">{relatedProject.category}</Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-[#3d3d3d] mb-2 group-hover:text-[#4db6ac] transition-colors">
                            {relatedProject.title}
                          </h3>
                          <p className="text-[#5a5a5a] text-sm line-clamp-2">{relatedProject.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#3d3d3d]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Support This Project</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Your donation will directly support the {project.title} project, helping us achieve our goals and make a
              lasting impact in the lives of orphaned children.
            </p>
            <Link href={`/donate?project=${project.id}`}>
              <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white px-8 py-6 text-lg">
                Donate to This Project
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

