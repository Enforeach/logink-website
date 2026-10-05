// SEO AI page, 'Seperti ini hasilnya terlihat' (owner 2026-10-04: the full instrument set, with crawler logs, JSON-LD,
// prompt tables and query fan-out, was too technical). Two plain, labelled mocks: an AI answer that names the brand,
// and its share of mentions against competitors. Every panel says 'Ilustrasi · data contoh'.
import type { Locale } from '@/lib/services'
import { AiAnswer } from '@/components/instruments/AiAnswer'
import { SovBars } from '@/components/instruments/SovBars'

export function AiBehind({ locale: l }: { locale: Locale }) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      <AiAnswer locale={l} className="lg:col-span-7" />
      <SovBars locale={l} className="lg:col-span-5" />
    </div>
  )
}
