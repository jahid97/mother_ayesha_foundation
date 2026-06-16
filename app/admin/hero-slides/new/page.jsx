import { prisma } from "@/lib/db"
import HeroSlideForm from "@/components/admin/hero-slide-form"

export default async function NewHeroSlide() {
  const projects = await prisma.project.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true, description: true } })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Hero Slide</h1>
      <HeroSlideForm projects={projects} />
    </div>
  )
}
