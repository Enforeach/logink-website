'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { WHATSAPP_URL } from '@/lib/constants'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const badgeItem = {
  hidden: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0 },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 animated-mesh" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.15) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Badge with shimmer */}
          <motion.div variants={badgeItem} transition={{ duration: 0.5, ease: 'easeOut' }} className="mb-8">
            <span className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-violet/30 bg-brand-violet/5 text-sm font-medium text-brand-violet shimmer-badge">
              <span className="h-2 w-2 rounded-full bg-brand-violet animate-pulse" />
              360° Digital Marketing Agency · Jakarta, Indonesia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight tracking-tight"
          >
            Grow Your Brand{' '}
            <span className="gradient-text">Digitally</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            360° digital marketing agency built to help brands dominate online.
            Strategy, creativity, and data — all in one integrated engine.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-sm hover:scale-[1.03] hover:shadow-xl hover:shadow-brand-violet/25 transition-all duration-200"
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

          {/* Stats row */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-10 sm:gap-16"
          >
            {[
              { value: '2–4x', label: 'Average ROAS', glow: '#7C3AED' },
              { value: '150+', label: 'Articles / Month', glow: '#DB2777' },
              { value: '5', label: 'Integrated Services', glow: '#D97706' },
            ].map((s) => (
              <div key={s.label} className="relative text-center">
                {/* Glow behind number */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${s.glow}30 0%, transparent 70%)`,
                    animationDuration: '3s',
                  }}
                />
                <div className="relative text-3xl font-extrabold gradient-text">{s.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Scroll</span>
        <div style={{ animation: 'bounce-arrow 1.8s ease-in-out infinite' }}>
          <svg className="h-5 w-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
