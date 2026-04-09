"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Stethoscope, Eye, BookOpen, FlaskConical, Home, LifeBuoy } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const areaKeys = ["food", "water", "education", "medical", "shelter", "counseling"]

const areaStyles = [
  { icon: Stethoscope,  bg: "bg-[#fde9e9]", hoverBg: "group-hover:bg-[#fcd5d5]", iconColor: "text-[#e74c3c]" },
  { icon: Eye,          bg: "bg-[#d1f0f6]", hoverBg: "group-hover:bg-[#b3e5f8]", iconColor: "text-[#3498db]" },
  { icon: BookOpen,     bg: "bg-[#f8e8c6]", hoverBg: "group-hover:bg-[#f5d69e]", iconColor: "text-[#e6a23c]" },
  { icon: FlaskConical, bg: "bg-[#e8f5e9]", hoverBg: "group-hover:bg-[#c8e6c9]", iconColor: "text-[#4caf50]" },
  { icon: Home,         bg: "bg-[#e3f2fd]", hoverBg: "group-hover:bg-[#bbdefb]", iconColor: "text-[#2196f3]" },
  { icon: LifeBuoy,     bg: "bg-[#d8f5f5]", hoverBg: "group-hover:bg-[#b8eded]", iconColor: "text-[#4db6ac]" },
]

export default function FocusAreasSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#4db6ac]/10 text-[#4db6ac] font-medium px-4 py-1 rounded-full text-sm mb-4">
            {t("focus.badge")}
          </span>
          <h2 className="text-3xl font-bold text-[#3d3d3d] mb-3">{t("focus.heading")}</h2>
          <p className="text-[#5a5a5a] max-w-2xl mx-auto">{t("focus.description")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {areaKeys.map((key, i) => {
            const { icon: Icon, bg, hoverBg, iconColor } = areaStyles[i]
            return (
              <div key={key} className="flex flex-col items-center group cursor-default">
                <div className={`${bg} ${hoverBg} p-5 rounded-full mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                  <Icon className={`w-10 h-10 ${iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-[#3d3d3d] font-semibold mb-1">{t(`focus.areas.${key}.label`)}</h3>
                <p className="text-sm text-[#5a5a5a] px-2">{t(`focus.areas.${key}.description`)}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/about-us#our-programs">
            <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">{t("focus.cta")}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
