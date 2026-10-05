import { WA_PATTERNS, type Locale } from '@/lib/services'
import { WaButton } from './WaButton'
import { T } from './strings'

const C = {
  id: {
    a: { eyebrow: 'Satu layanan', h: 'Pilih satu kanal', s: 'Harga atau penawaran setiap layanan ada di tabel di bawah.', link: 'Lihat tabel harga' },
    b: { eyebrow: 'Kampanye 360°', h: 'Satukan semua kanal', s: 'Semua kanal yang Anda butuhkan dalam satu kampanye, lewat proposal kustom.' },
  },
  en: {
    a: { eyebrow: 'One service', h: 'Pick one channel', s: "Each service's price or quote is in the table below.", link: 'See the price table' },
    b: { eyebrow: '360° campaign', h: 'Connect every channel', s: 'Every channel you need in one campaign, by custom proposal.' },
  },
}

/** Two ways to buy (BUILD §11 4.3): two flat Putih panels on the Kertas section, same DOM at every width. */
export function ModeChoice({ locale: l, context }: { locale: Locale; context: 'home' | 'hub' }) {
  const c = C[l]
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      <div data-ground="putih" className="card-raised p-5 sm:p-6">
        <p className="t-dateline text-ink-2">{c.a.eyebrow}</p>
        <h3 className="t-h3 mt-1 sm:mt-2">{c.a.h}</h3>
        <p className="t-small mt-1">{c.a.s}</p>
        {context === 'hub' ? <a href="#harga" className="link t-small mt-3 inline-flex min-h-tap items-center">{c.a.link}</a> : null}
      </div>
      <div data-ground="putih" className="card-raised relative overflow-hidden p-5 sm:p-6">
        <i className="day-dial absolute inset-x-0 top-0 h-[3px]" aria-hidden="true" data-decor="" />
        <p className="t-dateline text-ink-2">{c.b.eyebrow}</p>
        <h3 className="t-h3 mt-1 sm:mt-2">{c.b.h}</h3>
        <p className="t-small mt-1">{c.b.s}</p>
        <WaButton text={WA_PATTERNS.campaign360[l]} placement="table" service="360" size="sm" label={T.c360Chat[l]} className="mt-2 sm:mt-3" />
      </div>
    </div>
  )
}
