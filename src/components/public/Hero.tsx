'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { WHATSAPP_URL } from '@/lib/constants'

const CLIENT_LOGOS = [
  'Tokopedia', 'Shopee', 'Gojek', 'Traveloka', 'Bukalapak',
  'OVO', 'Grab', 'Lazada', 'Blibli', 'Tiket.com',
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-gradient px-4 pt-16">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-violet/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-pink/10 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-brand-amber/5 blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-violet/30 bg-brand-violet/5 text-sm font-medium text-brand-violet mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-brand-violet animate-pulse" />
          360° Digital Marketing Agency · Jakarta, Indonesia
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight"
        >
          Grow Your Brand{' '}
          <span className="gradient-text">Digitally</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          360° digital marketing agency built to help Indonesian brands dominate online.
          Strategy, creativity, and data: all in one engine.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-sm hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-violet/30 transition-all duration-200"
          >
            Get a Free Quote
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--bg-elevated)] hover:border-brand-violet/50 transition-all duration-200"
          >
            See Our Work
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-16 text-center"
        >
          {[
            { value: '2-4x', label: 'ROAS' },
            { value: '150+', label: 'Articles/Month' },
            { value: '5', label: 'Integrated Services' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Client marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="w-full border-t border-[var(--border-default)] bg-[var(--bg-surface)]/30 backdrop-blur-sm py-4 relative z-10"
      >
        <div className="marquee-container">
          <div className="marquee-track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <span
                key={i}
                className="inline-block mx-10 text-sm font-semibold text-[var(--text-muted)] tracking-wider uppercase select-none"
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
