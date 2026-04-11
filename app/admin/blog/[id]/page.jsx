import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import PostForm from "@/components/admin/post-form"

export default async function EditBlogPost({ params }) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id: parseInt(id) } })
  if (!post) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog Post</h1>
      <PostForm post={post} type="blog" />
    </div>
  )
}
