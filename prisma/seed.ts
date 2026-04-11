import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import bcrypt from "bcryptjs"
import "dotenv/config"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database...")

  // ─── Admin User ────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@1234", 12)
  await prisma.user.upsert({
    where: { email: "admin@motheraysha.org" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@motheraysha.org",
      password: adminPassword,
      role: "admin",
    },
  })
  console.log("✅ Admin user: admin@motheraysha.org / Admin@1234")

  // ─── Projects ──────────────────────────────────────────────────────────────
  await prisma.project.deleteMany()

  await prisma.project.createMany({
    data: [
      {
        id: "community-health-clinics",
        title: "Community Health Clinics",
        category: "Healthcare",
        status: "Ongoing",
        location: "Dhaka & Surrounding Districts, Bangladesh",
        startDate: "Jan 2024",
        endDate: "Dec 2025",
        targetAmount: "BDT 50,00,000",
        raisedAmount: "BDT 32,00,000",
        progress: 64,
        image: "/placeholder.svg?height=300&width=400&text=Community+Health+Clinics",
        description: "Establishing community health clinics offering primary care, maternal & child health services, and preventive healthcare to underserved neighborhoods in Dhaka.",
        longDescription: "This initiative establishes community health clinics in underserved neighborhoods of Dhaka and surrounding districts. Staffed by qualified doctors and paramedics, the clinics offer primary care, maternal and child health services, vaccinations, and health education at no or minimal cost to patients.",
        goals: ["Open 5 clinics across Dhaka districts", "Serve 10,000+ patients annually", "Provide free maternal health services", "Train 50 community health workers"],
        challenges: ["Funding sustainability", "Staffing qualified medical personnel", "Community awareness"],
        achievements: ["3 clinics operational", "6,500 patients served", "25 health workers trained"],
        featured: true,
      },
      {
        id: "tvet-skills-institute",
        title: "TVET Skills Development Institute",
        category: "Education & Skills",
        status: "Ongoing",
        location: "Gulshan, Dhaka, Bangladesh",
        startDate: "Mar 2023",
        endDate: "Ongoing",
        targetAmount: "BDT 75,00,000",
        raisedAmount: "BDT 48,00,000",
        progress: 64,
        image: "/placeholder.svg?height=300&width=400&text=TVET+Institute",
        description: "Operating a vocational training center providing practical skills in trades, technology, and business to equip underprivileged youth for employment and entrepreneurship.",
        longDescription: "Our TVET Skills Development Institute goes beyond basic vocational training. We provide twelve-month competency-based courses, soft skills training, entrepreneurship modules, and job placement support through partnerships with local and national employers.",
        goals: ["Train 500+ youth annually", "Achieve 80%+ job placement rate", "Partner with 20+ local businesses", "Expand to 3 additional districts by 2026"],
        challenges: ["Identifying motivated candidates", "Industry partnership development", "Infrastructure costs"],
        achievements: ["350+ graduates trained", "75% job placement rate", "15 business partnerships established"],
        featured: true,
      },
      {
        id: "eye-care-program",
        title: "Eye Care & Cataract Program",
        category: "Healthcare",
        status: "Ongoing",
        location: "Rural Districts, Bangladesh",
        startDate: "Jun 2023",
        endDate: "Dec 2024",
        targetAmount: "BDT 40,00,000",
        raisedAmount: "BDT 18,00,000",
        progress: 45,
        image: "/placeholder.svg?height=300&width=400&text=Eye+Care+Program",
        description: "Providing free eye screenings, cataract surgeries, and vision correction for patients who cannot afford private healthcare in rural Bangladesh.",
        longDescription: "Our mobile eye care units screen patients in remote areas, and qualified surgeons perform free cataract operations through our partner hospital network. To date, we have restored or preserved vision for over 800 patients.",
        goals: ["Screen 5,000 patients", "Perform 1,000 surgeries", "Establish 3 eye care centres", "Train 20 local optometrists"],
        challenges: ["Remote area access", "Equipment costs", "Follow-up care logistics"],
        achievements: ["800+ patients treated", "Mobile units deployed to 8 districts", "3 partner hospitals engaged"],
        featured: true,
      },
      {
        id: "scholarship-program",
        title: "Higher Education Scholarship Program",
        category: "Education",
        status: "Ongoing",
        location: "Nationwide, Bangladesh",
        startDate: "Jan 2023",
        endDate: "Ongoing",
        targetAmount: "BDT 60,00,000",
        raisedAmount: "BDT 44,00,000",
        progress: 73,
        image: "/placeholder.svg?height=300&width=400&text=Scholarship+Program",
        description: "Providing stipends, scholarships, and fellowships to outstanding students from underprivileged backgrounds for higher studies in Bangladesh and abroad.",
        longDescription: "This program supports academically talented students who lack financial resources to pursue higher education. We provide full and partial scholarships, monthly stipends, and mentorship connections to help scholars succeed.",
        goals: ["Award 100 new scholarships annually", "Expand to fellowship programs abroad", "Build alumni mentor network"],
        challenges: ["Identifying deserving candidates", "Long-term funding sustainability", "Post-graduation monitoring"],
        achievements: ["200+ scholarships awarded", "90% graduation rate among recipients", "Partnerships with 5 universities"],
        featured: false,
      },
      {
        id: "financial-literacy",
        title: "Financial Literacy for Rural Communities",
        category: "Economic Empowerment",
        status: "Ongoing",
        location: "Rural Districts, Bangladesh",
        startDate: "Apr 2023",
        endDate: "Mar 2025",
        targetAmount: "BDT 25,00,000",
        raisedAmount: "BDT 18,00,000",
        progress: 72,
        image: "/placeholder.svg?height=300&width=400&text=Financial+Literacy",
        description: "Educating rural communities about banking, savings, financial planning, and entrepreneurship to reduce dependence on informal lenders and improve household wealth.",
        longDescription: "Many rural Bangladeshis distrust formal financial institutions, relying instead on costly informal credit. This program teaches financial literacy, helps people open bank accounts, and connects entrepreneurs with micro-financing opportunities.",
        goals: ["Reach 20,000 rural households", "Establish 10 community finance groups", "Reduce informal borrowing by 40%"],
        challenges: ["Distrust of banking systems", "Low literacy rates", "Remote community access"],
        achievements: ["5,000+ people trained", "2,000+ new bank accounts opened", "300+ micro-entrepreneurs supported"],
        featured: false,
      },
      {
        id: "elderly-care-home",
        title: "Elderly Care Home Program",
        category: "Social Welfare",
        status: "Upcoming",
        location: "Dhaka, Bangladesh",
        startDate: "Jan 2025",
        endDate: "Dec 2026",
        targetAmount: "BDT 1,20,00,000",
        raisedAmount: "BDT 22,00,000",
        progress: 18,
        image: "/placeholder.svg?height=300&width=400&text=Elderly+Care",
        description: "Establishing a residential care home providing dignified accommodation, healthcare, and companionship to elderly individuals without family support.",
        longDescription: "Bangladesh's elderly population increasingly faces social isolation and inadequate care. This program establishes a residential facility with trained caregivers, regular medical check-ups, recreational activities, and a compassionate living environment.",
        goals: ["Accommodate 50 elderly residents initially", "Provide 24/7 medical and personal care", "Expand to second facility by 2028"],
        challenges: ["High facility costs", "Trained caregiver shortage", "Social awareness"],
        achievements: ["Land secured", "Initial architectural plans approved", "Partnership with healthcare provider signed"],
        featured: false,
      },
    ],
  })

  console.log("✅ Projects seeded")

  // ─── Blog Posts ────────────────────────────────────────────────────────────
  await prisma.blogPost.deleteMany()

  await prisma.blogPost.createMany({
    data: [
      {
        slug: "why-tvet-matters-bangladesh",
        title: "Why TVET Education is Key to Bangladesh's Future",
        description: "Technical and vocational education is one of the most powerful tools for reducing unemployment and poverty in Bangladesh. Here's why we've made it a cornerstone of our work.",
        content: `<p>Bangladesh has one of the youngest populations in South Asia, with over 30 million young people between the ages of 15 and 29.</p><h2>The Skills Gap Problem</h2><p>Despite strong GDP growth, Bangladesh faces a persistent mismatch between the skills the labor market demands and those young people possess. Many graduates find themselves unable to secure employment not because jobs don't exist, but because they lack practical technical skills.</p><h2>TVET as a Solution</h2><p>Technical and Vocational Education and Training (TVET) offers a direct bridge. Unlike traditional academic curricula, TVET focuses on practical, job-ready skills: carpentry, electrical work, IT, garment production, healthcare assistance, and more.</p><h2>Our TVET Institute</h2><p>At Mother Ayesha Foundation, our Skills Development & TVET Institute provides twelve-month competency-based courses in high-demand trades, soft skills training, entrepreneurship modules, and job placement support through partnerships with local and national employers.</p>`,
        author: "Dr. Amina Rahman",
        date: "February 14, 2025",
        category: "Education & Skills",
        image: "/placeholder.svg?height=600&width=800&text=TVET+Education",
        featured: true,
      },
      {
        slug: "healthcare-access-rural-bangladesh",
        title: "Bridging the Healthcare Gap in Rural Bangladesh",
        description: "Millions of Bangladeshis in rural and peri-urban areas lack access to basic healthcare. We look at the challenges, our approach, and the impact we've seen so far.",
        content: `<p>Access to quality healthcare is a fundamental human right — yet in rural Bangladesh, this right remains out of reach for tens of millions of people.</p><h2>The Scale of the Problem</h2><p>While Bangladesh has made remarkable strides in life expectancy and child mortality over the past three decades, significant disparities remain between urban and rural populations.</p><h2>Our Healthcare Programs</h2><p>We establish and operate community clinics staffed by qualified doctors and paramedics, offering primary care, maternal health services, vaccinations, and health education at no or minimal cost to patients.</p>`,
        author: "Dr. Tariq Hossain",
        date: "November 8, 2024",
        category: "Healthcare",
        image: "/placeholder.svg?height=600&width=800&text=Healthcare+Access",
        featured: true,
      },
      {
        slug: "research-policy-bangladesh-development",
        title: "How Research Can Drive Real Change in Bangladesh",
        description: "Evidence-based policy is the foundation of sustainable development. Discover how Mother Ayesha Foundation's research programs are influencing change.",
        content: `<p>Bangladesh has achieved remarkable development progress in recent decades — poverty reduction, female education enrollment, and export-led growth are genuine success stories. But significant structural challenges remain.</p><h2>Why Research Matters</h2><p>Too often, well-meaning development programs fail not because of lack of resources, but because they are not grounded in a clear understanding of the problem they are trying to solve.</p><h2>Our Research Approach</h2><p>Our research division focuses on social, financial, and economic issues that directly affect underprivileged communities in Bangladesh. We bridge academia, industry, and government to turn research into policy and policy into impact.</p>`,
        author: "Dr. Rafiqul Bhuyan",
        date: "September 3, 2024",
        category: "Research & Policy",
        image: "/placeholder.svg?height=600&width=800&text=Research+Policy",
        featured: true,
      },
    ],
  })

  console.log("✅ Blog posts seeded")

  // ─── Stories ───────────────────────────────────────────────────────────────
  await prisma.story.deleteMany()

  await prisma.story.createMany({
    data: [
      {
        slug: "farida-vocational-training",
        title: "From Dropout to Business Owner: Farida's Story",
        excerpt: "How a young woman from Dhaka's underprivileged neighborhoods used our TVET program to build her own tailoring business and support her family.",
        content: `<p>Farida grew up in a cramped single room in a slum settlement on the outskirts of Dhaka. At 14, she dropped out of school when her family could no longer afford the fees.</p><p>When Mother Ayesha Foundation opened its TVET Skills Development Institute near her neighborhood, Farida enrolled in the tailoring and garment design program.</p><p>"I had never believed I could learn a proper skill," Farida recalls. "I thought that kind of training was for people who already had something. But they welcomed me with nothing."</p><p>Today, Farida runs a small tailoring shop from her home, employing two neighbors and earning three times her previous income.</p>`,
        author: "Nadia Rahman",
        date: "August 12, 2024",
        category: "Skills Development",
        image: "/placeholder.svg?height=400&width=600&text=Farida's+Story",
        featured: true,
      },
      {
        slug: "eyecare-rural-bangladesh",
        title: "Seeing Clearly: How Free Eye Surgery Changed a Farmer's Life",
        excerpt: "Karim, a 58-year-old farmer from Mymensingh, regained his sight through Mother Ayesha Foundation's free cataract surgery program.",
        content: `<p>For three years, Karim could barely see. Cataracts had slowly clouded his vision until he could no longer read, tend his crops, or recognize faces at a distance.</p><p>When Mother Ayesha Foundation's mobile eye care unit arrived at a health fair in his upazila, a volunteer screened him and flagged his condition. Within two weeks, he was transported to a partner hospital where our team performed cataract surgery on both eyes — completely free of charge.</p><p>The morning after the bandages came off, Karim cried. He had not seen his wife's face clearly in years.</p>`,
        author: "Dr. Tariq Hossain",
        date: "March 5, 2024",
        category: "Healthcare",
        image: "/placeholder.svg?height=400&width=600&text=Eye+Care+Story",
        featured: true,
      },
      {
        slug: "flood-relief-bangladesh",
        title: "Rebuilding After the Floods: A Community's Resilience",
        excerpt: "When devastating floods swept through Sylhet in 2024, Mother Ayesha Foundation's emergency response team was on the ground within 48 hours.",
        content: `<p>In June 2024, catastrophic flash floods inundated large parts of Sylhet Division. Hundreds of thousands of families lost their homes, livestock, and livelihoods in a matter of days.</p><p>Mother Ayesha Foundation mobilized its humanitarian relief team within 48 hours. Emergency food packets, clean water, and temporary shelter materials were distributed to over 3,000 displaced families.</p><p>Rashida, a mother of three, remembers the relief team arriving when she had nearly given up hope. "We had nothing. They came with food, with medicine, with tarpaulins. That night my children slept covered."</p>`,
        author: "Sarah Johnson",
        date: "October 18, 2024",
        category: "Disaster Relief",
        image: "/placeholder.svg?height=400&width=600&text=Flood+Relief",
        featured: true,
      },
    ],
  })

  console.log("✅ Stories seeded")

  // ─── Gallery ───────────────────────────────────────────────────────────────
  await prisma.galleryImage.deleteMany()

  await prisma.galleryImage.createMany({
    data: [
      { src: "/placeholder.svg?height=600&width=800&text=Healthcare+Outreach",  alt: "Medical team providing healthcare services",       category: "Healthcare",           location: "Dhaka, Bangladesh",      date: "April 2024",     featured: true  },
      { src: "/placeholder.svg?height=600&width=800&text=TVET+Training",        alt: "Students in vocational skills training",           category: "Education",            location: "Gulshan, Dhaka",         date: "March 2024",     featured: true  },
      { src: "/placeholder.svg?height=600&width=800&text=Eye+Care+Camp",        alt: "Free eye screening camp in rural Bangladesh",      category: "Healthcare",           location: "Mymensingh, Bangladesh", date: "February 2024",  featured: true  },
      { src: "/placeholder.svg?height=600&width=800&text=Scholarship+Ceremony", alt: "Scholarship award ceremony for students",          category: "Education",            location: "Dhaka, Bangladesh",      date: "January 2024",   featured: true  },
      { src: "/placeholder.svg?height=600&width=800&text=Flood+Relief",         alt: "Relief distribution during Sylhet floods",         category: "Disaster Relief",      location: "Sylhet, Bangladesh",     date: "June 2024",      featured: true  },
      { src: "/placeholder.svg?height=600&width=800&text=Financial+Literacy",   alt: "Financial literacy workshop for rural women",      category: "Economic Empowerment", location: "Rajshahi, Bangladesh",   date: "May 2024",       featured: true  },
      { src: "/placeholder.svg?height=600&width=800&text=Community+Meeting",    alt: "Community leaders planning session",               category: "Community",            location: "Comilla, Bangladesh",    date: "August 2024",    featured: true  },
      { src: "/placeholder.svg?height=600&width=800&text=Cataract+Surgery",     alt: "Cataract surgery at partner hospital",             category: "Healthcare",           location: "Dhaka, Bangladesh",      date: "September 2024", featured: true  },
      { src: "/placeholder.svg?height=600&width=800&text=Research+Workshop",    alt: "Research and policy workshop with academics",      category: "Research",             location: "Dhaka, Bangladesh",      date: "October 2024",   featured: false },
      { src: "/placeholder.svg?height=600&width=800&text=Elderly+Care",         alt: "Elderly care home planning and site visit",        category: "Social Welfare",       location: "Dhaka, Bangladesh",      date: "November 2024",  featured: false },
      { src: "/placeholder.svg?height=600&width=800&text=Maternal+Health",      alt: "Maternal health clinic serving new mothers",       category: "Healthcare",           location: "Narayanganj, Bangladesh",date: "December 2024",  featured: false },
      { src: "/placeholder.svg?height=600&width=800&text=Youth+Training",       alt: "Youth entrepreneurship training session",          category: "Education",            location: "Chittagong, Bangladesh", date: "January 2025",   featured: false },
    ],
  })

  console.log("✅ Gallery seeded")
  console.log("🎉 Database seeding complete!")
}

main()
  .catch((e) => {
    console.error("Seeding error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
