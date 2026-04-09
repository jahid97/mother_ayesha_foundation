import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import AnimateOnScroll from "@/components/animate-on-scroll"

// ── Board data ───────────────────────────────────────────────────────────────

const chairman = {
  name: "Dr. Rafiqul Bhuyan",
  role: "Chairman",
  initials: "RB",
  bio: "Fulbright Scholar. Professor at Independent University, Bangladesh. PhD in Economics, Concordia University Montreal. MS in Finance, University of Illinois. Author of 80+ peer-reviewed research papers. Former faculty at Le Moyne College (NY), California State University, UC Riverside, Northeastern, USC, UC Davis, and American University of Kuwait.",
}

const boardMembers = [
  {
    name: "Md. Mizanur Rahman",
    role: "Secretary",
    initials: "MR",
    bio: "Islamic Scholar and Teacher. Based in Gulshan, Dhaka.",
  },
  {
    name: "Abdul Muqit",
    role: "Treasurer",
    initials: "AM",
    bio: "Teacher. East Rampura, Dhaka.",
  },
  {
    name: "Md. Joynal Abdin",
    role: "Member",
    initials: "JA",
    bio: "Founder & CEO of Trade & Investment Bangladesh (T&IB) and Secretary General, Brazil Bangladesh Chamber of Commerce & Industry (BBCCI).",
  },
  {
    name: "Md. Hakim Bhuiyan",
    role: "Member",
    initials: "HB",
    bio: "Serviceholder. Dhaka.",
  },
  {
    name: "A Q M Abdullah Al Monsur",
    role: "Member",
    initials: "AM",
    bio: "Brand Manager, Golden Harvest. Dhaka.",
  },
  {
    name: "Nazrul Islam",
    role: "Member",
    initials: "NI",
    bio: "Teacher. Uttara, Dhaka.",
  },
  {
    name: "Md. Saiful Hassan",
    role: "Member",
    initials: "SH",
    bio: "Dhaka.",
  },
  {
    name: "Mohammad Sogir Hossain Khandoker",
    role: "Member",
    initials: "MK",
    bio: "Dhaka.",
  },
  {
    name: "Md. Anwar Hossain",
    role: "Member",
    initials: "AH",
    bio: "Dhaka.",
  },
  {
    name: "Ananno Raihan Chowdhury",
    role: "Member",
    initials: "AC",
    bio: "Dhaka.",
  },
]

// ── Initials Avatar ──────────────────────────────────────────────────────────
function Avatar({ initials, size = "md" }) {
  const sizes = {
    xl: "h-20 w-20 text-2xl",
    md: "h-12 w-12 text-sm",
  }
  return (
    <div
      className={`${sizes[size]} rounded-full bg-[#4db6ac] text-white font-bold flex items-center justify-center flex-shrink-0`}
    >
      {initials}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TeamPage() {
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
              <h1 className="mb-4 text-4xl font-bold text-[#3d3d3d] md:text-5xl">
                Board of Members
              </h1>
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
        <section className="pb-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <AnimateOnScroll variant="up" delay={0}>
              <div className="bg-[#3d3d3d] text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-lg">
                <Avatar initials={chairman.initials} size="xl" />
                <div>
                  <p className="text-[#4db6ac] font-semibold text-xs uppercase tracking-widest mb-1">
                    {chairman.role}
                  </p>
                  <h2 className="text-2xl font-bold mb-3 text-white">{chairman.name}</h2>
                  <p className="text-gray-300 leading-relaxed text-sm">{chairman.bio}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Secretary & Treasurer ── */}
        <section className="pb-6">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {boardMembers.slice(0, 2).map((m, i) => (
                <AnimateOnScroll key={m.name} variant="up" delay={i * 80}>
                  <MemberCard member={m} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Members ── */}
        <section className="pb-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {boardMembers.slice(2).map((m, i) => (
                <AnimateOnScroll key={m.name} variant="up" delay={i * 60}>
                  <MemberCard member={m} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

// ── Member Card ───────────────────────────────────────────────────────────────
function MemberCard({ member }) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
      <Avatar initials={member.initials} size="md" />
      <div className="min-w-0">
        <p className="text-[#4db6ac] text-xs font-semibold uppercase tracking-widest mb-0.5">
          {member.role}
        </p>
        <h3 className="font-bold text-[#3d3d3d] text-base leading-snug mb-1">{member.name}</h3>
        <p className="text-[#5a5a5a] text-sm leading-relaxed">{member.bio}</p>
      </div>
    </div>
  )
}
