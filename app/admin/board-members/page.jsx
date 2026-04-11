import { prisma } from "@/lib/db"
import Link from "next/link"
import { Plus, Pencil, Users } from "lucide-react"
import BoardMemberActions from "./board-member-actions"

export default async function AdminBoardMembers() {
  const members = await prisma.boardMember.findMany({ orderBy: { order: "asc" } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Board Members</h1>
        <Link
          href="/admin/board-members/new"
          className="flex items-center gap-2 bg-[#4db6ac] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3d9d93] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {members.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>No board members yet. Add your first one.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {members.map((m) => (
              <div key={m.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-[#4db6ac]/10 overflow-hidden shrink-0 flex items-center justify-center">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-[#4db6ac] font-bold text-sm">
                      {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800">{m.name}</p>
                  <p className="text-sm text-[#4db6ac]">{m.role}</p>
                  {m.email && <p className="text-xs text-gray-400">{m.email}</p>}
                </div>

                {/* Order badge */}
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                  #{m.order}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/board-members/${m.id}`}
                    className="text-gray-400 hover:text-[#4db6ac] transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <BoardMemberActions id={m.id} name={m.name} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
