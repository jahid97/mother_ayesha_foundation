import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Heart, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react"

export default async function ProjectDonationsPage({ params }) {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      donations: {
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!project) notFound()

  const donations = project.donations
  const completed = donations.filter((d) => d.status === "completed")
  const pending = donations.filter((d) => d.status === "pending")
  const failed = donations.filter((d) => d.status === "failed")

  const totalRaised = completed.reduce((s, d) => s + (d.amount ?? 0), 0)
  const totalPending = pending.reduce((s, d) => s + (d.amount ?? 0), 0)
  const monthlyDonors = donations.filter((d) => d.isRecurring).length

  const fmt = (n) => (n ?? 0).toLocaleString("en-GB", { minimumFractionDigits: 2 })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href={`/admin/projects/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-3 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to project
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
        <p className="text-sm text-gray-400 mt-1">{project.category} · Donation History</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#4db6ac] text-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-white/70">Total Raised</p>
            <Heart className="h-4 w-4 text-white/50" />
          </div>
          <p className="text-2xl font-bold">£{fmt(totalRaised)}</p>
          <p className="text-xs text-white/60 mt-1">{completed.length} completed</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Pending</p>
            <Clock className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">£{fmt(totalPending)}</p>
          <p className="text-xs text-gray-400 mt-1">{pending.length} transactions</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Failed</p>
            <XCircle className="h-4 w-4 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{failed.length}</p>
          <p className="text-xs text-gray-400 mt-1">transactions</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Monthly Donors</p>
            <TrendingUp className="h-4 w-4 text-[#4db6ac]" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{monthlyDonors}</p>
          <p className="text-xs text-gray-400 mt-1">recurring donations</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-gray-700">Fundraising Progress</p>
            <p className="text-xs text-gray-400 mt-0.5">
              £{fmt(totalRaised)} raised · Target: {project.targetAmount}
            </p>
          </div>
          <span className="text-2xl font-bold text-[#4db6ac]">{project.progress ?? 0}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-[#4db6ac] h-3 rounded-full transition-all"
            style={{ width: `${Math.min(project.progress ?? 0, 100)}%` }}
          />
        </div>
      </div>

      {/* Donation table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">All Donations ({donations.length})</h2>
          <div className="flex gap-2 text-xs">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{completed.length} completed</span>
            <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{pending.length} pending</span>
            {failed.length > 0 && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{failed.length} failed</span>}
          </div>
        </div>

        {donations.length === 0 ? (
          <div className="px-5 py-12 text-center text-gray-400">
            <Heart className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p>No donations for this project yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Donor</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Amount</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Type</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Method</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-800">{d.firstName} {d.lastName}</p>
                      <p className="text-xs text-gray-400">{d.email}</p>
                    </td>
                    <td className="px-5 py-3 font-semibold text-gray-800">
                      {d.currency} {fmt(d.amount)}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {d.isRecurring ? (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">Monthly</span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">One-time</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-500 capitalize">{d.paymentMethod}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        d.status === "completed" ? "bg-green-100 text-green-700" :
                        d.status === "failed" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {new Date(d.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
