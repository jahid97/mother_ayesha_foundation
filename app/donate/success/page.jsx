import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function DonateSuccess() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#3d3d3d] mb-3">Thank You!</h1>
          <p className="text-[#5a5a5a] mb-2">
            Your donation has been received. You will get a confirmation to your email shortly.
          </p>
          <p className="text-sm text-[#5a5a5a] mb-8">
            May Allah reward your generosity. Together we are making a difference in Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Back to Home
            </Link>
            <Link href="/projects" className="border-2 border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              View Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
