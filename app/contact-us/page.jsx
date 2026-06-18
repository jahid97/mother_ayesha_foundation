import { Mail, Phone, MapPin, Clock } from "lucide-react"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import PageHero from "@/components/page-hero"
import ContactForm from "@/components/contact-form"
import { prisma } from "@/lib/db"
import { siteConfig } from "@/lib/siteConfig"

const CONTACT_KEYS = [
  "contact_email", "contact_phone", "contact_workingHours",
  "contact_address1", "contact_address2", "contact_address3",
  "contact_mapEmbedUrl",
]

export default async function ContactPage() {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: CONTACT_KEYS } },
  })
  const db = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  const info = {
    email:        db.contact_email        || siteConfig.contact.email,
    phone:        db.contact_phone        || siteConfig.contact.phone,
    workingHours: db.contact_workingHours || siteConfig.contact.workingHours,
    address: {
      line1: db.contact_address1 || siteConfig.contact.address.line1,
      line2: db.contact_address2 || siteConfig.contact.address.line2,
      line3: db.contact_address3 || siteConfig.contact.address.line3,
    },
    mapEmbedUrl: db.contact_mapEmbedUrl || siteConfig.mapEmbedUrl,
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <PageHero
          page="contact"
          badge="GET IN TOUCH"
          title="Contact Us"
          description="Have a question about our programs, want to make a donation, or interested in partnering with us? Reach out and our team will respond as soon as possible."
        />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-[#3d3d3d]">Get in Touch</h2>
                  <p className="text-[#5a5a5a]">
                    Whether you want to support our programs, explore a partnership, or simply learn more about our work — send us a message and we will get back to you promptly.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Our Location</h3>
                      <p className="text-[#5a5a5a]">
                        {info.address.line1}<br />
                        {info.address.line2}<br />
                        {info.address.line3}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Phone Number</h3>
                      <p className="text-[#5a5a5a]">{info.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Email Address</h3>
                      <p className="text-[#5a5a5a]">{info.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Working Hours</h3>
                      <p className="text-[#5a5a5a]">{info.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-lg">
              <iframe
                src={info.mapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mother Ayesha Foundation Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
