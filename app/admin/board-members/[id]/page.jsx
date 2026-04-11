import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import BoardMemberForm from "../board-member-form"

export default async function EditBoardMemberPage({ params }) {
  const { id } = await params
  const member = await prisma.boardMember.findUnique({ where: { id: parseInt(id) } })
  if (!member) notFound()

  return (
    <div>
      <Link
        href="/admin/board-members"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Board Members
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Board Member</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <BoardMemberForm member={member} />
      </div>
    </div>
  )
}
