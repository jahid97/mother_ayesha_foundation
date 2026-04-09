import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8 flex justify-center">
                <div className="h-24 w-24 rounded-full bg-[#4db6ac]/20 flex items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-[#4db6ac]" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#3d3d3d] mb-6">Thank You for Applying!</h1>

              <p className="text-lg text-[#5a5a5a] mb-8">
                Your volunteer application has been successfully submitted. We appreciate your interest in joining the
                Mother Aysha Foundation team. Our volunteer coordinator will review your application and contact you
                within 5-7 business days.
              </p>

              <div className="bg-white rounded-lg p-8 shadow-md mb-8">
                <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">What Happens Next?</h2>

                <ol className="text-left space-y-4 mb-6">
                  <li className="flex items-start">
                    <span className="bg-[#4db6ac]/20 text-[#4db6ac] font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                      1
                    </span>
                    <span className="text-[#5a5a5a]">
                      <strong className="text-[#3d3d3d]">Application Review:</strong> Our team will review your
                      application to match your skills and interests with our current needs.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#4db6ac]/20 text-[#4db6ac] font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                      2
                    </span>
                    <span className="text-[#5a5a5a]">
                      <strong className="text-[#3d3d3d]">Initial Contact:</strong> A volunteer coordinator will reach
                      out to discuss potential opportunities and answer any questions.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#4db6ac]/20 text-[#4db6ac] font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                      3
                    </span>
                    <span className="text-[#5a5a5a]">
                      <strong className="text-[#3d3d3d]">Orientation:</strong> If there's a good fit, you'll be invited
                      to attend a volunteer orientation session.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#4db6ac]/20 text-[#4db6ac] font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                      4
                    </span>
                    <span className="text-[#5a5a5a]">
                      <strong className="text-[#3d3d3d]">Getting Started:</strong> After orientation and any necessary
                      training, you'll begin your volunteer journey with us!
                    </span>
                  </li>
                </ol>

                <p className="text-[#5a5a5a] italic">
                  If you don't hear from us within 7 days, please check your spam folder or contact us at
                  volunteer@motheraysha.org.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Return to Homepage</Button>
                </Link>
                <Link href="/donate">
                  <Button
                    variant="outline"
                    className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white group"
                  >
                    Support Our Cause
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Get Involved */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#3d3d3d] text-center mb-12">Other Ways to Get Involved</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#faf6ed] rounded-lg p-6 text-center">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300&text=Donate"
                    alt="Donate"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Make a Donation</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Your financial support helps us provide care, education, and hope to orphaned children around the
                  world.
                </p>
                <Link href="/donate">
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Donate Now</Button>
                </Link>
              </div>

              <div className="bg-[#faf6ed] rounded-lg p-6 text-center">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300&text=Fundraise"
                    alt="Fundraise"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Start a Fundraiser</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Create your own fundraising campaign to support our projects and spread awareness among your network.
                </p>
                <Link href="/fundraise">
                  <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Start Fundraising</Button>
                </Link>
              </div>

              <div className="bg-[#faf6ed] rounded-lg p-6 text-center">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300&text=Spread+the+Word"
                    alt="Spread the Word"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Spread the Word</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Follow us on social media and share our mission with your friends and family to help us reach more
                  people.
                </p>
                <Button className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">Follow Us</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

