import PostForm from "@/components/admin/post-form"

export default function NewBlogPost() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Blog Post</h1>
      <PostForm type="blog" />
    </div>
  )
}
