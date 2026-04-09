// Story card component - Displays a preview of a story with image, category, and excerpt
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StoryCard({ story }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={story.image || "/placeholder.svg"}
          alt={story.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {story.category}
          </Badge>
          <span className="text-sm text-muted-foreground">{story.date}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold">{story.title}</h3>
        <p className="text-muted-foreground">{story.excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <span className="text-sm font-medium">By {story.author}</span>
        <Link href={`/stories/${story.id}`} className="text-sm font-medium text-primary hover:underline">
          Read More
        </Link>
      </CardFooter>
    </Card>
  )
}

