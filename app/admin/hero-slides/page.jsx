import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, Pencil } from "lucide-react"

export default async function AdminHeroSlides() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hero Slides</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage the homepage slideshow images</p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="flex items-center gap-2 bg-[#4db6ac] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3d9d93] transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Slide
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Order</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Type</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Title / Alt</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Active</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slides.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-gray-500 font-mono">{s.order}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                    s.type === "charity_project"
                      ? "bg-[#4db6ac]/10 text-[#4db6ac]"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {s.type === "charity_project" ? "Charity Project" : "Photo Only"}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-800 font-medium">
                  {s.title || <span className="text-gray-400 italic">{s.alt || "—"}</span>}
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium ${s.active ? "text-green-600" : "text-red-400"}`}>
                    {s.active ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Link href={`/admin/hero-slides/${s.id}`} className="text-gray-400 hover:text-[#4db6ac] flex justify-end">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {slides.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                  No slides yet — add your first one
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Slides are shown in order (lowest number first). Only active slides appear on the site.
        If no slides are added, the site shows default placeholder images.
      </p>
    </div>
  )
}
