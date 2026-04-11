"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import {
  User, Mail, Lock, Shield, Calendar, Eye, EyeOff,
  Loader2, Check, LayoutDashboard, LogOut, Heart, BookOpen, ScrollText
} from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { data: session, update } = useSession()

  const [name, setName] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [joinedDate, setJoinedDate] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (session?.user) setName(session.user.name || "")
  }, [session])

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (data.createdAt) {
          setJoinedDate(
            new Date(data.createdAt).toLocaleDateString("en-GB", {
              year: "numeric", month: "long", day: "numeric",
            })
          )
        }
      })
      .catch(() => {})
  }, [])

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    if (!name.trim()) return toast.error("Name cannot be empty.")
    setSavingProfile(true)
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.error)
      await update({ name: data.user.name })
      toast.success("Profile updated.")
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSavingProfile(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.")
    if (newPassword.length < 8) return toast.error("Password must be at least 8 characters.")
    setSavingPassword(true)
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.error)
      toast.success("Password updated.")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setSavingPassword(false)
    }
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col bg-[#faf6ed]">
        <SiteHeader />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#4db6ac]" />
        </main>
        <Footer />
      </div>
    )
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "settings", label: "Account Settings" },
    { id: "security", label: "Security" },
  ]

  const quickLinks = [
    { href: "/projects", label: "Our Projects", icon: LayoutDashboard, desc: "Browse all foundation projects" },
    { href: "/donate", label: "Make a Donation", icon: Heart, desc: "Support our mission" },
    { href: "/blog", label: "Read Blog", icon: BookOpen, desc: "Latest news & articles" },
    { href: "/stories", label: "Impact Stories", icon: ScrollText, desc: "Stories of change" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero banner */}
        <div className="bg-[#3d3d3d] py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-full bg-[#4db6ac] flex items-center justify-center shrink-0 text-white text-3xl font-bold shadow-lg">
                {session.user.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{session.user.name}</h1>
                <p className="text-white/60 text-sm mt-0.5">{session.user.email}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
                    session.user.role === "admin"
                      ? "bg-[#4db6ac] text-white"
                      : "bg-white/15 text-white"
                  }`}>
                    <Shield className="h-3 w-3" />
                    {session.user.role === "admin" ? "Administrator" : "Member"}
                  </span>
                  {joinedDate && (
                    <span className="text-xs text-white/50 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Member since {joinedDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-8 border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-[#4db6ac] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4db6ac]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-5xl py-8">

          {/* ── Overview ── */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left — summary */}
              <div className="md:col-span-2 space-y-6">
                {/* Info card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-sm font-semibold text-[#3d3d3d] uppercase tracking-wide mb-4">Account Details</h2>
                  <div className="space-y-3">
                    {[
                      { icon: User, label: "Full Name", value: session.user.name },
                      { icon: Mail, label: "Email Address", value: session.user.email },
                      { icon: Shield, label: "Role", value: session.user.role === "admin" ? "Administrator" : "Member" },
                      { icon: Calendar, label: "Member Since", value: joinedDate || "—" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                        <div className="h-8 w-8 rounded-lg bg-[#4db6ac]/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-[#4db6ac]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">{label}</p>
                          <p className="text-sm font-medium text-[#3d3d3d]">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-sm font-semibold text-[#3d3d3d] uppercase tracking-wide mb-4">Quick Links</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {quickLinks.map(({ href, label, icon: Icon, desc }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#4db6ac]/40 hover:bg-[#4db6ac]/5 transition-colors group"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#3d3d3d] flex items-center justify-center shrink-0 group-hover:bg-[#4db6ac] transition-colors">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#3d3d3d]">{label}</p>
                          <p className="text-xs text-gray-400">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — actions */}
              <div className="space-y-4">
                {session.user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 bg-[#4db6ac] text-white rounded-xl p-4 hover:bg-[#3d9d93] transition-colors"
                  >
                    <LayoutDashboard className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Admin Panel</p>
                      <p className="text-xs text-white/70">Manage content & data</p>
                    </div>
                  </Link>
                )}
                <button
                  onClick={() => setActiveTab("settings")}
                  className="w-full flex items-center gap-3 bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                >
                  <User className="h-5 w-5 text-[#4db6ac] shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-[#3d3d3d]">Edit Profile</p>
                    <p className="text-xs text-gray-400">Update your name</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className="w-full flex items-center gap-3 bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                >
                  <Lock className="h-5 w-5 text-[#4db6ac] shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-[#3d3d3d]">Change Password</p>
                    <p className="text-xs text-gray-400">Update your credentials</p>
                  </div>
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-3 bg-white rounded-xl p-4 hover:bg-red-50 transition-colors shadow-sm border border-gray-100 group"
                >
                  <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-500 shrink-0 transition-colors" />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-[#3d3d3d] group-hover:text-red-500 transition-colors">Sign Out</p>
                    <p className="text-xs text-gray-400">End your session</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ── Account Settings ── */}
          {activeTab === "settings" && (
            <div className="max-w-lg">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-sm font-semibold text-[#3d3d3d] uppercase tracking-wide mb-5">Personal Information</h2>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        value={session.user.email}
                        disabled
                        className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Email address cannot be changed.</p>
                  </div>
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="bg-[#4db6ac] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3d9d93] disabled:opacity-60 transition-colors flex items-center gap-2"
                  >
                    {savingProfile
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                      : <><Check className="h-4 w-4" /> Save Changes</>}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ── Security ── */}
          {activeTab === "security" && (
            <div className="max-w-lg">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-sm font-semibold text-[#3d3d3d] uppercase tracking-wide mb-5">Change Password</h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
                      />
                      <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac] ${
                        confirmPassword && confirmPassword !== newPassword
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />
                    {confirmPassword && confirmPassword !== newPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="bg-[#3d3d3d] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#2d2d2d] disabled:opacity-60 transition-colors flex items-center gap-2"
                  >
                    {savingPassword
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</>
                      : <><Lock className="h-4 w-4" /> Update Password</>}
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
