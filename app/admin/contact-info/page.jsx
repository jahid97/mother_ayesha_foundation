import { prisma } from "@/lib/db"
import { siteConfig } from "@/lib/siteConfig"
import ContactInfoForm from "@/components/admin/contact-info-form"

const CONTACT_KEYS = [
  "contact_email", "contact_phone", "contact_workingHours",
  "contact_address1", "contact_address2", "contact_address3",
  "contact_mapEmbedUrl",
  "social_facebook", "social_twitter", "social_instagram",
  "social_linkedin", "social_youtube",
]

export default async function ContactInfoAdminPage() {
  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: CONTACT_KEYS } },
  })
  const db = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  const initial = {
    email:        db.contact_email        || siteConfig.contact.email,
    phone:        db.contact_phone        || siteConfig.contact.phone,
    workingHours: db.contact_workingHours || siteConfig.contact.workingHours,
    address: {
      line1: db.contact_address1 || siteConfig.contact.address.line1,
      line2: db.contact_address2 || siteConfig.contact.address.line2,
      line3: db.contact_address3 || siteConfig.contact.address.line3,
    },
    mapEmbedUrl: db.contact_mapEmbedUrl || siteConfig.mapEmbedUrl,
    social: {
      facebook:  db.social_facebook  || siteConfig.social.facebook,
      twitter:   db.social_twitter   || siteConfig.social.twitter,
      instagram: db.social_instagram || siteConfig.social.instagram,
      linkedin:  db.social_linkedin  || siteConfig.social.linkedin,
      youtube:   db.social_youtube   || siteConfig.social.youtube,
    },
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Information</h1>
        <p className="text-gray-500 mt-1 text-sm">Update the contact details shown on the public website and footer.</p>
      </div>
      <ContactInfoForm initial={initial} />
    </div>
  )
}
