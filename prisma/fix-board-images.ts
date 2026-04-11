import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import "dotenv/config"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

function normalizeImage(image: string | null) {
  if (!image) return image
  return image
    .replace(/\\/g, "/")
    .replace(/^public\//, "/")
    .replace(/^(?!\/)(?!https?)/, "/")
}

async function main() {
  const members = await prisma.boardMember.findMany()
  for (const m of members) {
    const fixed = normalizeImage(m.image)
    if (fixed !== m.image) {
      await prisma.boardMember.update({ where: { id: m.id }, data: { image: fixed } })
      console.log(`Fixed: ${m.name} → ${fixed}`)
    }
  }
  console.log("Done!")
}

main().catch(console.error).finally(() => prisma.$disconnect())
