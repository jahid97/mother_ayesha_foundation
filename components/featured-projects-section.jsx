import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Target } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"

export default function FeaturedProjectsSection({ projects = [] }) {
  return (
    <section className="py-16 bg-[#faf6ed]">
      <div className="container mx-auto px-4">
        <AnimateOnScroll variant="up" className="text-center mb-12">
          <span className="inline-block bg-[#4db6ac]/10 text-[#4db6ac] font-medium px-4 py-1 rounded-full text-sm mb-4">OUR PROGRAMS</span>
          <h2 className="text-3xl font-bold text-[#3d3d3d]">Every donation, however small, changes a life in Bangladesh</h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.id} variant="up" delay={index * 120}>
              <Card className="overflow-hidden bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-[#4db6ac] text-white">{project.category}</Badge>
                    <Badge className={project.status === "Ongoing" ? "bg-green-500 text-white" : "bg-amber-500 text-white"}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-[#3d3d3d]">{project.title}</h3>
                  <div className="flex flex-col space-y-2 mb-4 text-sm text-[#5a5a5a]">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#4db6ac]" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#4db6ac]" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-2 text-[#4db6ac]" />
                      <span>Target: {project.targetAmount}</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#4db6ac] h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-[#4db6ac] font-medium">{project.raisedAmount} raised</span>
                    <span className="text-[#5a5a5a]">{project.progress}%</span>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
                      Learn More
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

        <AnimateOnScroll variant="up" delay={100} className="mt-10 text-center">
          <Link href="/projects">
            <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">View All Projects</Button>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
