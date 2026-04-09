import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CallToAction({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  imageSrc = "/placeholder.svg?height=600&width=800&text=Make+a+Difference",
  imageAlt = "Call to action image",
  bgColor = "bg-white",
}) {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">{title}</h2>
              <p className="text-[#5a5a5a] mb-6">{description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={primaryButtonLink}>
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">{primaryButtonText}</Button>
                </Link>
                {secondaryButtonText && secondaryButtonLink && (
                  <Link href={secondaryButtonLink}>
                    <Button
                      variant="outline"
                      className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                    >
                      {secondaryButtonText}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="relative h-[300px] md:h-auto">
              <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

