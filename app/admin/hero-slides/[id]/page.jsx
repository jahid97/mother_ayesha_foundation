import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import HeroSlideForm from "@/components/admin/hero-slide-form"

export default async function EditHeroSlide({ params }) {
  const { id } = await params
  const [slide, projects] = await Promise.all([
    prisma.heroSlide.findUnique({ where: { id } }),
    prisma.project.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true, description: true } }),
  ])
  if (!slide) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Hero Slide</h1>
      <HeroSlideForm slide={slide} projects={projects} />
    </div>
  )
}
