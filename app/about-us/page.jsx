import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { prisma } from "@/lib/db"
import { Check, Users, Heart, Award, Lightbulb, Globe, ArrowRight, Wrench, Landmark, HandHeart, LifeBuoy, TrendingUp, ShieldCheck } from "lucide-react"
import ImpactStats from "@/components/impact-stats"
import ScrollToSection from "./scroll-to-section"
import AnimateOnScroll from "@/components/animate-on-scroll"

// Core Principles — derived directly from MOA Section 3 and Section 5
const principles = [
  {
    title: "Non-Profit",
    description:
      "All income and property of the Foundation is applied solely toward its objectives. No earnings are distributed as dividends or profit to any member.",
    icon: ShieldCheck,
  },
  {
    title: "Compassion",
    description:
      "We approach every initiative with empathy and deep respect for the dignity of each person we serve, regardless of their social, economic, or educational background.",
    icon: Heart,
  },
  {
    title: "Integrity & Transparency",
    description:
      "We maintain the highest ethical standards in all operations, ensuring full transparency and accountability in the use of all funds and donations.",
    icon: Check,
  },
  {
    title: "Research-Driven",
    description:
      "We use evidence-based research and policy recommendations to identify root causes and implement targeted, sustainable solutions for underprivileged communities.",
    icon: Lightbulb,
  },
  {
    title: "Inclusivity",
    description:
      "We serve all people regardless of religion, gender, ethnicity, or background — promoting homogeneity, tolerance, mutual respect, and community welfare.",
    icon: Users,
  },
  {
    title: "Global Alignment",
    description:
      "Our programs are designed in line with the United Nations Sustainable Development Goals (SDG) 2030, including climate, education, financial inclusion, and good health.",
    icon: Globe,
  },
]

// Programs derived strictly from MOA Section 5
const programs = [
  {
    title: "Skills Development & Vocational Training",
    sdg: "SDG 4 & 8",
    description:
      "We establish and operate TVET (Technical and Vocational Education and Training) institutes that equip young Bangladeshis — particularly those outside the formal economy — with practical, employable skills. Graduates enter the workforce as trained technicians, entrepreneurs, and skilled workers.",
    icon: Wrench,
  },
  {
    title: "Scholarships & Fellowships",
    sdg: "SDG 4",
    description:
      "Financial support for outstanding students from low-income backgrounds to pursue higher education in Bangladesh and abroad. The Foundation believes that talent is evenly distributed — opportunity is not. Scholarships correct that imbalance.",
    icon: Award,
  },
  {
    title: "Healthcare",
    sdg: "SDG 3",
    description:
      "Community clinics and health facilities serving underserved populations: maternal and child health, eye care (including cataract programs and vision screening), elderly care, and primary healthcare. We focus on areas where government infrastructure is weakest.",
    icon: Heart,
  },
  {
    title: "Rural Financial Literacy",
    sdg: "SDG 1 & 10",
    description:
      "Millions of rural Bangladeshis remain outside the formal banking system — dependent on local moneylenders and informal savings. We run workshops and programmes to educate communities about banking, savings, insurance, and digital financial tools.",
    icon: Landmark,
  },
  {
    title: "Zakat & Waqf Management",
    sdg: "SDG 1",
    description:
      "Structured, transparent collection and disbursement of zakat and sadaqah to eligible individuals and institutions. Waqf (endowment) assets are managed for sustained, long-term social benefit — ensuring charitable capital generates ongoing impact.",
    icon: HandHeart,
  },
  {
    title: "Humanitarian Relief & Rehabilitation",
    sdg: "SDG 11",
    description:
      "Bangladesh faces recurring natural disasters — floods, cyclones, and river erosion displace millions annually. The Foundation provides rapid relief and long-term rehabilitation support, with a focus on rebuilding livelihoods, not just distributing aid.",
    icon: LifeBuoy,
  },
  {
    title: "Research & Policy",
    sdg: "SDG 17",
    description:
      "Independent research on the social, financial, and economic challenges facing Bangladesh. We produce policy recommendations for government ministries, industry bodies, and development partners — connecting academia, industry, and civil society.",
    icon: Lightbulb,
  },
  {
    title: "Religious & Community Infrastructure",
    sdg: "SDG 11",
    description:
      "Supporting the construction and maintenance of mosques, madrasas, prayer halls, and libraries that serve as community anchors. We distribute books, digital learning resources, and educational materials to communities in need.",
    icon: Globe,
  },
  {
    title: "Entrepreneurship & Social Business Development",
    sdg: "SDG 8 & 9",
    description:
      "We incubate and grow social businesses — self-sustaining enterprises that reinvest their profits into their mission rather than distributing dividends. Alongside micro-financing, mentorship, and network access for women and youth entrepreneurs in rural areas, we build shared operator-networks and patient-capital models so that one venture creates employment and impact for many, and surpluses recycle into the next.",
    icon: TrendingUp,
  },
]

export default async function AboutUsPage() {
  const bgSetting = await prisma.siteSetting.findUnique({ where: { key: "heroBackground_about" } })
  const heroBg = bgSetting?.value || null

  const impactStats = [
    { value: "25+", label: "Years of Service", color: "text-[#ff4d4d]" },
    { value: "50,000+", label: "People Served", color: "text-[#4db6ac]" },
    { value: "30+", label: "Active Programs", color: "text-[#ffa726]" },
    { value: "10+", label: "Partner Institutions", color: "text-[#9c27b0]" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />
      <ScrollToSection />
      <main className="flex-grow">

        {/* ─── Hero ─── */}
        <section className={`relative py-20 overflow-hidden ${!heroBg ? "bg-[#3d3d3d]" : ""}`}>
          {heroBg ? (
            <>
              <div className="absolute inset-0">
                <Image src={heroBg} alt="" fill className="object-cover" priority />
              </div>
              <div className="absolute inset-0 bg-black/50" />
            </>
          ) : (
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/placeholder.svg?height=1000&width=2000&text=Pattern"
                alt="Background pattern"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <AnimateOnScroll variant="up" delay={0}>
                <span className="inline-block bg-[#4db6ac]/20 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                  About Us
                </span>
              </AnimateOnScroll>
              <AnimateOnScroll variant="up" delay={100}>
                <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl leading-tight">
                  A Foundation Built on
                  <span className="block text-[#4db6ac]">Compassion & Purpose</span>
                </h1>
              </AnimateOnScroll>
              <AnimateOnScroll variant="up" delay={200}>
                <p className="text-lg text-gray-300 mb-4">
                  Mother Ayesha Foundation is an independent, non-profit, non-political, non-governmental and charitable
                  organization registered under the Societies Registration Act 1860. We operate throughout Bangladesh
                  with a mission to advance social welfare, education, healthcare, research, and economic empowerment.
                </p>
                <p className="text-lg text-gray-300 mb-8">
                  Named in honour of Ayesha Begum — a woman of quiet generosity and selfless service — the
                  Foundation was established by her son, Dr. Rafiqul Bhuyan, as a lasting tribute to her spirit:
                  structured, self-sustaining, and designed to help people long after any individual has passed.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll variant="up" delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/donate">
                    <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Support Our Mission</Button>
                  </Link>
                  <Link href="/contact-us">
                    <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
                      Join Our Team
                    </Button>
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* ─── Impact Stats — commented out until real numbers are available ───
        <ImpactStats
          title="Our Impact Across Bangladesh"
          description="Through the generosity of our donors and the dedication of our volunteers, we have made a significant and measurable difference in communities across Bangladesh."
          stats={impactStats}
        />
        */}

        {/* ─── Chairman's Message ─── */}
        <section id="chairmans-message" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="text-center mb-12">
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                A MESSAGE FROM OUR CHAIRMAN
              </span>
              <h2 className="text-3xl font-bold text-[#3d3d3d]">In Memory of Ayesha Begum</h2>
            </AnimateOnScroll>

            {/* Message */}
            <div className="grid md:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
              <AnimateOnScroll variant="left" className="md:col-span-2 flex flex-col items-center">
                <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-xl border-4 border-[#4db6ac]/30 mb-6">
                  <Image
                    src="/board_members/chairman_photo.jpeg?height=300&width=300&text=Chairman"
                    alt="Chairman, Mother Ayesha Foundation"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] text-center">Dr. Rafiqul Bhuyan</h3>
                <p className="text-[#4db6ac] font-medium text-center">Chairman, Mother Ayesha Foundation</p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="right" className="md:col-span-3">
                <div className="relative">
                  <div className="text-7xl text-[#4db6ac]/20 font-serif leading-none absolute -top-4 -left-4">"</div>
                  <div className="space-y-4 text-[#5a5a5a] relative z-10 pl-4">
                    <p>
                      Ayesha Begum was a woman of extraordinary quiet strength — a devoted mother, a generous
                      neighbour, and a person who gave without ever expecting anything in return. She lived her
                      life in humble service to those around her, offering warmth, care, and compassion to all
                      who crossed her path.
                    </p>
                    <p>
                      Her son, Dr. Rafiqul Bhuyan, established this Foundation in her name so that her spirit
                      of selfless giving would not merely be remembered, but would live on in every life this
                      organisation touches.
                    </p>
                    <p>
                      This Foundation is her legacy — and every act of charity carried out in its name is a
                      continuation of the love she gave so freely.
                    </p>
                  </div>
                  <div className="text-7xl text-[#4db6ac]/20 font-serif leading-none text-right">"</div>
                </div>
              </AnimateOnScroll>
            </div>

          </div>
        </section>

        {/* ─── Mission & Vision ─── */}
        <section id="our-mission" className="py-16 bg-[#faf6ed]">
          <div className="container mx-auto px-4 max-w-5xl">
            <AnimateOnScroll variant="up" className="text-center mb-14">
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">OUR PURPOSE</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d]">Mission, Vision & Values</h2>
            </AnimateOnScroll>

            <div className="space-y-8">
              {[
                {
                  number: "01",
                  label: "Mission",
                  text: "To engage, promote, and advance charitable and social welfare activities among communities and peoples of Bangladesh and other countries of the world, strictly on a Non-Profit basis — through healthcare, education, skills development, research, and humanitarian relief.",
                },
                {
                  number: "02",
                  label: "Vision",
                  text: "A Bangladesh where every person — regardless of social, economic, or educational background — has access to quality healthcare, education, economic opportunity, and a dignified life.",
                },
                {
                  number: "03",
                  label: "Our Approach",
                  text: "We combine grassroots community engagement with research-backed policy recommendations. By working closely with government ministries, universities, private sector organizations, and international development partners, we create initiatives that are both immediately impactful and sustainable long-term — aligned with the UN SDG 2030 agenda.",
                },
                {
                  number: "04",
                  label: "Nature of Organization",
                  text: "An independent, non-profitable, non-political, non-governmental charitable organization registered under the Societies Registration Act 1860. Operating throughout Bangladesh with the capacity to open branch offices abroad as determined by the Board of Trustees.",
                },
              ].map((item, i) => (
                <AnimateOnScroll key={i} variant="up" delay={i * 80}>
                  <div className="flex gap-6 md:gap-10 items-start group">
                    {/* Number */}
                    <span className="text-4xl font-bold text-[#4db6ac]/25 leading-none shrink-0 group-hover:text-[#4db6ac]/50 transition-colors duration-300">
                      {item.number}
                    </span>
                    {/* Divider */}
                    <div className="w-px self-stretch bg-[#4db6ac]/20 shrink-0 mt-1" />
                    {/* Content */}
                    <div className="pb-2">
                      <h3 className="text-lg font-bold text-[#3d3d3d] mb-2">{item.label}</h3>
                      <p className="text-[#5a5a5a] leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Core Principles ─── */}
        <section id="our-principles" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="text-center mb-12">
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                OUR GUIDING PRINCIPLES
              </span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">What We Stand For</h2>
              <p className="text-[#5a5a5a] max-w-2xl mx-auto">
                These principles guide every decision we make and every program we run, ensuring we remain true
                to our mission and accountable to the communities we serve.
              </p>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <AnimateOnScroll key={index} variant="up" delay={index * 80}>
                  <div className="bg-[#faf6ed] p-6 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full border border-[#4db6ac]/10">
                    <div className="w-12 h-12 bg-[#4db6ac]/10 rounded-full flex items-center justify-center mb-4">
                      <principle.icon className="h-6 w-6 text-[#4db6ac]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#3d3d3d] mb-2">{principle.title}</h3>
                    <p className="text-[#5a5a5a] text-sm">{principle.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Programs ─── */}
        <section id="our-programs" className="py-16 bg-[#3d3d3d] text-white">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="text-center mb-12">
              <span className="inline-block bg-white/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                OUR INITIATIVES
              </span>
              <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We run a comprehensive range of programs designed to address the root causes of poverty and
                social inequality in Bangladesh, aligned with the UN SDG 2030 agenda.
              </p>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <AnimateOnScroll key={index} variant="up" delay={index * 60}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors duration-300 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-[#4db6ac]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <program.icon className="h-7 w-7 text-[#4db6ac]" />
                      </div>
                      <span className="text-xs font-semibold text-[#4db6ac] bg-[#4db6ac]/10 px-2 py-1 rounded-full border border-[#4db6ac]/20">
                        {program.sdg}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">{program.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{program.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Source of Funds ─── */}
        <section className="py-16 bg-[#faf6ed]">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="text-center mb-12">
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                HOW WE ARE FUNDED
              </span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Source of Funds</h2>
              <p className="text-[#5a5a5a] max-w-2xl mx-auto">
                The Foundation is sustained by the generosity of individuals, institutions, and communities
                who believe in our mission.
              </p>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Donations & Gifts", desc: "Individual and institutional donations, one-time or recurring gifts from supporters in Bangladesh and abroad." },
                { title: "Zakat & Sadaqah", desc: "We receive and properly disburse Zakat and Sadaqah to eligible individuals and institutions as defined by Islamic principles." },
                { title: "Waqf Estate", desc: "We manage Waqf properties and endowments in accordance with Islamic law to sustain long-term charitable activities." },
                { title: "Grants & Subscriptions", desc: "Membership fees, grants from government agencies, international organizations, and sales of our publications and resource materials." },
              ].map((item, i) => (
                <AnimateOnScroll key={i} variant="up" delay={i * 80}>
                  <div className="bg-white rounded-lg p-6 shadow-md h-full border-t-4 border-[#4db6ac]">
                    <h3 className="text-lg font-bold text-[#3d3d3d] mb-3">{item.title}</h3>
                    <p className="text-[#5a5a5a] text-sm">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll variant="up" delay={200} className="text-center mt-10">
              <p className="text-[#5a5a5a] max-w-2xl mx-auto text-sm mb-6">
                All earnings of the Foundation are engaged solely to fulfill its goals and objectives. No
                portion of earnings shall be distributed to members as dividends or profit.
              </p>
              <Link href="/donate">
                <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">
                  Donate to Our Mission
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ─── Call to Action ─── */}
        <section className="py-16 bg-[#3d3d3d] text-white">
          <div className="container mx-auto px-4 text-center">
            <AnimateOnScroll variant="up">
              <h2 className="text-3xl font-bold mb-6">Join Us in Building a Better Bangladesh</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Together, we can create a Bangladesh where every person has access to education, healthcare,
                and economic opportunity. Your support makes our work possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/donate">
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white px-8 py-3 text-lg">
                    Donate Now
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
