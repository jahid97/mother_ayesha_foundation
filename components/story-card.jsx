// Story card component - Displays a preview of a story with image, category, and excerpt
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function StoryCard({ story }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block h-full">
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={story.image || "/placeholder.svg"}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {story.category}
            </Badge>
            <span className="text-sm text-muted-foreground">{story.date}</span>
          </div>
          <h3 className="mb-2 text-xl font-bold group-hover:text-[#4db6ac] transition-colors">{story.title}</h3>
          <p className="text-muted-foreground flex-grow">{story.excerpt}</p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm font-medium">By {story.author}</span>
            <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
