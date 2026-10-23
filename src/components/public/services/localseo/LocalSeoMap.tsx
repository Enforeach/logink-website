'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Star, Navigation, Award } from 'lucide-react'
import { LOCALSEO_ACCENT, LOCALSEO_NEARME_QUERIES, LOCALSEO_NEARME_QUERIES_EN } from './data'

const COPY = {
  id: {
    eyebrow: 'Google Maps',
    heading: 'Menang di pencarian "near me" hingga radius 20 km.',
    para: 'Pencari lokal punya intent tertinggi: mereka siap menelepon, minta rute, atau datang sekarang. Kami optimasi seluruh sinyal lokal Anda agar muncul di 3 besar Google Maps untuk area seluas radius 20 km di sekitar bisnis Anda, bukan hanya di alamat persis.',
    radiusTag: 'Radius 20 km',
    pinLabel: 'Bisnis Anda',
    caption: 'Pencarian "near me" di sekitar Anda',
    bullets: [
      { Icon: Award, title: 'Dominasi Map Pack', desc: 'Masuk 3 besar Google Maps yang menangkap mayoritas klik, telepon, dan kunjungan.' },
      { Icon: MapPin, title: 'Google Business Profile', desc: 'Profil lengkap, terverifikasi, dan dioptimasi penuh: foto, jam, layanan, hingga Q&A.' },
      { Icon: Star, title: 'Review & Rating', desc: 'Strategi mengumpulkan dan membalas review, faktor peringkat map pack terbesar.' },
      { Icon: Navigation, title: 'Keyword "Near Me"', desc: 'Targetkan kelurahan dan area layanan agar muncul untuk pencarian lokasi di sekitar.' },
    ],
  },
  en: {
    eyebrow: 'Google Maps',
    heading: 'Win "near me" searches within a 20 km radius.',
    para: 'Local searchers have the highest intent: they are ready to call, get directions, or visit right now. We optimize every local signal so you appear in the Google Maps top 3 across a 20 km radius around your business, not just at your exact address.',
    radiusTag: '20 km radius',
    pinLabel: 'Your Business',
    caption: '"near me" searches around you',
    bullets: [
      { Icon: Award, title: 'Map Pack Dominance', desc: 'Land in the Google Maps top 3 that captures the majority of clicks, calls, and visits.' },
      { Icon: MapPin, title: 'Google Business Profile', desc: 'A complete, verified, fully optimized profile: photos, hours, services, and Q&A.' },
      { Icon: Star, title: 'Reviews & Ratings', desc: 'A system to collect and reply to reviews, the biggest map-pack ranking factor.' },
      { Icon: Navigation, title: '"Near Me" Keywords', desc: 'Target neighborhoods and service areas so you surface for location searches nearby.' },
    ],
  },
}

// Positions for floating query pills around the map (top/left %).
const PILL_POS = [
  { top: '8%', left: '4%' },
  { top: '4%', left: '58%' },
  { top: '40%', left: '2%' },
  { top: '46%', left: '70%' },
  { top: '78%', left: '10%' },
  { top: '82%', left: '56%' },
]

export function LocalSeoMap({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = COPY[locale]
  const queries = locale === 'en' ? LOCALSEO_NEARME_QUERIES_EN : LOCALSEO_NEARME_QUERIES
  const reduce = useReducedMotion()

  return (
    <section className="py-20 md:py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Map visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <div
            className="relative aspect-square w-full rounded-3xl overflow-hidden border shadow-card"
            style={{
              borderColor: 'rgba(13,148,136,0.20)',
              background:
                'linear-gradient(0deg, rgba(13,148,136,0.05), rgba(13,148,136,0.05)), repeating-linear-gradient(90deg, rgba(35,26,38,0.045) 0 1px, transparent 1px 58px), repeating-linear-gradient(0deg, rgba(35,26,38,0.045) 0 1px, transparent 1px 52px), #F4FAF8',
            }}
          >
            {/* faux roads */}
            <div className="absolute inset-0" aria-hidden style={{ background: 'linear-gradient(118deg, transparent 44%, rgba(13,148,136,0.12) 45%, rgba(13,148,136,0.12) 48%, transparent 49%)' }} />
            <div className="absolute inset-0" aria-hidden style={{ background: 'linear-gradient(205deg, transparent 58%, rgba(13,148,136,0.10) 59%, rgba(13,148,136,0.10) 61%, transparent 62%)' }} />

            {/* Concentric radius rings */}
            {[0.85, 0.6, 0.35].map((s, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: `${s * 100}%`,
                  height: `${s * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  border: '1.5px solid rgba(13,148,136,0.28)',
                  background: i === 2 ? 'radial-gradient(circle, rgba(13,148,136,0.16) 0%, transparent 70%)' : 'transparent',
                }}
                aria-hidden
              />
            ))}

            {/* Expanding radar ring */}
            <motion.span
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{ width: '35%', height: '35%', x: '-50%', y: '-50%', border: '2px solid rgba(13,148,136,0.45)' }}
              animate={reduce ? undefined : { scale: [1, 2.4], opacity: [0.55, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
              aria-hidden
            />

            {/* Center pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center"
              >
                <svg className="h-10 w-10 drop-shadow-lg" viewBox="0 0 24 24" fill={LOCALSEO_ACCENT} aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" fill="#fff" />
                </svg>
                <span className="mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full text-white shadow" style={{ background: LOCALSEO_ACCENT }}>
                  {c.pinLabel}
                </span>
              </motion.div>
            </div>

            {/* Floating "near me" query pills */}
            {queries.map((q, i) => {
              const pos = PILL_POS[i % PILL_POS.length]
              return (
                <motion.span
                  key={q}
                  className="absolute inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-sm border shadow-sm max-w-[45%] truncate"
                  style={{ top: pos.top, left: pos.left, borderColor: 'rgba(13,148,136,0.25)', color: '#0F766E' }}
                  animate={reduce ? undefined : { y: [0, -7, 0] }}
                  transition={{ duration: 3 + (i % 3) * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={LOCALSEO_ACCENT} strokeWidth={2} aria-hidden>
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="truncate">{q}</span>
                </motion.span>
              )
            })}

            {/* Radius tag */}
            <span className="absolute bottom-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full text-white shadow" style={{ background: LOCALSEO_ACCENT }}>
              {c.radiusTag}
            </span>
          </div>
          <p className="text-center text-xs text-[var(--text-muted)] mt-3">{c.caption}</p>
        </motion.div>

        {/* Value copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-[-0.03em] mb-4">{c.heading}</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8">{c.para}</p>

          <ul className="space-y-5">
            {c.bullets.map((b) => (
              <li key={b.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(13,148,136,0.10)' }}>
                  <b.Icon size={18} strokeWidth={1.75} color="#0F766E" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[var(--text-primary)] mb-0.5">{b.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
