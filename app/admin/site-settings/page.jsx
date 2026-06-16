import { prisma } from "@/lib/db"
import SiteSettingsForm from "@/components/admin/site-settings-form"

export default async function SiteSettingsPage() {
  const rows = await prisma.siteSetting.findMany()
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Settings</h1>
      <SiteSettingsForm settings={settings} />
    </div>
  )
}
