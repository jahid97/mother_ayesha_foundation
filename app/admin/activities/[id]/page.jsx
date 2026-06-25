import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import ActivityForm from "@/components/admin/activity-form"

export default async function EditActivity({ params }) {
  const { id } = await params
  const [activity, projects] = await Promise.all([
    prisma.activity.findUnique({ where: { id: parseInt(id) } }),
    prisma.project.findMany({ where: { active: true }, select: { id: true, title: true }, orderBy: { createdAt: "desc" } }),
  ])

  if (!activity) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Activity</h1>
      <ActivityForm activity={activity} projects={projects} />
    </div>
  )
}
