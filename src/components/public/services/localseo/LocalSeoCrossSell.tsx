'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CROSS_SELLS_ID = [
  {
    href: '/layanan/jasa-seo-profesional',
    name: 'SEO & Content Marketing',
    color: '#A855F7',
    description:
      'Local SEO menangkan pelanggan terdekat; SEO organik memperluas jangkauan ke seluruh kota dan nasional. Dua-duanya berbagi fondasi keyword dan konten yang sama.',
    startingFrom: 'Mulai dari Rp 6 Juta/bln',
  },
  {
    href: '/layanan/website-development',
    name: 'Website & Landing Page',
    color: '#C084FC',
    description:
      'Profil Google Maps yang bagus butuh tempat pendaratan yang mengonversi. Website cepat dengan klik-ke-WhatsApp mengubah pencari lokal menjadi pelanggan nyata.',
    startingFrom: 'Mulai dari Rp 10 Juta',
  },
]

const CROSS_SELLS_EN = [
  {
    href: '/en/services/seo-content-marketing',
    name: 'SEO & Content Marketing',
    color: '#A855F7',
    description:
      'Local SEO wins your nearest customers; organic SEO extends reach across the city and nationwide. Both share the same keyword and content foundation.',
    startingFrom: 'Starting from Rp 6 Juta/mo',
  },
  {
    href: '/en/services/website-landing-page',
    name: 'Website & Landing Page',
    color: '#C084FC',
    description:
      'A great Google Maps profile needs a landing spot that converts. A fast website with click-to-WhatsApp turns local searchers into real customers.',
    startingFrom: 'Starting from Rp 10 Juta',
  },
]

const CROSSSELL_COPY = {
  id: { eyebrow: 'Perkuat Hasil Anda', heading: 'Cocok dikombinasikan dengan', sub: 'Local SEO membawa pelanggan terdekat; layanan ini memperluas jangkauan dan konversinya.', learnMore: 'Selengkapnya' },
  en: { eyebrow: 'Amplify Your Results', heading: 'Pairs well with', sub: 'Local SEO brings the nearest customers; these services widen the reach and convert them.', learnMore: 'Learn more' },
}

export function LocalSeoCrossSell({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const items = locale === 'en' ? CROSS_SELLS_EN : CROSS_SELLS_ID
  const c = CROSSSELL_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6" style={{ background: 'var(--bg-tint-lilac)' }}>
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className="mb-10">
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">{c.heading}</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2">{c.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((svc, i) => (
            <motion.div
              key={svc.href}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col p-6 rounded-2xl border border-[var(--border-default)] bg-white hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Accent top bar */}
              <span className="absolute top-0 left-0 right-0 h-1" style={{ background: svc.color }} aria-hidden />

              <div className="flex items-center gap-2.5 mb-3 mt-1">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: svc.color }} aria-hidden />
                <span className="font-display font-bold text-[var(--text-primary)]">{svc.name}</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3 flex-1">{svc.description}</p>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-[var(--text-primary)]">{svc.startingFrom}</span>
                <Link
                  href={svc.href}
                  className="flex-shrink-0 text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1 transition-colors"
                  aria-label={`${c.learnMore}: ${svc.name}`}
                >
                  {c.learnMore}
                  <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
