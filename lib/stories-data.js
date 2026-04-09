/**
 * Stories Data Module
 *
 * Success stories from Mother Ayesha Foundation's programs in Bangladesh.
 */

export const stories = [
  {
    id: 1,
    slug: "farida-vocational-training",
    title: "From Dropout to Business Owner: Farida's Story",
    excerpt: "How a young woman from Dhaka's underprivileged neighborhoods used our TVET program to build her own tailoring business and support her family.",
    content: `
    <p>Farida grew up in a cramped single room in a slum settlement on the outskirts of Dhaka. At 14, she dropped out of school when her family could no longer afford the fees. For years, she worked irregular domestic jobs earning barely enough to survive.</p>

    <p>When Mother Ayesha Foundation opened its TVET Skills Development Institute near her neighborhood, Farida enrolled in the tailoring and garment design program — skeptical, but hoping for a chance at something better.</p>

    <p>"I had never believed I could learn a proper skill," Farida recalls. "I thought that kind of training was for people who already had something. But they welcomed me with nothing."</p>

    <p>Over the course of twelve months, Farida mastered garment construction, pattern drafting, and basic business management. The foundation connected her with a micro-loan provider and a local fabric supplier willing to extend credit to graduates.</p>

    <p>Today, Farida runs a small tailoring shop from her home, employing two neighbors and earning three times her previous income. Her younger sister is now enrolled in the same program.</p>

    <p>"What changed wasn't just my skill," she says. "It was my confidence. I now believe I can build something. And I want every woman in my neighborhood to feel that."</p>

    <p>Farida's story is one of hundreds emerging from the foundation's TVET programs — proof that practical skills training, combined with financial guidance and community support, can transform lives that poverty once seemed to have defined permanently.</p>
    `,
    author: "Nadia Rahman",
    date: "August 12, 2024",
    category: "Skills Development",
    image: "/placeholder.svg?height=400&width=600&text=Farida's+Story",
  },
  {
    id: 2,
    slug: "eyecare-rural-bangladesh",
    title: "Seeing Clearly: How Free Eye Surgery Changed a Farmer's Life",
    excerpt: "Karim, a 58-year-old farmer from Mymensingh, regained his sight through Mother Ayesha Foundation's free cataract surgery program.",
    content: `
    <p>For three years, Karim could barely see. Cataracts had slowly clouded his vision until he could no longer read, tend his crops properly, or recognize faces at a distance. He knew surgery existed — but with four children and an aging wife, there was simply no money for it.</p>

    <p>"I thought this was just how my life would end," he says. "Going blind slowly, becoming a burden to my family."</p>

    <p>When Mother Ayesha Foundation's mobile eye care unit arrived at the health fair in his upazila, a volunteer screened him and immediately flagged his condition. Within two weeks, he was transported to a partner hospital in Dhaka, where our team performed cataract surgery on both eyes — completely free of charge.</p>

    <p>The morning after the bandages came off, Karim cried. He had not seen his wife's face clearly in years.</p>

    <p>Back home, he returned to farming. His yield that season exceeded the previous three years combined. His children, who had been quietly planning to quit school to support the household, stayed enrolled.</p>

    <p>"One surgery. That is all it took to change everything for my family," Karim says. "I want people to know that somewhere, someone cares enough to give that to a poor farmer like me."</p>

    <p>Karim is among over 800 patients treated through the foundation's Eye Care & Cataract Program in its first eighteen months of operation — a program that continues to expand its reach into rural Bangladesh with each passing year.</p>
    `,
    author: "Dr. Tariq Hossain",
    date: "March 5, 2024",
    category: "Healthcare",
    image: "/placeholder.svg?height=400&width=600&text=Eye+Care+Story",
  },
  {
    id: 3,
    slug: "flood-relief-bangladesh",
    title: "Rebuilding After the Floods: A Community's Resilience",
    excerpt: "When devastating floods swept through Sylhet in 2024, Mother Ayesha Foundation's emergency response team was on the ground within 48 hours.",
    content: `
    <p>In June 2024, catastrophic flash floods inundated large parts of Sylhet Division in northeastern Bangladesh. Hundreds of thousands of families lost their homes, livestock, and livelihoods in a matter of days.</p>

    <p>Mother Ayesha Foundation mobilized its humanitarian relief team within 48 hours of the disaster. Emergency food packets, clean water, oral rehydration salts, and temporary shelter materials were distributed to over 3,000 displaced families across five severely affected upazilas.</p>

    <p>Rashida, a mother of three from Companiganj, remembers the relief team arriving when she had nearly given up hope. "We had nothing. The water had taken everything. They came with food, with medicine, with tarpaulins. That night my children slept covered."</p>

    <p>Beyond immediate relief, the foundation's rehabilitation program helped 400 families rebuild flood-resistant homes using improved construction techniques. Farmers received seed packs and tools to restart agricultural production before the next planting season.</p>

    <p>A community preparedness workshop was also conducted in partnership with local government, training 200 community volunteers in early warning systems, evacuation protocols, and first aid.</p>

    <p>"The floods will come again — that is the reality of our land," says local community leader Abdul Karim. "But now we are not helpless. We have knowledge, we have preparation, and we know that if the worst happens, we are not alone."</p>

    <p>The foundation remains committed to long-term recovery and preparedness in flood-prone areas, working alongside communities to build resilience that outlasts any single disaster.</p>
    `,
    author: "Sarah Johnson",
    date: "October 18, 2024",
    category: "Disaster Relief",
    image: "/placeholder.svg?height=400&width=600&text=Flood+Relief",
  },
]

export function getAllStories() {
  return stories
}

export function getStoryBySlug(slug) {
  return stories.find((story) => story.slug === slug)
}

export function getStoryById(id) {
  return stories.find((story) => story.id === id)
}
