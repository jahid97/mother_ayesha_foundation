"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HandHeart, Users, Globe } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"

const ways = [
  {
    icon: HandHeart,
    href: "/contact-us",
    title: "Volunteer",
    description: "Give your time and skills to make a direct difference in the lives of communities we serve.",
    cta: "Become a Volunteer",
  },
  {
    icon: Users,
    href: "/donate",
    title: "Fundraise",
    description: "Organise a fundraiser in your community and help us reach more people across Bangladesh.",
    cta: "Start Fundraising",
  },
  {
    icon: Globe,
    href: "/about-us",
    title: "Spread the Word",
    description: "Share our mission with your network and help us grow our impact across Bangladesh and beyond.",
    cta: "Learn Our Mission",
  },
]

export default function VolunteerCtaSection() {
  return (
    <section className="py-16 bg-[#3d3d3d]">
      <div className="container mx-auto px-4">
        <AnimateOnScroll variant="up" className="text-center mb-12">
          <span className="inline-block bg-[#4db6ac]/20 text-[#4db6ac] font-medium px-4 py-1 rounded-full text-sm mb-4">
            Get Involved
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">There Are Many Ways to Help</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Whether you donate, volunteer, or raise awareness — every action counts and changes lives.</p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {ways.map(({ icon: Icon, href, title, description, cta }, index) => (
            <AnimateOnScroll key={title} variant="up" delay={index * 130}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-colors duration-300 group h-full flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#4db6ac]/20 mb-5 group-hover:bg-[#4db6ac]/30 transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-7 h-7 text-[#4db6ac]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed flex-grow">{description}</p>
                <Link href={href}>
                  <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white transition-colors">
                    {cta}
                  </Button>
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll variant="up" delay={150} className="text-center">
          <Link href="/donate">
            <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white px-10 py-6 text-lg rounded-full shadow-lg">
              Donate Now &amp; Change a Life
            </Button>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
