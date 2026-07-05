'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CROSS_SELLS_ID = [
  {
    slug: 'paid-ads',
    name: 'Paid Advertising',
    color: '#F88438',
    description:
      'Retarget pengunjung organik Anda dengan iklan yang presisi. Pengguna yang menemukan Anda lewat search tetapi belum konversi mendapat touchpoint kedua di Meta dan Google Display.',
    startingFrom: 'Mulai dari Rp 6 Juta/bln',
  },
  {
    slug: 'website-development',
    name: 'Website & Landing Page',
    color: '#C084FC',
    description:
      'Website yang cepat dan dioptimasi untuk konversi adalah fondasi SEO. Jika situs Anda lambat atau strukturnya buruk, tidak ada konten yang bisa menyelamatkan ranking Anda.',
    startingFrom: 'Mulai dari Rp 10 Juta',
  },
]

const CROSS_SELLS_EN = [
  {
    slug: 'paid-advertising',
    name: 'Paid Advertising',
    color: '#F88438',
    description:
      'Retarget your organic visitors with precision ads. Users who found you via search but didn\'t convert get a second touchpoint on Meta and Google Display.',
    startingFrom: 'Starting from Rp 6 Juta/mo',
  },
  {
    slug: 'website-landing-page',
    name: 'Website & Landing Page',
    color: '#C084FC',
    description:
      'A fast, conversion-optimized website is the foundation of SEO. If your site is slow or poorly structured, no amount of content will save your rankings.',
    startingFrom: 'Starting from Rp 10 Juta',
  },
]

const CROSSSELL_COPY = {
  id: { eyebrow: 'Perkuat Hasil Anda', heading: 'Cocok dikombinasikan dengan', sub: 'SEO mendatangkan trafficnya; layanan ini mengubahnya menjadi revenue.', learnMore: 'Selengkapnya', basePath: '/layanan' },
  en: { eyebrow: 'Amplify Your Results', heading: 'Pairs well with', sub: 'SEO brings the traffic; these services turn it into revenue.', learnMore: 'Learn more', basePath: '/en/services' },
}

export function SEOCrossSell({ locale = 'id' }: { locale?: 'id' | 'en' }) {
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
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            {c.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((svc, i) => (
            <motion.div
              key={svc.slug}
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
                  href={`${c.basePath}/${svc.slug}`}
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
