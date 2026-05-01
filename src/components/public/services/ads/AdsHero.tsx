'use client'

import Link from 'next/link'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const FUNNEL = [
  { label: 'Awareness', value: 200000, display: '200,000', color: '#7C3AED', width: 100 },
  { label: 'Consideration', value: 16500, display: '16,500', color: '#DB2777', width: 77 },
  { label: 'Intent', value: 4200, display: '4,200', color: '#D97706', width: 52 },
  { label: 'Conversion', value: 840, display: '840', color: '#10B981', width: 30 },
]

const RATES = ['8.25% CTR', '25.5% CVR', '20% Close']

const HERO_COPY = {
  id: {
    badge: 'Jasa Iklan Digital Jakarta — Google Ads & Meta Ads, ROAS 2–4× Terbukti',
    trustPills: ['✓ Rata-rata ROAS 2-4×', '✓ Akses akun penuh', '✓ Laporan optimasi mingguan'],
    home: 'Beranda', homeHref: '/', services: 'Layanan', servicesHref: '/layanan',
    title1: 'Setiap Rupiah Terinvestasi.', title2: 'Return Maksimal Terwujud.',
    desc: 'Kampanye berbasis data di Google, Meta, TikTok, dan marketplace Indonesia. Kami bidik audiens yang tepat di momen yang tepat, mengoptimalkan tanpa henti sampai ROAS mencapai 2–4×. Tanpa budget terbuang, tanpa tebak-tebakan, tanpa kontrak lock-in jangka panjang.',
    ctaPrimary: 'Mulai Konsultasi Gratis →', ctaHref: '/contact?service=paid-advertising',
    ctaSecondary: 'Lihat Harga',
    roasDay: 'di hari ke-90',
  },
  en: {
    badge: 'Digital Advertising Jakarta — Google & Meta Ads, Proven 2–4× ROAS',
    trustPills: ['✓ Average ROAS 2–4×', '✓ Full account access', '✓ Weekly optimization reports'],
    home: 'Home', homeHref: '/en', services: 'Services', servicesHref: '/en/services',
    title1: 'Every Rupiah Invested.', title2: 'Maximum Return Realized.',
    desc: 'Data-driven campaigns on Google, Meta, TikTok, and Indonesian marketplaces. We target the right audience at the right moment, optimizing relentlessly until ROAS hits 2–4×. No wasted budget, no guesswork, no long-term lock-in contracts.',
    ctaPrimary: 'Start Free Consultation →', ctaHref: '/en/contact?service=paid-advertising',
    ctaSecondary: 'See Pricing',
    roasDay: 'by day 90',
  },
}

function AnimatedBar({ bar, index, inView }: { bar: typeof FUNNEL[0]; index: number; inView: boolean }) {
  const [showRate, setShowRate] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setShowRate(true), (index + 1) * 300 + 900)
    return () => clearTimeout(t)
  }, [inView, index])

  return (
    <div className="flex items-center gap-3">
      <div className="w-24 text-right text-xs text-[var(--text-muted)] flex-shrink-0">{bar.label}</div>
      <div className="flex-1 relative h-9 rounded-lg overflow-hidden bg-white/5">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-lg flex items-center px-3"
          style={{ background: `${bar.color}33` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${bar.width}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-lg"
            style={{ background: `linear-gradient(90deg, ${bar.color}66, ${bar.color}22)` }}
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="relative text-xs font-bold"
            style={{ color: bar.color }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.3 + 0.6 }}
          >
            {bar.display}
          </motion.span>
        </motion.div>
      </div>
      {index < FUNNEL.length - 1 && (
        <motion.span
          className="text-[10px] text-[var(--text-muted)] flex-shrink-0 w-16 text-center"
          initial={{ opacity: 0 }}
          animate={showRate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {RATES[index]}
        </motion.span>
      )}
      {index === FUNNEL.length - 1 && <div className="w-16" />}
    </div>
  )
}

export function AdsHero({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const funnelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const funnelInView = useInView(funnelRef, { once: true, margin: '-50px' })
  const c = HERO_COPY[locale]

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-24 pb-16"
      style={{ background: '#0F0A1E' }}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 animated-mesh opacity-60" />
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 left-1/4 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <h1 className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-semibold text-amber-400">{c.badge}</span>
          </h1>

          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[var(--text-primary)]">
            {c.title1}{' '}
            <span className="gradient-text">{c.title2}</span>
          </h2>

          <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md">
            {c.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {c.trustPills.map((pill) => (
              <span key={pill} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text-secondary)]">
                {pill}
              </span>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              href={c.ctaHref}
              className="gradient-bg px-6 py-3 rounded-xl font-semibold text-white text-sm hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              {c.ctaPrimary}
            </Link>
            <a
              href="#pricing"
              className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/15 text-[var(--text-secondary)] hover:border-white/30 hover:text-[var(--text-primary)] transition-all"
            >
              {c.ctaSecondary}
            </a>
          </div>
        </motion.div>

        {/* Right: Animated Funnel */}
        <motion.div
          ref={funnelRef}
          initial={{ opacity: 0, x: 40, rotate: 1 }}
          animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-6 space-y-5 shadow-2xl shadow-black/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Campaign Funnel · Live</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">Q1 2025</span>
            </div>

            {/* Bars */}
            <div className="space-y-3">
              {FUNNEL.map((bar, i) => (
                <AnimatedBar key={bar.label} bar={bar} index={i} inView={funnelInView} />
              ))}
            </div>

            {/* ROAS badge */}
            <motion.div
              className="flex items-center justify-center gap-3 pt-2 border-t border-white/10"
              initial={{ opacity: 0, y: 8 }}
              animate={funnelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6 }}
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm"
                style={{ borderColor: '#10B98144', background: '#10B98115', color: '#10B981' }}
                animate={{ boxShadow: ['0 0 0px #10B98100', '0 0 16px #10B98140', '0 0 0px #10B98100'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                ROAS: 3.2×+
              </motion.div>
              <span className="text-xs text-[var(--text-muted)]">{c.roasDay}</span>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
