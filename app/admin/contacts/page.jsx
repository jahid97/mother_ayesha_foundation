import { prisma } from "@/lib/db"
import ContactsList from "./contacts-list"

export default async function AdminContacts() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
        <div className="bg-[#4db6ac]/10 text-[#4db6ac] px-4 py-2 rounded-lg text-sm font-medium">
          {messages.filter((m) => !m.read).length} unread
        </div>
      </div>
      <ContactsList messages={messages} />
    </div>
  )
}
