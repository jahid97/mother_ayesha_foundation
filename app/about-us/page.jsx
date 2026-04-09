import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
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
    title: "Entrepreneurship Support",
    sdg: "SDG 8",
    description:
      "Micro-financing, mentorship, and network access for individuals with entrepreneurial ideas — particularly women and youth in rural areas. We believe that supporting one entrepreneur creates employment for many.",
    icon: TrendingUp,
  },
]

export default function AboutUsPage() {
  const impactStats = [
    { value: "25+", label: "Years of Service",      color: "text-[#ff4d4d]" },
    { value: "50,000+", label: "People Served",     color: "text-[#4db6ac]" },
    { value: "30+",  label: "Active Programs",      color: "text-[#ffa726]" },
    { value: "10+",  label: "Partner Institutions", color: "text-[#9c27b0]" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />
      <ScrollToSection />
      <main className="flex-grow">

        {/* ─── Hero ─── */}
        <section className="relative py-20 overflow-hidden bg-[#3d3d3d]">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/placeholder.svg?height=1000&width=2000&text=Pattern"
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>
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
                  <Link href="/volunteer-registration">
                    <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
                      Join Our Team
                    </Button>
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* ─── Impact Stats ─── */}
        <ImpactStats
          title="Our Impact Across Bangladesh"
          description="Through the generosity of our donors and the dedication of our volunteers, we have made a significant and measurable difference in communities across Bangladesh."
          stats={impactStats}
        />

        {/* ─── Chairman's Message ─── */}
        <section id="chairmans-message" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="text-center mb-12">
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                A MESSAGE FROM OUR CHAIRMAN
              </span>
              <h2 className="text-3xl font-bold text-[#3d3d3d]">Chairman's Message</h2>
            </AnimateOnScroll>

            {/* Message */}
            <div className="grid md:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
              <AnimateOnScroll variant="left" className="md:col-span-2 flex flex-col items-center">
                <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-xl border-4 border-[#4db6ac]/30 mb-6">
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Chairman"
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
                      In the name of Allah, the Most Gracious, the Most Merciful. It is with deep gratitude that
                      I welcome you to Mother Ayesha Foundation — an institution born out of a sincere desire to
                      serve humanity and to honour a legacy of compassion, quiet generosity, and care for those
                      around us.
                    </p>
                    <p>
                      Millions of our fellow citizens — particularly in rural areas and urban fringes — continue
                      to face barriers that no person should endure: lack of healthcare, absence of educational
                      opportunity, financial exclusion, and social marginalization. This Foundation exists to
                      bridge those gaps — through healthcare, education, skills development, research, elderly
                      care, humanitarian relief, and more.
                    </p>
                    <p>
                      I invite you to join us. Whether through a donation, a partnership, or your time — every
                      contribution matters. Together, we can build a Bangladesh where every person has the
                      opportunity to live with dignity and purpose.
                    </p>
                  </div>
                  <div className="text-7xl text-[#4db6ac]/20 font-serif leading-none text-right">"</div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* In Memory of Ayesha Begum — part of the same section */}
            <AnimateOnScroll variant="up" delay={100} className="max-w-5xl mx-auto mt-14">
              <div className="rounded-2xl overflow-hidden border border-[#4db6ac]/20 bg-[#faf6ed]">
                <div className="h-1 bg-gradient-to-r from-[#4db6ac] via-[#3d9d93] to-[#4db6ac]" />
                <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
                  {/* Portrait */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#4db6ac]/30 shadow-md mb-2">
                      <Image
                        src="/placeholder.svg?height=200&width=200&text=Ayesha+Begum"
                        alt="Ayesha Begum"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-semibold text-[#3d3d3d] text-center">Ayesha Begum</p>
                    <p className="text-xs text-[#4db6ac] text-center italic">In Loving Memory</p>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-px self-stretch bg-[#4db6ac]/20" />

                  {/* Text */}
                  <div className="flex-grow">
                    <p className="text-[#4db6ac] text-xs font-semibold uppercase tracking-widest mb-3">
                      In Memory of Ayesha Begum
                    </p>
                    <p className="text-[#5a5a5a] leading-relaxed">
                      The Mother Ayesha Foundation is named in honour of Ayesha Begum — a woman who embodied
                      quiet service, generosity, and care for those around her. Her son, Dr. Rafiqul Bhuyan,
                      established this Foundation as a lasting tribute to her spirit: structured,
                      self-sustaining, and designed to help people long after any individual has passed.
                    </p>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-[#4db6ac] via-[#3d9d93] to-[#4db6ac]" />
              </div>
            </AnimateOnScroll>

          </div>
        </section>

        {/* ─── Mission & Vision ─── */}
        <section id="our-mission" className="py-16 bg-[#faf6ed]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimateOnScroll variant="left" className="order-2 md:order-1">
                <div className="bg-[#3d3d3d] rounded-2xl overflow-hidden shadow-xl h-full flex flex-col">
                  {/* Top accent */}
                  <div className="h-1.5 bg-gradient-to-r from-[#4db6ac] to-[#3d9d93]" />
                  <div className="p-8 flex flex-col justify-between flex-grow">
                    {/* Big quote */}
                    <div>
                      <div className="text-6xl text-[#4db6ac]/30 font-serif leading-none mb-2">"</div>
                      <blockquote className="text-white text-xl font-light leading-relaxed italic mb-6">
                        Every person deserves dignity, education, healthcare, and the opportunity to build a
                        fulfilling life — regardless of who they are or where they come from.
                      </blockquote>
                    </div>

                    {/* Key facts grid */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {[
                        { label: "Registered under", value: "Societies Registration Act 1860" },
                        { label: "Nature",            value: "Non-Profit, Non-Political, NGO" },
                        { label: "Area of Operation", value: "Throughout Bangladesh & Abroad" },
                        { label: "Aligned with",      value: "UN SDG 2030 Goals" },
                      ].map((fact, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-4">
                          <p className="text-[#4db6ac] text-xs font-semibold uppercase tracking-wide mb-1">{fact.label}</p>
                          <p className="text-white text-sm">{fact.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Address */}
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <p className="text-gray-400 text-xs">Registered Office</p>
                      <p className="text-gray-300 text-sm mt-1">
                        1, Muktijoddha Road (Madrashatul Ma'arif), B Block, Sayeed Nagar, Vatara, Gulshan, Dhaka-1212
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll variant="right" className="order-1 md:order-2">
                <span className="text-[#4db6ac] font-medium tracking-wide text-sm">OUR PURPOSE</span>
                <h2 className="text-3xl font-bold text-[#3d3d3d] mt-2 mb-6">Our Mission & Vision</h2>

                <div className="mb-6 border-l-4 border-[#4db6ac] pl-4">
                  <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Mission</h3>
                  <p className="text-[#5a5a5a]">
                    To engage, promote, and advance charitable and social welfare activities among communities
                    and peoples of Bangladesh and other countries of the world, strictly on a Non-Profit basis —
                    through healthcare, education, skills development, research, and humanitarian relief.
                  </p>
                </div>

                <div className="mb-6 border-l-4 border-[#4db6ac] pl-4">
                  <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Vision</h3>
                  <p className="text-[#5a5a5a]">
                    A Bangladesh where every person — regardless of social, economic, or educational background —
                    has access to quality healthcare, education, economic opportunity, and a dignified life.
                  </p>
                </div>

                <div className="mb-6 border-l-4 border-[#4db6ac] pl-4">
                  <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Nature of Organization</h3>
                  <p className="text-[#5a5a5a]">
                    The Foundation is an independent, non-profitable, non-political, non-governmental, and
                    charitable organization, registered under the Societies Registration Act 1860 (Act XXI of
                    1860). Its area of operation covers the whole of Bangladesh, with the capacity to open
                    branch offices abroad as determined by the Board of Trustees.
                  </p>
                </div>

                <div className="border-l-4 border-[#4db6ac] pl-4">
                  <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Our Approach</h3>
                  <p className="text-[#5a5a5a]">
                    We combine grassroots community engagement with research-backed policy recommendations.
                    By working closely with government ministries, universities, private sector organizations,
                    and international development partners, we create initiatives that are both immediately
                    impactful and sustainable long-term — aligned with the UN SDG 2030 agenda.
                  </p>
                </div>
              </AnimateOnScroll>
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
