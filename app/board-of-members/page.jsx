import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import AnimateOnScroll from "@/components/animate-on-scroll"
import { prisma } from "@/lib/db"
import Image from "next/image"

export const revalidate = 3600

export default async function TeamPage() {
  const members = await prisma.boardMember.findMany({ orderBy: { order: "asc" } })

  const chairman = members.find((m) => m.role === "Chairman")
  const rest = members.filter((m) => m.role !== "Chairman")
  const keyRoles = rest.filter((m) => m.role === "Secretary" || m.role === "Treasurer")
  const generalMembers = rest.filter((m) => m.role !== "Secretary" && m.role !== "Treasurer")

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">

        {/* ── Hero ── */}
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

        {/* ── Chairman ── */}
        {chairman && (
          <section className="pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
              <AnimateOnScroll variant="up">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <PhotoFrame member={chairman} size="lg" />
                  </div>
                  {/* Text */}
                  <div>
                    <span className="text-[#4db6ac] text-xs font-bold uppercase tracking-[0.2em]">{chairman.role}</span>
                    <h2 className="text-4xl font-bold text-[#3d3d3d] mt-2 mb-4">{chairman.name}</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#4ecdc4] to-[#2196f3] rounded-full mb-4" />
                    {chairman.bio && <p className="text-[#5a5a5a] leading-relaxed text-base">{chairman.bio}</p>}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* ── Divider ── */}
        {(chairman && (keyRoles.length > 0 || generalMembers.length > 0)) && (
          <div className="container mx-auto px-6 max-w-5xl pb-16">
            <div className="border-t border-[#3d3d3d]/10" />
          </div>
        )}

        {/* ── Secretary & Treasurer ── */}
        {keyRoles.length > 0 && (
          <section className="pb-16">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="grid gap-12 sm:grid-cols-2">
                {keyRoles.map((m, i) => (
                  <AnimateOnScroll key={m.id} variant="up" delay={i * 100}>
                    <MemberProfile member={m} />
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Divider ── */}
        {keyRoles.length > 0 && generalMembers.length > 0 && (
          <div className="container mx-auto px-6 max-w-5xl pb-16">
            <div className="border-t border-[#3d3d3d]/10" />
          </div>
        )}

        {/* ── General Members ── */}
        {generalMembers.length > 0 && (
          <section className="pb-24">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="grid gap-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {generalMembers.map((m, i) => (
                  <AnimateOnScroll key={m.id} variant="up" delay={i * 60}>
                    <MemberProfile member={m} compact />
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}

function isValidImageSrc(src) {
  if (!src) return false
  return src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")
}

function PhotoFrame({ member, size = "md" }) {
  const dims = {
    lg: { box: "w-56 h-64", img: 224 },
    md: { box: "w-40 h-48", img: 160 },
    sm: { box: "w-28 h-32", img: 112 },
  }
  const { box, img } = dims[size]
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div className={`relative ${box} rounded-2xl overflow-hidden`}>
      {isValidImageSrc(member.image) ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes={`${img}px`}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#4ecdc4] to-[#2196f3] flex items-center justify-center">
          <span className="text-white font-bold text-4xl">{initials}</span>
        </div>
      )}
    </div>
  )
}

function MemberProfile({ member, compact = false }) {
  return (
    <div className="flex flex-col gap-4">
      <PhotoFrame member={member} size={compact ? "sm" : "md"} />
      <div>
        <span className="text-[#4db6ac] text-xs font-bold uppercase tracking-[0.15em]">{member.role}</span>
        <h3 className={`font-bold text-[#3d3d3d] mt-0.5 leading-snug ${compact ? "text-base" : "text-xl"}`}>
          {member.name}
        </h3>
        {!compact && member.bio && (
          <p className="text-[#5a5a5a] text-sm leading-relaxed mt-2">{member.bio}</p>
        )}
      </div>
    </div>
  )
}
