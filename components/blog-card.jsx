// Blog card component - Displays a preview of a blog post with image, title, and description
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function BlogCard({ image, category, title, description, date, slug, className }) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-[#4db6ac]/90 px-3 py-1 text-sm font-medium text-white">
          {category}
        </span>
      </div>
      <div className="p-5">
        <p className="mb-2 text-sm text-[#4db6ac]">{date}</p>
        <h3 className="mb-2 text-xl font-bold text-[#3d3d3d] group-hover:text-[#4db6ac] transition-colors">{title}</h3>
        <p className="text-[#5a5a5a] line-clamp-2">{description}</p>
      </div>
    </Link>
  )
}

