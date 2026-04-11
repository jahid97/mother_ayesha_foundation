import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Pencil } from "lucide-react"

export default async function AdminStories() {
  const stories = await prisma.story.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Stories</h1>
        <Link href="/admin/stories/new" className="flex items-center gap-2 bg-[#4db6ac] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3d9d93] transition-colors">
          <Plus className="h-4 w-4" />
          New Story
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Title</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Slug</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Category</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Author</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Featured</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stories.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-800">{s.title}</td>
                <td className="px-5 py-3 text-gray-500 font-mono text-xs">{s.slug}</td>
                <td className="px-5 py-3 text-gray-600">{s.category}</td>
                <td className="px-5 py-3 text-gray-600">{s.author}</td>
                <td className="px-5 py-3 text-gray-600">{s.featured ? "Yes" : "No"}</td>
                <td className="px-5 py-3">
                  <Link href={`/admin/stories/${s.id}`} className="text-gray-400 hover:text-[#4db6ac] flex justify-end">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {stories.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">No stories yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
