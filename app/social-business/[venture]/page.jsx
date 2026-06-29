import { notFound } from "next/navigation"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import PageHero from "@/components/page-hero"
import AnimateOnScroll from "@/components/animate-on-scroll"
import VentureRing from "@/components/venture-ring"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Download, ExternalLink } from "lucide-react"
import { VENTURES, VENTURE_BY_DIR, CLUSTERS } from "@/lib/social-business-data"

export const dynamicParams = false

export function generateStaticParams() {
  return VENTURES.map((v) => ({ venture: v.dir }))
}

export async function generateMetadata({ params }) {
  const { venture } = await params
  const v = VENTURE_BY_DIR[venture]
  if (!v) return {}
  return {
    title: `${v.name} — ${v.tagline} | Mother Ayesha Foundation`,
    description: v.headline,
  }
}

// Turn "[n]" citation markers into clickable superscripts linking to the source.
function cite(text, smap) {
  const out = []
  const re = /\[(\d+)\]/g
  let last = 0, m, k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const url = smap[m[1]]
    out.push(
      url ? (
        <sup key={k++} className="text-[#4db6ac] font-bold text-[0.62em] align-super">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">{m[1]}</a>
        </sup>
      ) : null,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export default async function VenturePage({ params }) {
  const { venture } = await params
  const v = VENTURE_BY_DIR[venture]
  if (!v) notFound()

  const c = CLUSTERS[v.cluster]
  const smap = Object.fromEntries(v.sources.map((s) => [String(s.id), s.url]))
  const related = VENTURES.filter((x) => x.cluster === v.cluster && x.dir !== v.dir).slice(0, 3)
  const pdf = `/social-business/pdf/${v.dir}.pdf`
  const input = (v.ring[0]?.label || "raw material").toLowerCase()
  const SUPPORT = [
    { e: "🧰", t: "Equipped & trained", d: `The tools, inputs and hands-on training to start — turning ${input} into a working operation. No prior capital or expertise required.` },
    { e: "💳", t: "Funded, not indebted", d: "Pay-as-you-go, riba-free finance makes a poor person a funded operator — with no debt if a cycle fails. The network carries the downside, not the operator." },
    { e: "🤝", t: "Supervised & supported", d: "Ongoing follow-up and quality assurance — the factor peer-reviewed evidence shows decides whether ventures survive (p<0.001). The operator is never left alone." },
    { e: "📦", t: "Guaranteed buy-back", d: "We commit to purchase the output at a fair, pre-agreed price — so there is always a market. The operator just produces; we guarantee the offtake. This is what removes the fear of failure." },
    { e: "♻️", t: "Surplus recycles", d: "A thin margin funds the next operator — so help compounds and the network grows stronger with every person it lifts." },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <PageHero
          badge={c.label.toUpperCase()}
          title={`${v.emoji}  ${v.name}`}
          description={v.headline}
        />

        {/* Back link */}
        <div className="container mx-auto px-4 -mt-6 mb-2">
          <Link href="/social-business" className="inline-flex items-center gap-1.5 text-sm text-[#4db6ac] hover:underline">
            <ArrowLeft className="h-4 w-4" /> All social businesses
          </Link>
        </div>

        {/* The value loop (ring) */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <AnimateOnScroll variant="up" className="max-w-3xl mx-auto text-center mb-6">
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">THE VALUE LOOP</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-3">How {v.name} closes the loop</h2>
              <p className="text-[#5a5a5a] leading-relaxed">
                {v.ring.map((s, i) => (
                  <span key={i}>
                    <strong className="text-[#3d3d3d]">{s.label}</strong>{i < v.ring.length - 1 ? " → " : ""}
                  </span>
                ))}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll variant="up">
              <VentureRing name={v.name} emoji={v.emoji} stages={v.ring} accent={c.accent} />
            </AnimateOnScroll>
          </div>
        </section>

        {/* KPI stats bar */}
        {v.stats && v.stats.length > 0 && (
          <section className="pb-6">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {v.stats.map((s, i) => (
                  <AnimateOnScroll key={i} variant="up" delay={i * 60}>
                    <div className="bg-white rounded-lg border border-[#e3ddcd] p-5 text-center shadow-sm h-full">
                      <div className="text-2xl font-bold text-[#4db6ac]" dangerouslySetInnerHTML={{ __html: s.num }} />
                      <div className="text-xs text-[#5a5a5a] mt-1 leading-snug" dangerouslySetInnerHTML={{ __html: s.label }} />
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Problem · Solution · Model */}
        {(v.problem || v.solution || v.model) && (
          <section className="py-14 bg-white">
            <div className="container mx-auto px-4 max-w-3xl space-y-9">
              {v.problem && (
                <AnimateOnScroll variant="up">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-[#c0392b] mb-1.5">The problem</div>
                  <h3 className="text-xl font-bold text-[#3d3d3d] mb-2.5">{v.problem.head}</h3>
                  <p className="text-[#444] leading-[1.75]" dangerouslySetInnerHTML={{ __html: v.problem.body }} />
                </AnimateOnScroll>
              )}
              {v.solution && (
                <AnimateOnScroll variant="up">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-[#4db6ac] mb-1.5">Our solution</div>
                  <h3 className="text-xl font-bold text-[#3d3d3d] mb-2.5">{v.solution.head}</h3>
                  <p className="text-[#444] leading-[1.75]" dangerouslySetInnerHTML={{ __html: v.solution.body }} />
                </AnimateOnScroll>
              )}
              {v.model && (
                <AnimateOnScroll variant="up">
                  <div className="border-l-4 border-[#4db6ac] pl-5 bg-[#fcfbf7] py-4 rounded-r-lg">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-[#b9770e] mb-1.5">The model</div>
                    <h3 className="text-xl font-bold text-[#3d3d3d] mb-2.5">{v.model.head}</h3>
                    <p className="text-[#444] leading-[1.75]" dangerouslySetInnerHTML={{ __html: v.model.body }} />
                  </div>
                </AnimateOnScroll>
              )}
            </div>
          </section>
        )}

        {/* Research & evidence */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <AnimateOnScroll variant="up" className="text-center mb-10">
              <span className="inline-block bg-[#4db6ac]/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">RESEARCH &amp; EVIDENCE</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d]">{v.headline}</h2>
            </AnimateOnScroll>

            <AnimateOnScroll variant="up">
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                <div className="border border-[#e3ddcd] rounded-lg p-4 bg-[#fcfbf7]">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-[#0e7a45] mb-1.5">✓ Proven precedent</div>
                  <p className="text-sm text-[#3d3d3d] leading-snug">{v.proven}</p>
                </div>
                <div className="border border-[#e3ddcd] rounded-lg p-4 bg-[#fcfbf7]">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-[#4db6ac] mb-1.5">▲ Why it matters</div>
                  <p className="text-sm text-[#3d3d3d] leading-snug">{v.matters}</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="up">
              <h3 className="text-lg font-bold text-[#3d3d3d] mb-3">The situation in Bangladesh</h3>
              <p className="text-[#444] leading-[1.75] mb-8">{cite(v.situation, smap)}</p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="up">
              <h3 className="text-lg font-bold text-[#3d3d3d] mb-3">Our pitch</h3>
              <p className="text-[#444] leading-[1.75]">{cite(v.pitch, smap)}</p>
            </AnimateOnScroll>

            <div className="mt-10 flex flex-wrap gap-3">
              {v.app && (
                <a href={v.app.path}>
                  <Button className="bg-[#3d3d3d] hover:bg-[#2c2c2c] text-white gap-2">
                    <ExternalLink className="h-4 w-4" /> {v.app.label}
                  </Button>
                </a>
              )}
              <a href={pdf} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white gap-2">
                  <Download className="h-4 w-4" /> Download the one-page brief (PDF)
                </Button>
              </a>
              <Link href="/donate">
                <Button variant="outline" className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white">
                  Support this venture
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The HelperChain promise — built so the operator never fails */}
        <section className="py-16 bg-[#3d3d3d] text-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <AnimateOnScroll variant="up" className="text-center mb-8">
              <span className="inline-block bg-white/10 px-4 py-1 rounded-full text-[#4db6ac] font-medium text-sm mb-4">THE HELPERCHAIN PROMISE</span>
              <h2 className="text-3xl font-bold mb-3">Built so the operator never fails</h2>
              <p className="text-gray-300 leading-relaxed">
                HelperChain doesn&apos;t hand out a loan and walk away. Every operator gets the full rail — inputs, training,
                finance, supervision, and a <strong className="text-white">guaranteed buy-back</strong> of what they produce.
                We carry the risk so an ordinary person can succeed.
              </p>
            </AnimateOnScroll>
            <div className="space-y-4 mb-8">
              {SUPPORT.map((s, i) => (
                <AnimateOnScroll key={i} variant="up" delay={i * 50}>
                  <div className="flex gap-4 bg-white/5 rounded-lg p-4">
                    <div className="text-2xl shrink-0 leading-none">{s.e}</div>
                    <div>
                      <div className="font-bold">{s.t}</div>
                      <p className="text-gray-300 text-sm leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <div className="bg-[#4db6ac] text-white rounded-lg p-5 text-center font-medium leading-relaxed">
              The promise: we give the operator everything needed to succeed — and we buy back the output at a fair,
              pre-agreed price. Inputs in, output bought back, risk carried by the network — so they never fail alone.
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <h3 className="text-sm font-bold text-[#4db6ac] uppercase tracking-wider mb-5">Sources ({v.sources.length})</h3>
            <ol className="space-y-3">
              {v.sources.map((s) => (
                <li key={s.id} className="text-[13px] text-[#5a5a5a] leading-relaxed flex gap-2">
                  <span className="font-bold text-[#3d3d3d] shrink-0">{s.id}.</span>
                  <span>
                    {s.cite}{" "}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#4db6ac] font-medium hover:underline whitespace-nowrap inline-flex items-center gap-0.5">
                      link <ExternalLink className="h-3 w-3" />
                    </a>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Related ventures */}
        {related.length > 0 && (
          <section className="py-14 bg-[#3d3d3d] text-white">
            <div className="container mx-auto px-4">
              <h3 className="text-center text-2xl font-bold mb-8">More in {c.label}</h3>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {related.map((r) => (
                  <Link key={r.dir} href={`/social-business/${r.dir}`} className="group block bg-white/5 hover:bg-white/10 rounded-lg p-6 transition-colors">
                    <div className="w-12 h-12 bg-[#4db6ac]/20 rounded-full flex items-center justify-center text-2xl mb-3">{r.emoji}</div>
                    <h4 className="font-bold flex items-center gap-2">{r.name}<ArrowRight className="h-4 w-4 text-[#4db6ac] opacity-0 group-hover:opacity-100 transition-opacity" /></h4>
                    <p className="text-[#4db6ac] text-xs font-medium mt-1">{r.tagline}</p>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/social-business">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-[#3d3d3d]">
                    See all 14 ventures
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
