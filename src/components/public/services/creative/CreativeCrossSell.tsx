'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS_ID = [
  {
    href: '/services/social-media-management',
    accent: '#DB2777',
    title: 'Social Media Management',
    description: 'Konten bagus butuh distribusi yang bagus. Tim Social Media kami menangani strategi, penjadwalan, dan community management, supaya aset kreatif yang kami buat benar-benar menjangkau audiens yang tepat di waktu yang tepat.',
    pricing: 'Harga kustom',
  },
  {
    href: '/services/website-landing-page',
    accent: '#A78BFA',
    title: 'Website & Landing Page',
    description: 'Butuh rumah untuk brandmu? Tim web kami membangun website dan landing page yang dioptimasi untuk konversi dan menampilkan identitas visual yang kami buat.',
    pricing: 'Mulai dari Rp 10 Juta',
  },
] as const

const CARDS_EN = [
  {
    href: '/en/services/social-media-management',
    accent: '#DB2777',
    title: 'Social Media Management',
    description: 'Great content needs great distribution. Our Social Media team handles strategy, scheduling, and community management, so the creative assets we make actually reach the right audience at the right time.',
    pricing: 'Custom pricing',
  },
  {
    href: '/en/services/website-landing-page',
    accent: '#A78BFA',
    title: 'Website & Landing Page',
    description: "Need a home for your brand? Our web team builds websites and landing pages optimized for conversions that showcase the visual identity we've created.",
    pricing: 'Starting from Rp 10M',
  },
] as const

const CROSSSELL_COPY = {
  id: { eyebrow: 'Cocok dikombinasikan dengan', heading: 'Perkuat kreativitasmu.', learnMore: 'Pelajari lebih lanjut →' },
  en: { eyebrow: 'Pairs well with', heading: 'Amplify your creativity.', learnMore: 'Learn more →' },
}

export function CreativeCrossSell({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cards = locale === 'en' ? CARDS_EN : CARDS_ID
  const c = CROSSSELL_COPY[locale]

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: '#0C0818' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">{c.eyebrow}</p>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">{c.heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(cards as typeof CARDS_ID).map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={card.href}
                className="group block rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-6 transition-all hover:border-white/20 hover:translate-x-1"
                style={{ borderLeftColor: card.accent, borderLeftWidth: 3 }}
              >
                <div className="font-bold text-lg mb-2" style={{ color: card.accent }}>{card.title}</div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{card.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">{card.pricing}</span>
                  <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform" style={{ color: card.accent }}>
                    {c.learnMore}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
