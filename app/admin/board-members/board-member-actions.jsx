"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function BoardMemberActions({ id, name }) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Remove "${name}" from the board?`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/board-members/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast.success("Board member removed")
      router.refresh()
    } catch {
      toast.error("Failed to delete")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
