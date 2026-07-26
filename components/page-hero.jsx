import Image from "next/image"
import AnimateOnScroll from "@/components/animate-on-scroll"
import { prisma } from "@/lib/db"

const PAGE_KEYS = {
  projects:   "heroBackground_projects",
  activities: "heroBackground_activities",
  blog:       "heroBackground_blog",
  gallery:    "heroBackground_gallery",
  contact:    "heroBackground_contact",
  stories:    "heroBackground_stories",
  about:      "heroBackground_about",
}

export default async function PageHero({ title, description, badge, page, bg }) {
  let bgUrl = bg || null
  if (!bgUrl && page && PAGE_KEYS[page]) {
    const setting = await prisma.siteSetting.findUnique({ where: { key: PAGE_KEYS[page] } })
    bgUrl = setting?.value || null
  }

  return (
    <div className={`relative py-16 mb-12 overflow-hidden ${!bgUrl ? "bg-[#3d3d3d]" : ""}`}>
      {bgUrl ? (
        <>
          <div className="absolute inset-0">
            <Image src={bgUrl} alt="" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : (
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=600&width=1200&text=Pattern"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl">
          {badge && (
            <AnimateOnScroll variant="up" delay={0}>
              <span className="inline-block bg-white/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                {badge}
              </span>
            </AnimateOnScroll>
          )}
          <AnimateOnScroll variant="up" delay={100}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          </AnimateOnScroll>
          {description && (
            <AnimateOnScroll variant="up" delay={200}>
              <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </div>
  )
}
