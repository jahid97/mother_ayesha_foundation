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
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to send message.")
      toast.success("Message sent!", { description: "We'll get back to you as soon as possible." })
      setForm({ name: "", email: "", message: "" })
    } catch (err) {
      toast.error("Failed to send message.", { description: err.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        <PageHero
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
                        {siteConfig.contact.address.line1}<br />
                        {siteConfig.contact.address.line2}<br />
                        {siteConfig.contact.address.line3}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Phone Number</h3>
                      <p className="text-[#5a5a5a]">{siteConfig.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="mr-4 h-6 w-6 text-[#4db6ac]" />
                    <div>
                      <h3 className="font-medium text-[#3d3d3d]">Email Address</h3>
                      <p className="text-[#5a5a5a]">{siteConfig.contact.email}</p>
                    </div>
                  </div>
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
                  <div>
                    <Input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name *"
                      required
                      className="border-gray-200 focus:border-[#4db6ac]"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      required
                      className="border-gray-200 focus:border-[#4db6ac]"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message *"
                      required
                      className="min-h-[150px] border-gray-200 focus:border-[#4db6ac]"
                    />
                  </div>
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

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-lg">
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
