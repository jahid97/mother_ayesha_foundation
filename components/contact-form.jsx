"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ContactForm() {
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
  )
}
