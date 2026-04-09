// Partners display component - Shows a grid of partner logos with a title
import Image from "next/image"

export default function PartnersDisplay({
  title = "Over 200+ partners currently help us",
  partners = ["Save the Children", "UNICEF", "American Red Cross", "Amazon", "World Vision"],
  className = "",
}) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <p className="mb-8 text-[#3d3d3d]">
          <span className="font-bold text-[#4db6ac]">200+</span> {title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner) => (
            <div key={partner} className="relative h-16 w-32">
              <Image
                src={`/placeholder.svg?height=64&width=128&text=${partner.replace(/\s+/g, "+")}`}
                alt={partner}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

