"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import PageHero from "@/components/page-hero"
import { siteConfig } from "@/lib/siteConfig"

export default function ContactPage() {
  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission
    setIsSubmitting(true) // Set submitting state to true
    // Add your form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000) // Reset submitting state after 1 second (simulated)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <PageHero
          badge="GET IN TOUCH"
          title="Contact Us"
          description="Have a question about our programs, want to make a donation, or interested in partnering with us? Reach out and our team will respond as soon as possible."
        />

        {/* Contact Form and Info Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-[#3d3d3d]">Get in Touch</h2>
                  <p className="text-[#5a5a5a]">
                    Whether you want to support our programs, explore a partnership, volunteer your time, or simply
                    learn more about our work — send us a message and we will get back to you promptly.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-start">
                    <MapPin className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Our Location</h3>
                      <p className="text-[#5a5a5a]">
                        {siteConfig.contact.address.line1}<br />
                        {siteConfig.contact.address.line2}<br />
                        {siteConfig.contact.address.line3}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start">
                    <Phone className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Phone Number</h3>
                      <p className="text-[#5a5a5a]">{siteConfig.contact.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <Mail className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Email Address</h3>
                      <p className="text-[#5a5a5a]">{siteConfig.contact.email}</p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start">
                    <Clock className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Working Hours</h3>
                      <p className="text-[#5a5a5a]">{siteConfig.contact.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name input */}
                  <div>
                    <Input
                      type="text"
                      placeholder="Your name *"
                      required
                      className="border-gray-200 focus:border-[#4db6ac]"
                    />
                  </div>

                  {/* Email input */}
                  <div>
                    <Input
                      type="email"
                      placeholder="Email *"
                      required
                      className="border-gray-200 focus:border-[#4db6ac]"
                    />
                  </div>

                  {/* Message textarea */}
                  <div>
                    <Textarea
                      placeholder="Your message *"
                      required
                      className="min-h-[150px] border-gray-200 focus:border-[#4db6ac]"
                    />
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#4db6ac] text-white hover:bg-[#3d9d93]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-lg">
              {/* Google Maps iframe */}
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mother Aysha Foundation Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

