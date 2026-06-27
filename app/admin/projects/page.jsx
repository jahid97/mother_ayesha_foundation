import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Pencil, Heart } from "lucide-react"

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { donations: true } },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-[#4db6ac] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3d9d93] transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Title</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Category</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Status</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Visible</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Donations</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{p.title}</td>
                  <td className="px-5 py-3 text-gray-500">{p.category}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status?.toLowerCase() === "ongoing" ? "bg-green-100 text-green-700" :
                      p.status?.toLowerCase() === "completed" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.active !== false ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {p.active !== false ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/projects/${p.id}/donations`}
                      className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#4db6ac] transition-colors"
                    >
                      <Heart className="h-3.5 w-3.5" />
                      {p._count.donations} donation{p._count.donations !== 1 ? "s" : ""}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/projects/${p.id}`} className="text-gray-400 hover:text-[#4db6ac] flex justify-end">
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-gray-400">No projects yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
