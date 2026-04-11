import PostForm from "@/components/admin/post-form"

export default function NewStory() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Story</h1>
      <PostForm type="story" />
    </div>
  )
}
