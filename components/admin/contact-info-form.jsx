"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Save } from "lucide-react"

export default function ContactInfoForm({ initial }) {
  const [form, setForm] = useState({
    contact_email:        initial.email        || "",
    contact_phone:        initial.phone        || "",
    contact_workingHours: initial.workingHours || "",
    contact_address1:     initial.address?.line1 || "",
    contact_address2:     initial.address?.line2 || "",
    contact_address3:     initial.address?.line3 || "",
    contact_mapEmbedUrl:  initial.mapEmbedUrl  || "",
    social_facebook:      initial.social?.facebook  || "",
    social_twitter:       initial.social?.twitter   || "",
    social_instagram:     initial.social?.instagram || "",
    social_youtube:       initial.social?.youtube   || "",
  })
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to save")
      toast.success("Contact information updated successfully.")
    } catch {
      toast.error("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Contact */}
      <div className="bg-white rounded-xl border p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Basic Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label>Email Address</Label>
            <Input value={form.contact_email} onChange={set("contact_email")} placeholder="info@example.org" />
          </div>
          <div className="space-y-1.5">
            <Label>Phone Number</Label>
            <Input value={form.contact_phone} onChange={set("contact_phone")} placeholder="+880 2-XXXX-XXXX" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Working Hours</Label>
            <Input value={form.contact_workingHours} onChange={set("contact_workingHours")} placeholder="Sunday – Thursday: 9:00 AM – 5:00 PM (BST)" />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl border p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Address</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Address Line 1</Label>
            <Input value={form.contact_address1} onChange={set("contact_address1")} placeholder="Street address" />
          </div>
          <div className="space-y-1.5">
            <Label>Address Line 2</Label>
            <Input value={form.contact_address2} onChange={set("contact_address2")} placeholder="Area, district" />
          </div>
          <div className="space-y-1.5">
            <Label>Address Line 3</Label>
            <Input value={form.contact_address3} onChange={set("contact_address3")} placeholder="City, postal code, country" />
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div className="bg-white rounded-xl border p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Google Maps Embed URL</h2>
        <div className="space-y-1.5">
          <Label>Embed URL</Label>
          <Textarea
            value={form.contact_mapEmbedUrl}
            onChange={set("contact_mapEmbedUrl")}
            placeholder="https://www.google.com/maps/embed?pb=..."
            rows={3}
            className="font-mono text-xs"
          />
          <p className="text-xs text-gray-500">Go to Google Maps → Share → Embed a map → copy the <em>src</em> URL from the iframe code.</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl border p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Social Media Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { key: "social_facebook",  label: "Facebook" },
            { key: "social_twitter",   label: "Twitter / X" },
            { key: "social_instagram", label: "Instagram" },
            { key: "social_youtube",   label: "YouTube" },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1.5">
              <Label>{label}</Label>
              <Input value={form[key]} onChange={set(key)} placeholder="https://..." />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving} className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
