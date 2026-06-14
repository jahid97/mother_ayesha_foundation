import { neon } from "@neondatabase/serverless"
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

// Load .env manually
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, "../.env")
try {
  const env = readFileSync(envPath, "utf8")
  for (const line of env.split("\n")) {
    const [key, ...rest] = line.split("=")
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim().replace(/^"|"$/g, "")
  }
} catch {}

const sql = neon(process.env.DATABASE_URL)

const slides = [
  {
    type: "charity_project",
    src: "/placeholder.svg?height=700&width=1920&text=Children+Smiling",
    alt: "Children smiling and showing artwork",
    title: "Building a Better Bangladesh Through Compassion",
    subtitle: "Mother Ayesha Foundation is dedicated to healthcare, education, research, skills development, and social welfare for underprivileged communities across Bangladesh.",
    order: 0,
  },
  {
    type: "charity_project",
    src: "/placeholder.svg?height=700&width=1920&text=Education+Programs",
    alt: "Children in education programs",
    title: "Empowering Communities Through Education & Skills",
    subtitle: "From scholarships and TVET institutes to financial literacy — we equip people with the tools to build self-sufficient, dignified lives.",
    order: 1,
  },
  {
    type: "charity_project",
    src: "/placeholder.svg?height=700&width=1920&text=Healthcare",
    alt: "Healthcare programs",
    title: "Quality Healthcare for Every Community",
    subtitle: "We establish clinics, hospitals, eye care facilities, and elderly care programs to serve those most in need across Bangladesh.",
    order: 2,
  },
  {
    type: "charity_project",
    src: "/placeholder.svg?height=700&width=1920&text=Research",
    alt: "Research and development",
    title: "Research-Driven Solutions for Sustainable Development",
    subtitle: "We connect academia, industry, and government to drive evidence-based policy change aligned with UN SDG 2030 goals.",
    order: 3,
  },
]

const existing = await sql`SELECT COUNT(*) as count FROM "HeroSlide"`
if (parseInt(existing[0].count) > 0) {
  console.log(`Skipped — ${existing[0].count} slides already in DB.`)
  process.exit(0)
}

for (const s of slides) {
  await sql`
    INSERT INTO "HeroSlide" (id, type, src, alt, title, subtitle, "order", active, "createdAt", "updatedAt")
    VALUES (
      gen_random_uuid()::text,
      ${s.type}, ${s.src}, ${s.alt}, ${s.title}, ${s.subtitle},
      ${s.order}, true, now(), now()
    )
  `
}

console.log(`Inserted ${slides.length} hero slides.`)
