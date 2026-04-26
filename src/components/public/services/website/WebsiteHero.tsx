'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

function PageSpeedRing({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0)
  const circumference = 2 * Math.PI * 20

  useEffect(() => {
    let start: number | null = null
    const duration = 1200
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setDisplayed(Math.round(progress * score))
      if (progress < 1) requestAnimationFrame(step)
    }
    const timeout = setTimeout(() => requestAnimationFrame(step), 900)
    return () => clearTimeout(timeout)
  }, [score])

  const strokeDashoffset = circumference - (displayed / 100) * circumference

  return (
    <div className="relative flex items-center justify-center h-14 w-14">
      <svg className="absolute inset-0 -rotate-90" width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <motion.circle
          cx="28" cy="28" r="20" fill="none"
          stroke="#10B981" strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.9 }}
        />
      </svg>
      <span className="text-xs font-bold text-[#10B981]">{displayed}</span>
    </div>
  )
}

export function WebsiteHero() {
  const browserControls = useAnimation()
  const innerControls = useAnimation()

  useEffect(() => {
    browserControls.start({ opacity: 1, x: 0 }).then(() => {
      innerControls.start('visible')
    })
  }, [browserControls, innerControls])

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 8 },
    visible: (i: number) => ({ opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.12 + 0.4 } }),
  }

  const badges = [
    { label: 'Performance', score: 95, color: '#10B981' },
    { label: 'SEO', score: 100, color: '#10B981' },
    { label: 'Accessibility', score: 95, color: '#10B981' },
  ]

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: '#0F0A1E' }}
    >
      {/* Teal radial from top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(6,182,212,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-3 py-1 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
            <span className="text-xs font-semibold text-[#06B6D4]">Website & Landing Page</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-tight mb-5">
            Convert Visitors Into Customers.{' '}
            <span className="gradient-text">Built to Perform.</span>
          </h1>

          <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
            We design and build high-performance websites and landing pages — fast, mobile-first, and wired for conversion. From campaign landing pages to full e-commerce stores, every site is built to load in under 2 seconds, rank on Google, and turn traffic into revenue.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {['Under 2s load time', 'Mobile-first responsive', 'GA4 + pixel tracking included'].map((pill) => (
              <span key={pill} className="inline-flex items-center gap-1.5 text-xs text-[#10B981] font-medium">
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {pill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?service=website-landing-page"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white gradient-bg shadow-lg transition-transform hover:scale-105"
            >
              Start Free Consultation →
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-white/40"
            >
              See Pricing
            </a>
          </div>
        </motion.div>

        {/* Right — Browser mockup */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={browserControls}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: 0 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-2xl border border-white/10 bg-[#13102A] shadow-2xl overflow-hidden w-full max-w-sm"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0D0A1F]">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 mx-3 flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1">
                  <svg className="h-3 w-3 text-[#10B981]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] text-[var(--text-muted)]">yourwebsite.com</span>
                </div>
              </div>

              {/* Browser content */}
              <div className="p-4 space-y-3 relative">
                {/* Hero section wireframe */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={innerControls}
                  variants={{ visible: { opacity: 1, transition: { delay: 0.2 } } }}
                  className="rounded-lg p-3 space-y-2"
                  style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(124,58,237,0.10))' }}
                >
                  <div className="h-2 w-3/4 rounded bg-white/20" />
                  <div className="h-1.5 w-1/2 rounded bg-white/10" />
                  <div className="h-6 w-20 rounded-md mt-2" style={{ background: 'rgba(6,182,212,0.4)' }} />
                </motion.div>

                {/* Card grid wireframe */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={innerControls}
                  variants={{ visible: { opacity: 1, transition: { delay: 0.35 } } }}
                  className="grid grid-cols-3 gap-2"
                >
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-md border border-white/10 bg-white/5 p-2 space-y-1">
                      <div className="h-1.5 w-full rounded bg-white/15" />
                      <div className="h-1 w-2/3 rounded bg-white/10" />
                    </div>
                  ))}
                </motion.div>

                {/* Analytics overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={innerControls}
                  variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.5 } } }}
                  className="absolute bottom-4 right-4 rounded-xl border border-white/10 bg-[#0D0A1F]/90 p-3 backdrop-blur-sm flex items-center gap-3"
                >
                  <PageSpeedRing score={95} />
                  <div className="space-y-1">
                    <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">PageSpeed</div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={innerControls}
                      variants={{ visible: { opacity: 1, transition: { delay: 1.4 } } }}
                      className="text-[9px] text-[var(--text-muted)]"
                    >
                      0.8s LCP · 0 CLS
                    </motion.div>
                    {/* Mini line chart */}
                    <svg width="56" height="16" viewBox="0 0 56 16">
                      <motion.polyline
                        points="0,14 10,10 20,11 30,6 40,7 56,2"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Performance badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.label}
                custom={i}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1"
              >
                <svg className="h-3 w-3 text-[#10B981]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] font-semibold text-[#10B981]">{badge.label} {badge.score}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
