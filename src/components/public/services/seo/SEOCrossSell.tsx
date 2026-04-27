'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CROSS_SELLS_ID = [
  {
    slug: 'paid-advertising',
    name: 'Paid Advertising',
    color: '#D97706',
    description:
      'Retarget pengunjung organikmu dengan iklan presisi. Pengguna yang menemukanmu via search tapi belum konversi mendapat touchpoint kedua di Meta dan Google Display.',
    startingFrom: 'Mulai dari Rp 6 Juta/bln',
  },
  {
    slug: 'website-landing-page',
    name: 'Website & Landing Page',
    color: '#A78BFA',
    description:
      'Website yang cepat dan dioptimasi untuk konversi adalah fondasi SEO. Kalau situsmu lambat atau strukturnya buruk, tidak ada konten yang bisa menyelamatkan rankingmu.',
    startingFrom: 'Mulai dari Rp 10 Juta',
  },
]

const CROSS_SELLS_EN = [
  {
    slug: 'paid-advertising',
    name: 'Paid Advertising',
    color: '#D97706',
    description:
      'Retarget your organic visitors with precision ads. Users who found you via search but didn\'t convert get a second touchpoint on Meta and Google Display.',
    startingFrom: 'Starting from Rp 6 Juta/mo',
  },
  {
    slug: 'website-landing-page',
    name: 'Website & Landing Page',
    color: '#A78BFA',
    description:
      'A fast, conversion-optimized website is the foundation of SEO. If your site is slow or poorly structured, no amount of content will save your rankings.',
    startingFrom: 'Starting from Rp 10 Juta',
  },
]

const CROSSSELL_COPY = {
  id: { eyebrow: 'Perkuat Hasilmu', heading: 'Cocok dikombinasikan dengan', sub: 'SEO membawa trafficnya — layanan ini mengubahnya jadi revenue.', learnMore: 'Selengkapnya', basePath: '/services' },
  en: { eyebrow: 'Amplify Your Results', heading: 'Pairs well with', sub: 'SEO brings the traffic — these services turn it into revenue.', learnMore: 'Learn more', basePath: '/en/services' },
}

export function SEOCrossSell({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const items = locale === 'en' ? CROSS_SELLS_EN : CROSS_SELLS_ID
  const c = CROSSSELL_COPY[locale]

  return (
    <section className="py-16 px-4" style={{ background: '#0C0818' }}>
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">{c.eyebrow}</div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">{c.heading}</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            {c.sub}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((svc, i) => (
            <motion.div
              key={svc.slug}
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start sm:items-center justify-between gap-5 p-5 rounded-2xl border bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-all duration-200 hover:translate-x-1"
              style={{ borderLeft: `3px solid ${svc.color}`, borderColor: 'var(--border-default)', borderLeftColor: svc.color }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: svc.color }} />
                  <span className="font-bold text-[var(--text-primary)]">{svc.name}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-2">{svc.description}</p>
                <span className="text-xs font-semibold" style={{ color: svc.color }}>{svc.startingFrom}</span>
              </div>
              <Link
                href={`${c.basePath}/${svc.slug}`}
                className="flex-shrink-0 text-sm font-semibold transition-colors hover:opacity-80 flex items-center gap-1"
                style={{ color: svc.color }}
              >
                {c.learnMore}
                <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
