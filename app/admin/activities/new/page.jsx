import { prisma } from "@/lib/db"
import ActivityForm from "@/components/admin/activity-form"

export default async function NewActivity() {
  const projects = await prisma.project.findMany({
    where: { active: true },
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Activity</h1>
      <ActivityForm projects={projects} />
    </div>
  )
}
