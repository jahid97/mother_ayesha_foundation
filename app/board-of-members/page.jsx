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
          <section className="pb-12">
            <div className="container mx-auto px-4 max-w-5xl">
              <AnimateOnScroll variant="up">
                <div className="bg-[#3d3d3d] text-white rounded-2xl p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 shadow-lg">
                  <Avatar member={chairman} size="xl" />
                  <div>
                    <p className="text-[#4db6ac] font-semibold text-xs uppercase tracking-widest mb-1">{chairman.role}</p>
                    <h2 className="text-3xl font-bold mb-3 text-white">{chairman.name}</h2>
                    <p className="text-gray-300 leading-relaxed">{chairman.bio}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* ── Secretary & Treasurer ── */}
        {keyRoles.length > 0 && (
          <section className="pb-6">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid gap-6 sm:grid-cols-2">
                {keyRoles.map((m, i) => (
                  <AnimateOnScroll key={m.id} variant="up" delay={i * 80}>
                    <MemberCard member={m} />
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Members ── */}
        {generalMembers.length > 0 && (
          <section className="pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {generalMembers.map((m, i) => (
                  <AnimateOnScroll key={m.id} variant="up" delay={i * 60}>
                    <MemberCard member={m} />
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

function Avatar({ member, size = "md" }) {
  const sizes = { xl: "h-28 w-28 text-3xl", md: "h-16 w-16 text-lg" }
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

  if (isValidImageSrc(member.image)) {
    return (
      <div className={`${sizes[size]} rounded-full overflow-hidden flex-shrink-0 border-2 border-[#4db6ac]/30`}>
        <Image src={member.image} alt={member.name} width={112} height={112} className="object-cover w-full h-full" />
      </div>
    )
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-[#4db6ac] text-white font-bold flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  )
}

function MemberCard({ member }) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-xl p-7 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full gap-4">
      <Avatar member={member} size="md" />
      <div className="min-w-0">
        <p className="text-[#4db6ac] text-xs font-semibold uppercase tracking-widest mb-1">{member.role}</p>
        <h3 className="font-bold text-[#3d3d3d] text-lg leading-snug mb-2">{member.name}</h3>
        {member.bio && <p className="text-[#5a5a5a] text-sm leading-relaxed">{member.bio}</p>}
      </div>
    </div>
  )
}
