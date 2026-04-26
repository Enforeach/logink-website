'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

const SECTIONS = [
  {
    title: 'General',
    fields: [
      { key: 'site_name', label: 'Site Name', type: 'text' },
      { key: 'site_tagline', label: 'Tagline', type: 'text' },
      { key: 'site_email', label: 'Contact Email', type: 'email' },
      { key: 'site_phone', label: 'Phone Number', type: 'text' },
      { key: 'whatsapp_number', label: 'WhatsApp Number (with country code)', type: 'text' },
    ],
  },
  {
    title: 'Social Media',
    fields: [
      { key: 'social_instagram', label: 'Instagram URL', type: 'text' },
      { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
      { key: 'social_facebook', label: 'Facebook URL', type: 'text' },
    ],
  },
  {
    title: 'Analytics',
    fields: [
      { key: 'google_analytics_id', label: 'Google Analytics 4 ID (G-XXXXXXX)', type: 'text' },
      { key: 'meta_pixel_id', label: 'Meta Pixel ID', type: 'text' },
    ],
  },
]

export function SettingsForm({ initialSettings }: { initialSettings: Record<string, any> }) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {}
    for (const sec of SECTIONS) for (const f of sec.fields) {
      const v = initialSettings[f.key]
      out[f.key] = typeof v === 'string' ? v : (v != null ? String(v) : '')
    }
    return out
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    setSaving(true); setSaved(false); setError('')
    const body: Record<string, any> = {}
    for (const [k, v] of Object.entries(values)) body[k] = v

    try {
      const res = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) { setError('Failed to save settings'); return }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch { setError('Network error') } finally { setSaving(false) }
  }

  return (
    <div className="max-w-2xl space-y-8">
      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
      {saved && <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">Settings saved.</div>}

      {SECTIONS.map(sec => (
        <div key={sec.title} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 space-y-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">{sec.title}</h2>
          {sec.fields.map(f => (
            <div key={f.key}>
              <label className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">{f.label}</label>
              <input
                type={f.type}
                value={values[f.key] ?? ''}
                onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none"
              />
            </div>
          ))}
        </div>
      ))}

      <Button onClick={handleSave} loading={saving}>Save Settings</Button>
    </div>
  )
}
