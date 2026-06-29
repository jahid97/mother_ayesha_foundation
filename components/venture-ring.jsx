// Parametric animated value-loop ring, foundation-themed. Renders a venture's
// stages (emoji + label) around a circle with a flowing dashed ring and an
// orbiting particle. All CSS scoped under .vring so nothing leaks site-wide.

function wrapLabel(label) {
  if (label.length <= 15 || !label.includes(" ")) return [label]
  const words = label.split(" ")
  let a = "", b = ""
  for (const w of words) {
    if (a.length <= label.length / 2 - 1) a += (a ? " " : "") + w
    else b += (b ? " " : "") + w
  }
  return b ? [a, b] : [a]
}

export default function VentureRing({ name, emoji, stages, accent = "#4db6ac" }) {
  const cx = 230, cy = 235, R = 150, nr = 27
  const N = stages.length
  const circlePath = `M${cx},${cy - R} a${R},${R} 0 1,1 0,${2 * R} a${R},${R} 0 1,1 0,${-2 * R}`

  const nodes = stages.map((s, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N
    const nx = cx + R * Math.cos(ang)
    const ny = cy + R * Math.sin(ang)
    const lr = R + 40
    const lx = cx + lr * Math.cos(ang)
    const ly = cy + lr * Math.sin(ang)
    const anchor = Math.abs(Math.cos(ang)) < 0.34 ? "middle" : Math.cos(ang) > 0 ? "start" : "end"
    return { ...s, i, nx, ny, lx, ly, anchor, lines: wrapLabel(s.label) }
  })

  const STYLE = `
.vring{--vr-accent:${accent};}
.vring svg{display:block;width:100%;max-width:560px;height:auto;margin:6px auto 0;overflow:visible;}
.vring .vr-spin{transform-box:fill-box;transform-origin:center;animation:vrspin 90s linear infinite;}
@keyframes vrspin{to{transform:rotate(360deg);}}
.vring .vr-flow{stroke-dasharray:14 13;animation:vrflow 1.25s linear infinite;}
@keyframes vrflow{to{stroke-dashoffset:-27;}}
.vring .vr-orb{filter:drop-shadow(0 0 5px var(--vr-accent));}
.vring .vr-node circle{fill:#fff;stroke:var(--vr-accent);stroke-width:2.4;filter:drop-shadow(0 3px 8px rgba(45,140,130,.18));}
.vring .vr-node{transform-box:fill-box;transform-origin:center;animation:vrpulse 3s ease-in-out infinite;}
@keyframes vrpulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.vring .vr-ne{font-size:23px;text-anchor:middle;dominant-baseline:central;}
.vring .vr-nl{font-size:10.5px;font-weight:700;fill:#3d3d3d;}
.vring .vr-cc{fill:#fff;stroke:var(--vr-accent);stroke-width:2.6;filter:drop-shadow(0 6px 16px rgba(45,140,130,.2));}
.vring .vr-ce{font-size:30px;text-anchor:middle;dominant-baseline:central;}
.vring .vr-cn{font-size:13px;font-weight:800;fill:#3d3d3d;text-anchor:middle;}
.vring .vr-step{font-size:10px;font-weight:800;fill:var(--vr-accent);text-anchor:middle;dominant-baseline:central;}
@media(prefers-reduced-motion:reduce){.vring .vr-spin,.vring .vr-flow,.vring .vr-node,.vring .vr-orb{animation:none!important;}}`

  return (
    <div className="vring">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <svg viewBox="0 0 460 470" role="img" aria-label={`${name} value loop`}>
        <defs>
          <path id="vrpath" d={circlePath} fill="none" />
        </defs>
        {/* decorative rotating dotted ring */}
        <circle className="vr-spin" cx={cx} cy={cy} r={R + 18} fill="none" stroke="#d8cfc0" strokeWidth="1.4" strokeDasharray="2 9" />
        {/* base + flowing accent ring */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={accent} strokeWidth="5" opacity=".22" />
        <circle className="vr-flow" cx={cx} cy={cy} r={R} fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        {/* orbiting particle showing flow direction */}
        <circle className="vr-orb" r="6" fill={accent}>
          <animateMotion dur={`${Math.max(8, N * 1.7)}s`} repeatCount="indefinite" rotate="auto">
            <mpath href="#vrpath" />
          </animateMotion>
        </circle>
        {/* center */}
        <circle className="vr-cc" cx={cx} cy={cy} r="62" />
        <text className="vr-ce" x={cx} y={cy - 12}>{emoji}</text>
        <text className="vr-cn" x={cx} y={cy + 22}>{name}</text>
        {/* nodes */}
        {nodes.map((nd) => (
          <g key={nd.i}>
            <g className="vr-node" style={{ animationDelay: `${-nd.i * 0.4}s` }}>
              <circle cx={nd.nx} cy={nd.ny} r={nr} />
              <text className="vr-ne" x={nd.nx} y={nd.ny}>{nd.e}</text>
            </g>
            <text className="vr-step" x={nd.nx} y={nd.ny} dy="-0.05em" style={{ display: "none" }}>{nd.i + 1}</text>
            <text className="vr-nl" x={nd.lx} y={nd.ly} textAnchor={nd.anchor} dominantBaseline="central">
              {nd.lines.length === 1 ? (
                nd.lines[0]
              ) : (
                nd.lines.map((ln, k) => (
                  <tspan key={k} x={nd.lx} dy={k === 0 ? "-0.55em" : "1.1em"}>{ln}</tspan>
                ))
              )}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
