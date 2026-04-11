import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import "dotenv/config"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const members = [
  { name: "Dr. Rafiqul Bhuyan", role: "Chairman", bio: "Fulbright Scholar. Professor at Independent University, Bangladesh. PhD in Economics, Concordia University Montreal. MS in Finance, University of Illinois. Author of 80+ peer-reviewed research papers. Former faculty at Le Moyne College (NY), California State University, UC Riverside, Northeastern, USC, UC Davis, and American University of Kuwait.", order: 0 },
  { name: "Md. Mizanur Rahman", role: "Secretary", bio: "Islamic Scholar and Teacher. Based in Gulshan, Dhaka.", order: 1 },
  { name: "Abdul Muqit", role: "Treasurer", bio: "Teacher. East Rampura, Dhaka.", order: 2 },
  { name: "Md. Joynal Abdin", role: "Member", bio: "Founder & CEO of Trade & Investment Bangladesh (T&IB) and Secretary General, Brazil Bangladesh Chamber of Commerce & Industry (BBCCI).", order: 3 },
  { name: "Md. Hakim Bhuiyan", role: "Member", bio: "Serviceholder. Dhaka.", order: 4 },
  { name: "A Q M Abdullah Al Monsur", role: "Member", bio: "Brand Manager, Golden Harvest. Dhaka.", order: 5 },
  { name: "Nazrul Islam", role: "Member", bio: "Teacher. Uttara, Dhaka.", order: 6 },
  { name: "Md. Saiful Hassan", role: "Member", bio: "Dhaka.", order: 7 },
  { name: "Mohammad Sogir Hossain Khandoker", role: "Member", bio: "Dhaka.", order: 8 },
  { name: "Md. Anwar Hossain", role: "Member", bio: "Dhaka.", order: 9 },
  { name: "Ananno Raihan Chowdhury", role: "Member", bio: "Dhaka.", order: 10 },
]

async function main() {
  for (const m of members) {
    await prisma.boardMember.create({ data: m })
    console.log("Created:", m.name)
  }
  console.log("Done!")
}

main().catch(console.error).finally(() => prisma.$disconnect())
