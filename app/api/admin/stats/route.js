import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const [projects, blogPosts, stories, galleryImages, donations, contacts, subscribers] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.story.count(),
    prisma.galleryImage.count(),
    prisma.donation.count(),
    prisma.contactMessage.count(),
    prisma.newsletterSubscriber.count(),
  ])

  const unreadContacts = await prisma.contactMessage.count({ where: { read: false } })
  const totalRaised = await prisma.donation.aggregate({
    _sum: { amount: true },
    where: { status: "completed" },
  })

  return NextResponse.json({
    projects,
    blogPosts,
    stories,
    galleryImages,
    donations,
    contacts,
    unreadContacts,
    subscribers,
    totalRaised: totalRaised._sum.amount ?? 0,
  })
}
