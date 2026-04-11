import Link from "next/link"
import { prisma } from "@/lib/db"
import {
  FolderKanban, BookOpen, ScrollText, Image, Heart,
  MessageSquare, Users, TrendingUp, Clock, CheckCircle, XCircle,
} from "lucide-react"

export default async function AdminDashboard() {
  const [
    projectCount, blogCount, storyCount, galleryCount,
    donationCount, contactCount, subscriberCount, unreadContacts,
    allDonations, projectsWithDonations, recentDonations,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.story.count(),
    prisma.galleryImage.count(),
    prisma.donation.count(),
    prisma.contactMessage.count(),
    prisma.newsletterSubscriber.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.donation.aggregate({
      _sum: { amount: true },
      _count: true,
    }),
    prisma.project.findMany({
      select: {
        id: true, title: true, category: true, raisedAmount: true, targetAmount: true, progress: true,
        donations: {
          where: { status: "completed" },
          select: { amount: true, currency: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.donation.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { project: { select: { title: true } } },
    }),
  ])

  const [completedAgg, pendingAgg, failedAgg] = await Promise.all([
    prisma.donation.aggregate({ _sum: { amount: true }, _count: true, where: { status: "completed" } }),
    prisma.donation.aggregate({ _sum: { amount: true }, _count: true, where: { status: "pending" } }),
    prisma.donation.aggregate({ _count: true, where: { status: "failed" } }),
  ])

  const fmt = (n) => (n ?? 0).toLocaleString("en-GB", { minimumFractionDigits: 2 })
  const totalRaised = completedAgg._sum.amount ?? 0

  const stats = [
    { label: "Projects", value: projectCount, href: "/admin/projects", icon: FolderKanban, color: "bg-blue-500" },
    { label: "Blog Posts", value: blogCount, href: "/admin/blog", icon: BookOpen, color: "bg-purple-500" },
    { label: "Stories", value: storyCount, href: "/admin/stories", icon: ScrollText, color: "bg-green-500" },
    { label: "Gallery Images", value: galleryCount, href: "/admin/gallery", icon: Image, color: "bg-yellow-500" },
    { label: "Donations", value: donationCount, href: "/admin/donations", icon: Heart, color: "bg-red-500" },
    { label: "Messages", value: contactCount, href: "/admin/contacts", icon: MessageSquare, color: "bg-orange-500", badge: unreadContacts },
    { label: "Subscribers", value: subscriberCount, href: "/admin/subscribers", icon: Users, color: "bg-teal-500" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your foundation's content, donations, and activity</p>
      </div>

      {/* Donation summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#4db6ac] text-white rounded-xl p-5 col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-white/80">Total Raised</p>
            <Heart className="h-5 w-5 text-white/50" />
          </div>
          <p className="text-3xl font-bold">£{fmt(totalRaised)}</p>
          <p className="text-xs text-white/60 mt-1">{completedAgg._count} completed donations</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Completed</p>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">£{fmt(completedAgg._sum.amount)}</p>
          <p className="text-xs text-gray-400 mt-1">{completedAgg._count} transactions</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Pending</p>
            <Clock className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">£{fmt(pendingAgg._sum.amount)}</p>
          <p className="text-xs text-gray-400 mt-1">{pendingAgg._count} transactions</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">Failed</p>
            <XCircle className="h-5 w-5 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{failedAgg._count}</p>
          <p className="text-xs text-gray-400 mt-1">failed transactions</p>
        </div>
      </div>

      {/* Content stats */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Content</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {stats.map(({ label, value, href, icon: Icon, color, badge }) => (
            <Link key={label} href={href} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
              <div className={`${color} p-2 rounded-lg w-fit`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">
                  {value}
                  {badge > 0 && (
                    <span className="ml-1.5 text-xs font-medium bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">{badge}</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Project funding breakdown + recent donations side by side */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Per-project donations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#4db6ac]" />
              Donations by Project
            </h2>
            <Link href="/admin/donations" className="text-xs text-[#4db6ac] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {projectsWithDonations.map((p) => {
              const raised = p.donations.reduce((sum, d) => sum + (d.amount ?? 0), 0)
              const count = p.donations.length
              return (
                <div key={p.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{p.title}</p>
                      <p className="text-xs text-gray-400">{p.category} · {count} donation{count !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#4db6ac]">£{fmt(raised)}</p>
                      <p className="text-xs text-gray-400">{p.progress ?? 0}% of goal</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#4db6ac] h-1.5 rounded-full"
                      style={{ width: `${Math.min(p.progress ?? 0, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
            {projectsWithDonations.length === 0 && (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">No projects yet</p>
            )}
          </div>
        </div>

        {/* Recent donation history */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <Heart className="h-4 w-4 text-[#4db6ac]" />
              Recent Donations
            </h2>
            <Link href="/admin/donations" className="text-xs text-[#4db6ac] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentDonations.map((d) => (
              <div key={d.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#4db6ac]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#4db6ac] text-xs font-bold">
                    {d.firstName?.[0]}{d.lastName?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{d.firstName} {d.lastName}</p>
                  <p className="text-xs text-gray-400 truncate">{d.project?.title ?? "General"} · {d.isRecurring ? "Monthly" : "One-time"}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-800">{d.currency} {fmt(d.amount)}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    d.status === "completed" ? "bg-green-100 text-green-600" :
                    d.status === "failed" ? "bg-red-100 text-red-500" :
                    "bg-yellow-100 text-yellow-600"
                  }`}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
            {recentDonations.length === 0 && (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">No donations yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/projects/new", label: "New Project" },
            { href: "/admin/blog/new", label: "New Blog Post" },
            { href: "/admin/stories/new", label: "New Story" },
            { href: "/admin/gallery/new", label: "Add to Gallery" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="bg-[#4db6ac] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#3d9d93] transition-colors">
              + {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
