/**
 * Donation Page Component
 *
 * This page allows users to make donations to the Mother Aysha Foundation.
 * Features include:
 * - Project selection for targeted donations
 * - Multiple donation amount options
 * - Payment method selection
 * - Donation summary
 * - Alternative ways to support the foundation
 *
 * The form includes client-side validation and would connect to a payment
 * processor in a production environment.
 */
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import DonateForm from "@/components/donate-form"
import Image from "next/image"

export default async function DonatePage({ searchParams }) {
  // In Next.js 15, searchParams is a Promise and must be awaited
  const params = await searchParams
  const projectId = params.project || null

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#3d3d3d] py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Donation</h1>
                <p className="text-gray-300 text-lg">
                  Your generosity can transform the lives of orphaned children around the world. Choose a specific
                  project to support or make a general donation to help us allocate funds where they're needed most.
                </p>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Donate+Today"
                  alt="Donate today"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Donation Form Section */}
        <DonateForm initialProjectId={projectId} />

        {/* Other Ways to Help */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-8 text-center">Other Ways to Help</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#faf6ed] p-6 rounded-lg text-center">
                <div className="h-16 w-16 bg-[#4db6ac]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#4db6ac]"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Volunteer</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Share your time and skills to make a direct impact on the lives of orphaned children.
                </p>
                <a href="/volunteer-registration">
                  <button className="border border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white px-4 py-2 rounded-md transition-colors">
                    Become a Volunteer
                  </button>
                </a>
              </div>

              <div className="bg-[#faf6ed] p-6 rounded-lg text-center">
                <div className="h-16 w-16 bg-[#4db6ac]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#4db6ac]"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Fundraise</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Start your own fundraising campaign to support our projects and spread awareness.
                </p>
                <a href="/fundraise">
                  <button className="border border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white px-4 py-2 rounded-md transition-colors">
                    Start Fundraising
                  </button>
                </a>
              </div>

              <div className="bg-[#faf6ed] p-6 rounded-lg text-center">
                <div className="h-16 w-16 bg-[#4db6ac]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#4db6ac]"
                  >
                    <rect x="3" y="8" width="18" height="12" rx="2"></rect>
                    <path d="M7 8V6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Corporate Partnerships</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Partner with us to make a significant impact while enhancing your corporate social responsibility.
                </p>
                <a href="/corporate-partnerships">
                  <button className="border border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white px-4 py-2 rounded-md transition-colors">
                    Become a Partner
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

