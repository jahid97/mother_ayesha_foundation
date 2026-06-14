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
                <div className="bg-[#3d3d3d] text-white rounded-2xl overflow-hidden shadow-lg flex flex-col sm:flex-row">
                  {/* Photo */}
                  <div className="relative w-full sm:w-56 h-56 sm:h-auto flex-shrink-0">
                    {isValidImageSrc(chairman.image) ? (
                      <Image
                        src={chairman.image}
                        alt={chairman.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 224px"
                      />
                    ) : (
                      <Initials name={chairman.name} className="w-full h-full text-5xl" />
                    )}
                  </div>
                  {/* Text */}
                  <div className="p-8 flex flex-col justify-center">
                    <p className="text-[#4db6ac] font-semibold text-xs uppercase tracking-widest mb-2">{chairman.role}</p>
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

function Initials({ name, className }) {
  const letters = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  return (
    <div className={`bg-[#4db6ac] text-white font-bold flex items-center justify-center ${className}`}>
      {letters}
    </div>
  )
}

function MemberCard({ member }) {
  const hasPhoto = isValidImageSrc(member.image)
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden">
      {/* Photo area */}
      <div className="relative h-52 w-full bg-gray-100">
        {hasPhoto ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <Initials name={member.name} className="w-full h-full text-4xl" />
        )}
        {/* Role badge */}
        <span className="absolute bottom-3 left-3 bg-[#4db6ac] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {member.role}
        </span>
      </div>
      {/* Text */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-[#3d3d3d] text-lg mb-2">{member.name}</h3>
        {member.bio && <p className="text-[#5a5a5a] text-sm leading-relaxed">{member.bio}</p>}
      </div>
    </div>
  )
}
