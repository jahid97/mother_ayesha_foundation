import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import ProjectForm from "@/components/admin/project-form"

export default async function EditProject({ params }) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  )
}
