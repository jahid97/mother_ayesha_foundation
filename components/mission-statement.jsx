// Mission statement component - Displays the organization's mission with animated stats
"use client"

import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import AnimatedCounter from "@/components/animated-counter"
import { Heart, Users, Home, BookOpen, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function MissionStatement() {
  const { t } = useLanguage()

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: "200px 0px" })
  const [statsContainerRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: "200px 0px" })

  useEffect(() => {
    const errorHandler = (event) => {
      if (event.message.includes("ResizeObserver")) event.stopImmediatePropagation()
    }
    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  const stats = [
    { icon: Users,    end: 50000, suffix: "+", key: "mission.stats.children",  delay: "" },
    { icon: Home,     end: 30,    suffix: "+", key: "mission.stats.shelters",  delay: "delay-200" },
    { icon: BookOpen, end: 10,    suffix: "+", key: "mission.stats.schools",   delay: "delay-400" },
    { icon: Award,    end: 25,    suffix: "+", key: "mission.stats.years",     delay: "delay-600" },
  ]

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-[#faf6ed]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="absolute left-0 top-0 w-20 h-20 md:w-32 md:h-32 rounded-full bg-[#4db6ac]/10 -translate-x-1/2 -translate-y-1/2" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={cn("transition-all duration-1000 transform", inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
            <div className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
              {t("mission.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3d3d3d] mb-6 leading-tight">
              {t("mission.heading")}
            </h2>

            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-[#4db6ac]/10 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-[#4db6ac]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#3d3d3d] mb-1">{t("mission.point1Title")}</h3>
                  <p className="text-sm text-[#5a5a5a] px-2">{t("mission.point1Desc")}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-[#4db6ac]/10 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-[#4db6ac]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#3d3d3d] mb-1">{t("mission.point2Title")}</h3>
                  <p className="text-sm text-[#5a5a5a] px-2">{t("mission.point2Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={cn("transition-all duration-1000 transform", inView ? "opacity-100 translate-x-0 delay-300" : "opacity-0 translate-x-10")}>
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 relative">
              <div className="absolute -top-5 -left-5 text-6xl text-[#4db6ac]/20 font-serif">"</div>
              <p className="text-[#5a5a5a] mb-6 relative z-10">
                {t("mission.quote")}
                <span className="block mt-4 font-medium text-[#3d3d3d]">{t("mission.quoteStrong")}</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about-us#our-mission">
                  <Button variant="outline" className="text-[#3d3d3d] border-[#3d3d3d] hover:bg-[#3d3d3d] hover:text-white transition-colors">
                    {t("mission.cta")}
                  </Button>
                </Link>
              </div>
              <div className="absolute -bottom-5 -right-5 text-6xl text-[#4db6ac]/20 font-serif rotate-180">"</div>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div ref={statsContainerRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ icon: Icon, end, suffix, key, delay }) => (
            <div
              key={key}
              className={cn(
                "bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-700 transform",
                statsInView ? `opacity-100 translate-y-0 ${delay}` : "opacity-0 translate-y-10",
              )}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4db6ac]/10 mb-4">
                <Icon className="h-6 w-6 text-[#4db6ac]" />
              </div>
              <h3 className="text-3xl font-bold text-[#3d3d3d]">
                <AnimatedCounter end={end} suffix={suffix} />
              </h3>
              <p className="text-[#5a5a5a] text-sm mt-1">{t(key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
