import Image from "next/image"
import AnimateOnScroll from "@/components/animate-on-scroll"

export default function PageHero({ title, description, badge }) {
  return (
    <div className="relative bg-[#3d3d3d] py-16 mb-12">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/placeholder.svg?height=600&width=1200&text=Pattern"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
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
