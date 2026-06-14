import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import Link from "next/link"
import { XCircle } from "lucide-react"

export default function DonateFailed() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#3d3d3d] mb-3">Payment Failed</h1>
          <p className="text-[#5a5a5a] mb-8">
            Your payment could not be completed. No money has been charged. Please try again or use a different payment method.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/donate" className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Try Again
            </Link>
            <Link href="/contact-us" className="border-2 border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
