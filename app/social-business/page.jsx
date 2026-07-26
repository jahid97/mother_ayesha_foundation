import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import PageHero from "@/components/page-hero"
import AnimateOnScroll from "@/components/animate-on-scroll"
import SocialBusinessDiagrams from "@/components/social-business-diagrams"
import AiPsychBubble from "@/components/ai-psych-bubble"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Bug, Flame, Recycle, Leaf, Shirt, ShieldCheck, BatteryCharging,
  Landmark, ShoppingBasket, Sprout, Palette, HeartHandshake, Stethoscope,
  LifeBuoy, ArrowRight, Network, HandCoins, Repeat,
} from "lucide-react"

export const metadata = {
  title: "Entrepreneurship & Social Business — Mother Ayesha Foundation",
  description:
    "HelperChain is the Foundation's social-business studio: one shared operator-network and one credit engine powering fourteen self-sustaining ventures across Bangladesh.",
}

// Each venture is served from /public/social-business/<dir>/index.html (migrated landing sites).
// FarmHalal has no static page yet → links to its live app.
const CLUSTERS = {
  waste:  { label: "Waste → Value",      color: "text-[#0e7a45]", bg: "bg-[#e8f5e9]", border: "border-[#4caf50]" },
  lead:   { label: "Lead-safe",          color: "text-[#c0392b]", bg: "bg-[#fde9e9]", border: "border-[#e74c3c]" },
  agri:   { label: "Agri value-chain",   color: "text-[#b9770e]", bg: "bg-[#f8e8c6]", border: "border-[#e6a23c]" },
  health: { label: "Community health",   color: "text-[#2471a3]", bg: "bg-[#d1f0f6]", border: "border-[#3498db]" },
  good:   { label: "Public good",        color: "text-[#7d3c98]", bg: "bg-[#f3e8fd]", border: "border-[#9c27b0]" },
}

const VENTURES = [
  { name: "FeedLoop",         dir: "feedloop",    icon: Bug,             cluster: "waste",  tag: "Protein from waste",   blurb: "Black-soldier-fly larvae turn farm and market waste into high-protein animal feed — cutting import-dependent fishmeal and soy." },
  { name: "CleanLoop Biogas", dir: "cleanloop",   icon: Flame,           cluster: "waste",  tag: "Sanitation → energy",  blurb: "Household and community digesters convert sanitation and organic waste into clean cooking gas and fertiliser." },
  { name: "CleanCredit",      dir: "cleancredit", icon: Recycle,         cluster: "waste",  tag: "Plastic credits",      blurb: "Last-mile collection turns recovered ocean-bound plastic into verified, sellable plastic credits." },
  { name: "CharLoop",         dir: "charloop",    icon: Leaf,            cluster: "waste",  tag: "Husk → biochar",       blurb: "Rice-husk pyrolysis makes biochar and clean energy — an answer to idle factories starved of gas." },
  { name: "FiberLoop",        dir: "fiberloop",   icon: Shirt,           cluster: "agri",   tag: "Natural-fibre care",   blurb: "Banana and water-hyacinth fibre become affordable, biodegradable sanitary pads and textiles." },
  { name: "LeadSafe",         dir: "leadsafe",    icon: ShieldCheck,     cluster: "lead",   tag: "Lead detection",       blurb: "Low-cost screening and trusted testing to find and remove lead from turmeric, cookware and toys." },
  { name: "ShaktiLoop",       dir: "shaktiloop",  icon: BatteryCharging, cluster: "lead",   tag: "Battery recycling",    blurb: "Safe, formal recycling of e-rickshaw lead-acid batteries — closing a major source of lead poisoning." },
  { name: "FarmHalal",        dir: "farmhalal",   icon: Landmark,        cluster: "agri",   tag: "Interest-free finance", blurb: "Riba-free farm finance and inputs for landless and smallholder households." },
  { name: "FosholHub",        dir: "fosholhub",   icon: ShoppingBasket,  cluster: "agri",   tag: "Farmer marketplace",   blurb: "Aggregation and direct-to-buyer marketplace so farmers keep more of the price and lose less to spoilage." },
  { name: "MycoGrow",         dir: "mycogrow",    icon: Sprout,          cluster: "agri",   tag: "Mushroom livelihoods", blurb: "Spawn, training and finance for mushroom growers — a fast, high-protein income for women and youth." },
  { name: "Hyacraft",         dir: "hyacraft",    icon: Palette,         cluster: "agri",   tag: "Hyacinth handicraft",  blurb: "An invasive weed becomes an export handicraft sector employing rural women." },
  { name: "AI Psychologist",  dir: "shetu",       icon: HeartHandshake,  cluster: "health", tag: "Mental-health companion", blurb: "A warm, private AI companion plus trained listeners — bridging a vast untreated mental-health gap." },
  { name: "Nirog",            dir: "nirog",       icon: Stethoscope,     cluster: "health", tag: "Community health",     blurb: "Community health workers managing non-communicable diseases at the doorstep, at a few dollars a year." },
  { name: "Kinara",           dir: "kinara",      icon: LifeBuoy,        cluster: "good",   tag: "Drowning prevention",  blurb: "Community crèches that keep toddlers safe — drowning is the number-one killer of 1–4-year-olds." },
]

const PILLARS = [
  { icon: Network,   title: "One operator-network", desc: "We recruit, train, equip and supervise local micro-entrepreneurs once — and every venture plugs into the same last-mile network." },
  { icon: HandCoins, title: "One credit engine",    desc: "Pay-as-you-go, riba-free finance turns a poor person into a funded operator with no debt-on-failure — and the surplus recycles into the next." },
  { icon: Repeat,    title: "Surplus that recycles", desc: "One region's waste is another venture's raw material; one venture's surplus funds the next operator. Help that funds itself." },
]

function ventureHref(v) {
  return v.external || `/social-business/${v.dir}`
}

export default function SocialBusinessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <PageHero
          badge="OUR INITIATIVES"
          title="Entrepreneurship & Social Business"
          description="Through HelperChain — the Foundation's social-business studio — we turn waste, weeds and untapped talent into self-sustaining livelihoods across Bangladesh."
          bg="https://rl3kyn14rkmjz9kb.public.blob.vercel-storage.com/site/ayesha-hero-calm-1782741721653.png"
        />

        {/* ─── What is HelperChain ─── */}
        <section className="py-4 pb-16">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                THE MODEL
              </span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">We build one rail. Fourteen ventures ride it.</h2>
              <p className="text-[#5a5a5a] leading-relaxed">
                Charity that ends when the funding ends is not enough. HelperChain is the Foundation's answer:
                a <strong className="text-[#3d3d3d]">social-business studio</strong> built on one shared operator-network and one
                credit engine. Instead of fourteen separate charities, we build the rail once — and each venture plugs in,
                creating <strong className="text-[#3d3d3d]">dignified, self-sustaining livelihoods</strong> that outlast any grant.
              </p>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              {PILLARS.map((p, i) => (
                <AnimateOnScroll key={p.title} variant="up" delay={i * 80}>
                  <div className="bg-white rounded-lg p-6 shadow-md h-full border-t-4 border-[#4db6ac]">
                    <div className="w-14 h-14 bg-[#4db6ac]/15 rounded-full flex items-center justify-center mb-4">
                      <p.icon className="h-7 w-7 text-[#4db6ac]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#3d3d3d] mb-2">{p.title}</h3>
                    <p className="text-[#5a5a5a] text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ─── The animated diagrams (circular engine + living system) ─── */}
        <SocialBusinessDiagrams />

        {/* ─── The ventures ─── */}
        <section className="py-16 bg-[#3d3d3d] text-white">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="text-center mb-12">
              <span className="inline-block bg-white/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">
                THE VENTURES
              </span>
              <h2 className="text-3xl font-bold mb-4">Fourteen social businesses, one network</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Each venture tackles a real Bangladeshi problem and stands on a proven, evidence-backed model.
                Explore any one to see the situation, our solution and the research behind it.
              </p>
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VENTURES.map((v, i) => {
                const c = CLUSTERS[v.cluster]
                return (
                  <AnimateOnScroll key={v.name} variant="up" delay={(i % 3) * 60}>
                    <a
                      href={ventureHref(v)}
                      target={v.external ? "_blank" : undefined}
                      rel={v.external ? "noopener noreferrer" : undefined}
                      className="group block h-full bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-[#4db6ac]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <v.icon className="h-7 w-7 text-[#4db6ac]" />
                        </div>
                        <span className={`text-xs font-semibold ${c.color} ${c.bg} px-2 py-1 rounded-full`}>
                          {c.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                        {v.name}
                        <ArrowRight className="h-4 w-4 text-[#4db6ac] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="text-[#4db6ac] text-xs font-medium mb-2">{v.tag}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{v.blurb}</p>
                    </a>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Full system CTA ─── */}
        <section className="py-16 bg-[#faf6ed]">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">See the whole system</h2>
              <p className="text-[#5a5a5a] leading-relaxed mb-8">
                The full HelperChain map shows how the ventures share feedstock and operators, the evidence base behind
                each one, and the plan to prove the rail once — starting with FeedLoop — and let the network compound.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="/social-business/hub/index.html">
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">
                    Explore the full HelperChain system
                  </Button>
                </a>
                <Link href="/donate">
                  <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
                    Support this work
                  </Button>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
      <AiPsychBubble />
    </div>
  )
}
