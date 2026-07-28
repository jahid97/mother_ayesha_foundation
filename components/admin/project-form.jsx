"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/image-upload"
import BlockEditor from "@/components/admin/block-editor"
import { Plus, X } from "lucide-react"

const defaultProject = {
  title: "",
  category: "",
  status: "Ongoing",
  location: "",
  startDate: "",
  endDate: "",
  image: "",
  description: "",
  longDescription: "",
  goals: "",
  achievements: "",
  challenges: "",
  milestones: [],
  featured: false,
  active: true,
}

// Goals/Achievements/Challenges are stored as String[] — edited here as one item per line
const linesToList = (text) => text.split("\n").map((s) => s.trim()).filter(Boolean)

export default function ProjectForm({ project }) {
  const router = useRouter()
  const [form, setForm] = useState(project ? {
    ...project,
    startDate: project.startDate ? project.startDate.split("T")[0] : "",
    endDate: project.endDate ? project.endDate.split("T")[0] : "",
    goals: (project.goals || []).join("\n"),
    achievements: (project.achievements || []).join("\n"),
    challenges: (project.challenges || []).join("\n"),
    milestones: Array.isArray(project.milestones) ? project.milestones : [],
  } : defaultProject)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateMilestone = (idx, field, value) => {
    setForm((prev) => {
      const milestones = [...prev.milestones]
      milestones[idx] = { ...milestones[idx], [field]: value }
      return { ...prev, milestones }
    })
  }

  const addMilestone = () =>
    setForm((prev) => ({ ...prev, milestones: [...prev.milestones, { date: "", event: "", done: false }] }))

  const removeMilestone = (idx) =>
    setForm((prev) => ({ ...prev, milestones: prev.milestones.filter((_, i) => i !== idx) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const payload = {
      ...form,
      startDate: form.startDate || "",
      endDate: form.endDate || "",
      goals: linesToList(form.goals),
      achievements: linesToList(form.achievements),
      challenges: linesToList(form.challenges),
      milestones: form.milestones.filter((m) => m.date || m.event),
    }

    try {
      const res = await fetch(
        project ? `/api/admin/projects/${project.id}` : "/api/admin/projects",
        {
          method: project ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) throw new Error(await res.text())
      router.push("/admin/projects")
      router.refresh()
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Delete this project? This cannot be undone.")) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error(await res.text())
      router.push("/admin/projects")
      router.refresh()
    } catch (err) {
      setError(err.message || "Failed to delete")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-5 max-w-2xl">
      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input required value={form.title} onChange={set("title")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input value={form.category} onChange={set("category")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select value={form.status} onChange={set("status")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]">
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input value={form.location} onChange={set("location")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div className="col-span-2">
          <ImageUpload
            label="Image"
            value={form.image}
            onChange={(url) => setForm((p) => ({ ...p, image: url }))}
            aspectRatio="aspect-video"
            folder="projects"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" value={form.startDate} onChange={set("startDate")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" value={form.endDate} onChange={set("endDate")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div className="flex items-center gap-2 pt-5">
          <input type="checkbox" id="featured" checked={form.featured} onChange={set("featured")} className="h-4 w-4 accent-[#4db6ac]" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured on homepage</label>
        </div>
        <div className="flex items-center gap-2 pt-5">
          <input type="checkbox" id="active" checked={form.active ?? true} onChange={set("active")} className="h-4 w-4 accent-[#4db6ac]" />
          <label htmlFor="active" className="text-sm font-medium text-gray-700">Active (visible on site)</label>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <textarea value={form.description} onChange={set("description")} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Long Description</label>
          <BlockEditor
            value={form.longDescription}
            onChange={(val) => setForm((p) => ({ ...p, longDescription: val }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Goals <span className="text-gray-400 font-normal">(one per line)</span>
          </label>
          <textarea
            value={form.goals}
            onChange={set("goals")}
            rows={4}
            placeholder={"Open 5 clinics across Dhaka districts\nServe 10,000+ patients annually"}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Achievements <span className="text-gray-400 font-normal">(one per line)</span>
          </label>
          <textarea
            value={form.achievements}
            onChange={set("achievements")}
            rows={4}
            placeholder={"3 clinics operational\n6,500 patients served"}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Challenges <span className="text-gray-400 font-normal">(one per line — shown on the About tab)</span>
          </label>
          <textarea
            value={form.challenges}
            onChange={set("challenges")}
            rows={3}
            placeholder={"Funding sustainability\nStaffing qualified medical personnel"}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
          />
        </div>

        {/* Timeline / milestones */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Timeline <span className="text-gray-400 font-normal">(shown on the public Timeline tab)</span>
            </label>
            <button
              type="button"
              onClick={addMilestone}
              className="flex items-center gap-1.5 text-xs text-[#4db6ac] border border-[#4db6ac]/40 px-3 py-1.5 rounded-lg hover:bg-[#4db6ac]/5 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Milestone
            </button>
          </div>

          {form.milestones.length > 0 ? (
            <div className="space-y-2">
              {form.milestones.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2">
                  <input
                    value={m.date}
                    onChange={(e) => updateMilestone(idx, "date", e.target.value)}
                    placeholder="Date (e.g. Jan 2024)"
                    className="w-40 border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
                  />
                  <input
                    value={m.event}
                    onChange={(e) => updateMilestone(idx, "event", e.target.value)}
                    placeholder="Milestone description"
                    className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
                  />
                  <label className="flex items-center gap-1.5 text-xs text-gray-600 shrink-0 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!m.done}
                      onChange={(e) => updateMilestone(idx, "done", e.target.checked)}
                      className="h-4 w-4 accent-[#4db6ac]"
                    />
                    Done
                  </label>
                  <button type="button" onClick={() => removeMilestone(idx)} className="text-gray-400 hover:text-red-500 shrink-0">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 py-3 text-center border border-dashed border-gray-200 rounded-lg">
              No milestones yet — the public page will fall back to Start/End Date. Click "Add Milestone" to build a custom timeline.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-[#4db6ac] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3d9d93] disabled:opacity-60 transition-colors">
          {loading ? "Saving..." : project ? "Save Changes" : "Create Project"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        {project && (
          <button type="button" onClick={handleDelete} disabled={loading} className="ml-auto px-4 py-2 rounded-lg text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
            Delete Project
          </button>
        )}
      </div>
    </form>
  )
}
