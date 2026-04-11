import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Pencil } from "lucide-react"

export default async function AdminBlog() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
        <Link href="/admin/blog/new" className="flex items-center gap-2 bg-[#4db6ac] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3d9d93] transition-colors">
          <Plus className="h-4 w-4" />
          New Post
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
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-800">{p.title}</td>
                <td className="px-5 py-3 text-gray-500 font-mono text-xs">{p.slug}</td>
                <td className="px-5 py-3 text-gray-600">{p.category}</td>
                <td className="px-5 py-3 text-gray-600">{p.author}</td>
                <td className="px-5 py-3 text-gray-600">{p.featured ? "Yes" : "No"}</td>
                <td className="px-5 py-3">
                  <Link href={`/admin/blog/${p.id}`} className="text-gray-400 hover:text-[#4db6ac] flex justify-end">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">No blog posts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
