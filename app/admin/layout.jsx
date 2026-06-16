import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  ScrollText,
  Image,
  Heart,
  MessageSquare,
  Users,
  UserCog,
  Layers,
  Settings,
} from "lucide-react"
import SignOutButton from "./sign-out-button"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: Layers },
  { href: "/admin/site-settings", label: "Site Settings", icon: Settings },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/stories", label: "Stories", icon: ScrollText },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/board-members", label: "Board Members", icon: UserCog },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/contacts", label: "Messages", icon: MessageSquare },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
]

export default async function AdminLayout({ children }) {
  const session = await auth()
  if (!session || session.user?.role !== "admin") redirect("/login")

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3d3d3d] text-white flex flex-col fixed inset-y-0">
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="block">
            <h2 className="text-lg font-bold text-[#4db6ac]">Admin Panel</h2>
            <p className="text-xs text-white/60 mt-0.5">Mother Ayesha Foundation</p>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-white/50 mb-3">{session.user.name}</div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 text-center text-xs text-white/70 hover:text-white py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
            >
              View Site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
