'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

const CLIENT_LOGOS = [
  'Tokopedia', 'Shopee', 'Gojek', 'Traveloka', 'Bukalapak',
  'OVO', 'Grab', 'Lazada', 'Blibli', 'Tiket.com',
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden mesh-gradient px-4 pt-16">
      {/* Floating warm orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb left-1/4 top-1/4 h-96 w-96 bg-brand-orange/20" />
        <div className="orb bottom-1/4 right-1/4 h-96 w-96 bg-brand-crimson/10" style={{ animationDelay: '5s' }} />
        <div className="orb left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-brand-purple/10" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-crimson/20 bg-brand-crimson/5 px-4 py-1.5 text-sm font-medium text-brand-crimson"
        >
          <span className="h-2 w-2 rounded-full bg-brand-crimson animate-pulse" />
          360° Digital Marketing Agency · Jakarta, Indonesia
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--text-primary)]"
        >
          Grow Your Brand{' '}
          <span className="gradient-text">Digitally</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl"
        >
          360° digital marketing agency built to help Indonesian brands dominate online.
          Strategy, creativity, and data: all in one engine.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full gradient-bg px-8 py-4 text-sm font-semibold text-white shadow-cta transition-all duration-200 hover:scale-[1.02] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
          >
            Get a Free Quote
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] px-8 py-4 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-white hover:border-brand-crimson/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
          >
            See Our Work
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { value: '2-4x', label: 'ROAS' },
            { value: '150+', label: 'Articles/Month' },
            { value: '5', label: 'Integrated Services' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-bold tracking-tight gradient-text">{s.value}</div>
              <div className="mt-0.5 text-xs text-[var(--text-muted)]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Client marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 w-full border-t border-[var(--border-default)] bg-white/60 py-4"
      >
        <div className="marquee-container">
          <div className="marquee-track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <span
                key={i}
                className="mx-10 inline-block select-none text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
