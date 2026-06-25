import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Pencil } from "lucide-react"

export default async function AdminActivities() {
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: { select: { title: true } } },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
        <Link href="/admin/activities/new" className="flex items-center gap-2 bg-[#4db6ac] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3d9d93] transition-colors">
          <Plus className="h-4 w-4" />
          New Activity
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Title</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Date</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Category</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Project</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {activities.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-800">{a.title}</td>
                <td className="px-5 py-3 text-gray-500">{a.date}</td>
                <td className="px-5 py-3 text-gray-600">{a.category || "—"}</td>
                <td className="px-5 py-3 text-gray-600">{a.project?.title || "—"}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${a.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Link href={`/admin/activities/${a.id}`} className="text-gray-400 hover:text-[#4db6ac] flex justify-end">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {activities.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">No activities yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
