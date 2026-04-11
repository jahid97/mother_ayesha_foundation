import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import PageHero from "@/components/page-hero"
import CallToAction from "@/components/call-to-action"
import GalleryGrid from "@/components/gallery-grid"
import { prisma } from "@/lib/db"

export const revalidate = 3600

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { id: "asc" } })

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <PageHero
          badge="GALLERY"
          title="Our Gallery"
          description="A visual record of our programs, communities, and people — from healthcare camps and TVET institutes to humanitarian relief efforts across Bangladesh."
        />

        <GalleryGrid images={images} />

        <CallToAction
          title="Want to Help Our Cause?"
          description="Your support can make a real difference in the lives of communities across Bangladesh. Join us in our mission to provide healthcare, education, and hope."
          primaryButtonText="Donate Now"
          primaryButtonLink="/donate"
          secondaryButtonText="Contact Us"
          secondaryButtonLink="/contact-us"
          bgColor="bg-[#3d3d3d]"
        />
      </main>

      <Footer />
    </div>
  )
}
