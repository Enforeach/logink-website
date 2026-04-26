import { prisma } from '@/lib/prisma'
import { SettingsForm } from '@/components/admin/SettingsForm'

const DEFAULT_SETTINGS = {
  site_name: 'Logink',
  site_tagline: 'Digital Marketing Agency',
  site_email: '',
  site_phone: '',
  whatsapp_number: '',
  social_instagram: '',
  social_linkedin: '',
  social_facebook: '',
  google_analytics_id: '',
  meta_pixel_id: '',
}

export default async function SettingsPage() {
  let settings: Record<string, any> = { ...DEFAULT_SETTINGS }
  try {
    const rows = await prisma.siteSetting.findMany()
    for (const r of rows) settings[r.key] = r.value
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Global site configuration</p>
      </div>
      <SettingsForm initialSettings={settings} />
    </div>
  )
}
