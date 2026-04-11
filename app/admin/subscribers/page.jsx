import { prisma } from "@/lib/db"

export default async function AdminSubscribers() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h1>
        <div className="bg-[#4db6ac]/10 text-[#4db6ac] px-4 py-2 rounded-lg text-sm font-medium">
          {subscribers.length} subscribers
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Email</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Subscribed On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-gray-800">{s.email}</td>
                <td className="px-5 py-3 text-gray-500">
                  {new Date(s.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr><td colSpan={2} className="px-5 py-8 text-center text-gray-400">No subscribers yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
