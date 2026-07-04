'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const CARDS_ID = [
  {
    href: '/layanan/sosial-media-manajemen',
    accent: '#D81C5C',
    title: 'Social Media Management',
    description: 'Konten bagus butuh distribusi yang bagus. Tim Social Media kami menangani strategi, penjadwalan, dan community management, supaya aset kreatif yang kami buat benar-benar menjangkau audiens yang tepat di waktu yang tepat.',
    pricing: 'Harga kustom',
  },
  {
    href: '/layanan/website-development',
    accent: '#C084FC',
    title: 'Website & Landing Page',
    description: 'Butuh rumah untuk brandmu? Tim web kami membangun website dan landing page yang dioptimasi untuk konversi dan menampilkan identitas visual yang kami buat.',
    pricing: 'Mulai dari Rp 10 Juta',
  },
] as const

const CARDS_EN = [
  {
    href: '/en/services/social-media-management',
    accent: '#D81C5C',
    title: 'Social Media Management',
    description: 'Great content needs great distribution. Our Social Media team handles strategy, scheduling, and community management, so the creative assets we make actually reach the right audience at the right time.',
    pricing: 'Custom pricing',
  },
  {
    href: '/en/services/website-landing-page',
    accent: '#C084FC',
    title: 'Website & Landing Page',
    description: "Need a home for your brand? Our web team builds websites and landing pages optimized for conversions that showcase the visual identity we've created.",
    pricing: 'Starting from Rp 10M',
  },
] as const

const CROSSSELL_COPY = {
  id: { eyebrow: 'Cocok dikombinasikan dengan', heading: 'Perkuat kreativitasmu.', learnMore: 'Pelajari lebih lanjut' },
  en: { eyebrow: 'Pairs well with', heading: 'Amplify your creativity.', learnMore: 'Learn more' },
}

export function CreativeCrossSell({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cards = locale === 'en' ? CARDS_EN : CARDS_ID
  const c = CROSSSELL_COPY[locale]

  return (
    <section ref={ref} className="py-20 md:py-28 px-6" style={{ background: 'var(--bg-tint-rose)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">{c.heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(cards as typeof CARDS_ID).map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
            >
              <Link
                href={card.href}
                className="group relative flex flex-col h-full p-6 rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-card hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
              >
                {/* Accent top bar */}
                <span className="absolute top-0 left-0 right-0 h-1" style={{ background: card.accent }} aria-hidden />

                <div className="flex items-center gap-2.5 mb-3 mt-1">
                  <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: card.accent }} aria-hidden />
                  <span className="font-display text-lg font-bold text-[var(--text-primary)]">{card.title}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">{card.description}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{card.pricing}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-primary)]">
                    {c.learnMore}
                    <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
