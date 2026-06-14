import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import AnimateOnScroll from "@/components/animate-on-scroll"
import { prisma } from "@/lib/db"
import Image from "next/image"

export const revalidate = 3600

export default async function TeamPage() {
  const members = await prisma.boardMember.findMany({ orderBy: { order: "asc" } })

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">

        {/* Hero */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" delay={0}>
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4 uppercase tracking-wide">
                Governance
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll variant="up" delay={100}>
              <h1 className="mb-4 text-4xl font-bold text-[#3d3d3d] md:text-5xl">Board of Members</h1>
            </AnimateOnScroll>
            <AnimateOnScroll variant="up" delay={200}>
              <p className="mx-auto max-w-2xl text-[#5a5a5a]">
                The Mother Ayesha Foundation is guided by a distinguished board of dedicated professionals
                committed to advancing social welfare, education, healthcare, and research across Bangladesh.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Member list */}
        <section className="pb-24">
          <div className="container mx-auto px-6 max-w-4xl">
            {members.length === 0 ? (
              <p className="text-center text-[#5a5a5a] py-12">No board members added yet.</p>
            ) : (
              <div>
                {members.map((member, i) => (
                  <AnimateOnScroll key={member.id} variant="up" delay={i * 60}>
                    <MemberRow member={member} />
                  </AnimateOnScroll>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

function isValidImageSrc(src) {
  if (!src) return false
  return src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")
}

function MemberRow({ member }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const isLead = member.role === "CEO" || member.role === "Chairman"
  const photoSize = isLead ? "w-32 h-32" : "w-24 h-24"
  const imgPx = isLead ? 128 : 96
  const initialsSize = isLead ? "text-3xl" : "text-2xl"
  const nameSize = isLead ? "text-2xl" : "text-xl"
  const linePt = isLead ? "pt-16" : "pt-12"

  return (
    <div className="flex items-start gap-0 py-8 group">

      {/* Left: circle photo */}
      <div className="flex-shrink-0">
        <div className={`${photoSize} rounded-full overflow-hidden border-[3px] border-[#4db6ac] bg-gradient-to-br from-[#4ecdc4] to-[#2196f3] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}>
          {isValidImageSrc(member.image) ? (
            <Image
              src={member.image}
              alt={member.name}
              width={imgPx}
              height={imgPx}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className={`text-white font-bold ${initialsSize}`}>{initials}</span>
          )}
        </div>
      </div>

      {/* Horizontal connector line */}
      <div className={`flex items-center self-stretch ${linePt}`}>
        <div className="w-6 h-px bg-[#4db6ac]" />
      </div>

      {/* Right: details */}
      <div className="flex-1 min-w-0 pt-2 border-b border-[#3d3d3d]/10 pb-8 pl-5">
        <span className="text-[#4db6ac] text-xs font-bold uppercase tracking-[0.2em]">{member.role}</span>
        <h3 className={`font-bold text-[#3d3d3d] mt-0.5 mb-2 ${nameSize}`}>{member.name}</h3>
        {member.bio && (
          <p className="text-[#5a5a5a] text-sm leading-relaxed">{member.bio}</p>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`} className="inline-block mt-3 text-xs text-[#4db6ac] hover:underline">
            {member.email}
          </a>
        )}
      </div>

    </div>
  )
}
