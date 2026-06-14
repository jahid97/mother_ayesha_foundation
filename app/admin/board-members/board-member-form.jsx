"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import ImageUpload from "@/components/admin/image-upload"

export default function BoardMemberForm({ member }) {
  const isEdit = !!member
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name:  member?.name  ?? "",
    role:  member?.role  ?? "",
    bio:   member?.bio   ?? "",
    image: member?.image ?? "",
    email: member?.email ?? "",
    order: member?.order ?? 0,
  })

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.role.trim()) {
      toast.error("Name and role are required")
      return
    }
    setSaving(true)
    try {
      const url = isEdit
        ? `/api/admin/board-members/${member.id}`
        : "/api/admin/board-members"
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, order: parseInt(form.order) || 0 }),
      })
      if (!res.ok) throw new Error()
      toast.success(isEdit ? "Member updated" : "Member added")
      router.push("/admin/board-members")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]/30 focus:border-[#4db6ac]"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className={labelClass}>Full Name *</label>
          <input className={inputClass} value={form.name} onChange={set("name")} placeholder="e.g. Dr. Rafiqul Bhuyan" required />
        </div>

        {/* Role */}
        <div>
          <label className={labelClass}>Role / Title *</label>
          <input className={inputClass} value={form.role} onChange={set("role")} placeholder="e.g. Chairman" required />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email <span className="text-gray-400 font-normal">(optional)</span></label>
          <input className={inputClass} type="email" value={form.email} onChange={set("email")} placeholder="email@example.com" />
        </div>

        {/* Order */}
        <div>
          <label className={labelClass}>Display Order <span className="text-gray-400 font-normal">(lower = first)</span></label>
          <input className={inputClass} type="number" min={0} value={form.order} onChange={set("order")} placeholder="0" />
        </div>
      </div>

      {/* Photo */}
      <ImageUpload
        label="Photo (optional)"
        value={form.image}
        onChange={(url) => setForm((p) => ({ ...p, image: url }))}
        aspectRatio="aspect-square"
        folder="board-members"
      />

      {/* Bio */}
      <div>
        <label className={labelClass}>Bio <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={4}
          value={form.bio}
          onChange={set("bio")}
          placeholder="Short biography..."
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#4db6ac] hover:bg-[#3d9d93] text-white text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Member"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/board-members")}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
