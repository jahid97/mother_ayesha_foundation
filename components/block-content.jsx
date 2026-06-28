export default function BlockContent({ content, className = "" }) {
  if (!content) return null

  // Try to parse as block JSON
  let blocks = null
  try {
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed) && parsed.every((b) => b.type && "text" in b)) {
      blocks = parsed
    }
  } catch {}

  if (blocks) {
    return (
      <div className={className}>
        {blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h2 key={i} className="text-2xl font-bold text-[#3d3d3d] mt-8 mb-3 first:mt-0">
                {block.text}
              </h2>
            )
          }
          if (block.type === "subheading") {
            return (
              <h3 key={i} className="text-lg font-semibold text-[#3d3d3d] mt-6 mb-2">
                {block.text}
              </h3>
            )
          }
          return block.text ? (
            <p key={i} className="text-[#5a5a5a] leading-relaxed mb-4">
              {block.text}
            </p>
          ) : null
        })}
      </div>
    )
  }

  // Legacy: plain text split by double newline
  const paragraphs = content.split("\n\n").map((t) => t.trim()).filter(Boolean)
  if (paragraphs.length > 1) {
    return (
      <div className={className}>
        {paragraphs.map((para, i) => (
          <p key={i} className="text-[#5a5a5a] leading-relaxed mb-4">
            {para}
          </p>
        ))}
      </div>
    )
  }

  // Legacy: single block or HTML — render as-is
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:text-[#3d3d3d] prose-p:text-[#5a5a5a] prose-a:text-[#4db6ac] ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
