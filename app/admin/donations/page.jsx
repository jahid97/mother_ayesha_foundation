import { prisma } from "@/lib/db"

export default async function AdminDonations() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: { select: { title: true } } },
  })

  const total = donations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + (d.amount ?? 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Donations</h1>
        <div className="bg-[#4db6ac]/10 text-[#4db6ac] px-4 py-2 rounded-lg text-sm font-medium">
          Total raised: £{total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Donor</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Email</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Amount</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Project</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Recurring</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Status</th>
              <th className="text-left px-5 py-3 text-gray-600 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {donations.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-800">{d.firstName} {d.lastName}</td>
                <td className="px-5 py-3 text-gray-600">{d.email}</td>
                <td className="px-5 py-3 text-gray-800 font-medium">
                  {d.currency} {d.amount?.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-5 py-3 text-gray-600">{d.project?.title ?? "General"}</td>
                <td className="px-5 py-3 text-gray-600">{d.isRecurring ? "Monthly" : "One-time"}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    d.status === "completed" ? "bg-green-100 text-green-700" :
                    d.status === "failed" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {d.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500">
                  {new Date(d.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-gray-400">No donations yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
