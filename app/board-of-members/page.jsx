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
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3d3d3d] via-[#2a2a2a] to-[#1a1a1a]" />
                  {/* Decorative teal glow */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#4db6ac]/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#2196f3]/10 rounded-full blur-3xl" />

                  <div className="relative flex flex-col sm:flex-row items-center sm:items-stretch gap-0">
                    {/* Photo panel */}
                    <div className="relative w-full sm:w-64 h-64 sm:h-auto flex-shrink-0">
                      {isValidImageSrc(chairman.image) ? (
                        <Image
                          src={chairman.image}
                          alt={chairman.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 256px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#4ecdc4] to-[#2196f3] flex items-center justify-center">
                          <span className="text-white text-6xl font-bold">
                            {chairman.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      {/* Gradient fade into text area on desktop */}
                      <div className="hidden sm:block absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#2a2a2a]" />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-center px-8 py-10 text-white">
                      <span className="inline-block bg-gradient-to-r from-[#4ecdc4] to-[#2196f3] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">
                        {chairman.role}
                      </span>
                      <h2 className="text-3xl font-bold mb-3">{chairman.name}</h2>
                      {chairman.bio && (
                        <p className="text-gray-300 leading-relaxed max-w-xl">{chairman.bio}</p>
                      )}
                    </div>
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

function MemberCard({ member }) {
  const hasPhoto = isValidImageSrc(member.image)
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Gradient header */}
      <div className="relative h-28 bg-gradient-to-br from-[#4ecdc4] via-[#44b8e0] to-[#2196f3] flex-shrink-0" />

      {/* Photo — overlaps header and body */}
      <div className="relative flex justify-center -mt-14 mb-3 flex-shrink-0">
        <div className="h-28 w-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#4db6ac] flex items-center justify-center flex-shrink-0">
          {hasPhoto ? (
            <Image
              src={member.image}
              alt={member.name}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-white text-3xl font-bold">{initials}</span>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="px-6 pb-7 text-center flex flex-col flex-grow">
        <span className="inline-block text-[#4db6ac] text-xs font-bold uppercase tracking-widest mb-1">
          {member.role}
        </span>
        <h3 className="text-[#3d3d3d] font-bold text-lg mb-2 leading-snug">{member.name}</h3>
        {member.bio && (
          <p className="text-[#5a5a5a] text-sm leading-relaxed">{member.bio}</p>
        )}
      </div>
    </div>
  )
}
