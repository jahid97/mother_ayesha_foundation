"use client"

import { useState } from "react"
import { Plus, Trash2, ArrowUp, ArrowDown, Type, Heading, AlignLeft } from "lucide-react"

function parseBlocks(value) {
  if (!value) return [{ type: "paragraph", text: "" }]
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed) && parsed.every((b) => b.type && "text" in b)) return parsed
  } catch {}
  // Legacy plain text — convert to paragraph blocks
  return value
    .split("\n\n")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((text) => ({ type: "paragraph", text }))
}

const BLOCK_TYPES = [
  { type: "paragraph",  label: "Paragraph", icon: AlignLeft,  style: "normal" },
  { type: "heading",    label: "Title",     icon: Heading,    style: "bold" },
  { type: "subheading", label: "Subtitle",  icon: Type,       style: "semibold" },
]

export default function BlockEditor({ value, onChange }) {
  const [blocks, setBlocks] = useState(() => parseBlocks(value))

  const commit = (next) => {
    setBlocks(next)
    onChange(JSON.stringify(next))
  }

  const addBlock = (type) => commit([...blocks, { type, text: "" }])

  const updateText = (idx, text) => {
    const next = [...blocks]
    next[idx] = { ...next[idx], text }
    commit(next)
  }

  const remove = (idx) => commit(blocks.filter((_, i) => i !== idx))

  const move = (idx, dir) => {
    const next = [...blocks]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    commit(next)
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, idx) => (
        <div key={idx} className="flex gap-2 group items-start">
          {/* Up/down */}
          <div className="flex flex-col gap-0.5 pt-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0}
              className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-20">
              <ArrowUp className="h-3 w-3" />
            </button>
            <button type="button" onClick={() => move(idx, 1)} disabled={idx === blocks.length - 1}
              className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-20">
              <ArrowDown className="h-3 w-3" />
            </button>
          </div>

          {/* Input */}
          <div className="flex-1">
            {block.type === "heading" ? (
              <input
                value={block.text}
                onChange={(e) => updateText(idx, e.target.value)}
                placeholder="Title…"
                className="w-full text-xl font-bold text-[#3d3d3d] border-0 border-b-2 border-gray-200 focus:border-[#4db6ac] focus:outline-none px-2 py-1.5 bg-transparent"
              />
            ) : block.type === "subheading" ? (
              <input
                value={block.text}
                onChange={(e) => updateText(idx, e.target.value)}
                placeholder="Subtitle…"
                className="w-full text-base font-semibold text-[#3d3d3d] border-0 border-b border-gray-200 focus:border-[#4db6ac] focus:outline-none px-2 py-1.5 bg-transparent"
              />
            ) : (
              <textarea
                value={block.text}
                onChange={(e) => updateText(idx, e.target.value)}
                placeholder="Write paragraph…"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#5a5a5a] focus:outline-none focus:ring-2 focus:ring-[#4db6ac]/40 focus:border-[#4db6ac] resize-y"
              />
            )}
            <span className="text-[10px] text-gray-300 ml-2 capitalize">{block.type}</span>
          </div>

          {/* Delete */}
          <button type="button" onClick={() => remove(idx)}
            className="mt-2 p-1.5 text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      {/* Add block row */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 mt-2">
        {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:border-[#4db6ac] hover:text-[#4db6ac] transition-colors"
          >
            <Icon className="h-3.5 w-3.5" />
            + {label}
          </button>
        ))}
      </div>
    </div>
  )
}
