'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    href: '/services/seo-content-marketing',
    accent: '#7C3AED',
    title: 'SEO & Content Marketing',
    description:
      "A beautiful website without traffic is a billboard in the desert. Our SEO team drives organic visitors to your new site with keyword-optimized content and technical SEO — so your investment starts generating returns from month one.",
    pricing: 'Starting from Rp 6 Juta/mo',
  },
  {
    href: '/services/paid-advertising',
    accent: '#D97706',
    title: 'Paid Advertising',
    description:
      'Drive immediate traffic to your new landing page or e-commerce store with targeted Google and Meta campaigns. We handle the ads, you handle the orders.',
    pricing: 'Starting from Rp 6 Juta/mo',
  },
] as const

export function WebsiteCrossSell() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: '#0C0818' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Pairs Well With</p>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Amplify your website.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CARDS.map((card, i) => (
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
                    Learn more →
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
