/**
 * Project Data Module
 *
 * Projects for Mother Ayesha Foundation — Bangladesh-based initiatives
 * aligned with the organization's MOA objectives.
 */

export const featuredProjects = [
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
    goals: [
      "Train 500+ youth annually in marketable skills",
      "Achieve 80%+ job placement rate for graduates",
      "Develop partnerships with 20+ local businesses",
      "Expand to 3 additional districts by 2026",
    ],
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
  },
]

export function getAllProjects() {
  return [
    ...featuredProjects,
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
      longDescription:
        "This program supports academically talented students who lack financial resources to pursue higher education. We provide full and partial scholarships, monthly stipends, and mentorship connections to help scholars succeed.",
      challenges: ["Identifying deserving candidates", "Long-term funding sustainability", "Post-graduation monitoring"],
      achievements: ["200+ scholarships awarded", "90% graduation rate among recipients", "Partnerships with 5 universities"],
      goals: ["Award 100 new scholarships annually", "Expand to fellowship programs abroad", "Build alumni mentor network"],
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
      longDescription:
        "Many rural Bangladeshis distrust formal financial institutions, relying instead on costly informal credit. This program teaches financial literacy, helps people open bank accounts, and connects entrepreneurs with micro-financing opportunities.",
      challenges: ["Distrust of banking systems", "Low literacy rates", "Remote community access"],
      achievements: ["5,000+ people trained", "2,000+ new bank accounts opened", "300+ micro-entrepreneurs supported"],
      goals: ["Reach 20,000 rural households", "Establish 10 community finance groups", "Reduce informal borrowing by 40%"],
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
      longDescription:
        "Bangladesh's elderly population increasingly faces social isolation and inadequate care. This program establishes a residential facility with trained caregivers, regular medical check-ups, recreational activities, and a compassionate living environment.",
      challenges: ["High facility costs", "Trained caregiver shortage", "Social awareness"],
      achievements: ["Land secured", "Initial architectural plans approved", "Partnership with healthcare provider signed"],
      goals: ["Accommodate 50 elderly residents initially", "Provide 24/7 medical and personal care", "Expand to second facility by 2028"],
    },
  ]
}

export function getProjectById(id) {
  const allProjects = getAllProjects()
  return allProjects.find((project) => project.id === id)
}

export const projects = getAllProjects()
