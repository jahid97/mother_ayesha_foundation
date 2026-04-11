import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import PostForm from "@/components/admin/post-form"

export default async function EditStory({ params }) {
  const { id } = await params
  const story = await prisma.story.findUnique({ where: { id: parseInt(id) } })
  if (!story) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Story</h1>
      <PostForm post={story} type="story" />
    </div>
  )
}
