'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const FUNNEL = [
  { label: 'Awareness', value: 200000, display: '200,000', color: '#A855F7', width: 100 },
  { label: 'Consideration', value: 16500, display: '16,500', color: '#D81C5C', width: 77 },
  { label: 'Intent', value: 4200, display: '4,200', color: '#F88438', width: 52 },
  { label: 'Conversion', value: 840, display: '840', color: '#10B981', width: 30 },
]

const RATES = ['8.25% CTR', '25.5% CVR', '20% Close']

const ACCENT = '#F88438'

const HERO_COPY = {
  id: {
    badge: 'Jasa Iklan Digital Jakarta: Google Ads & Meta Ads, ROAS 2–4× Terbukti',
    trustPills: ['✓ Rata-rata ROAS 2-4×', '✓ Akses akun penuh', '✓ Laporan optimasi mingguan'],
    home: 'Beranda', homeHref: '/', services: 'Layanan', servicesHref: '/layanan',
    title1: 'Setiap Rupiah Terinvestasi.', title2: 'Return Maksimal Terwujud.',
    desc: 'Kampanye berbasis data di Google, Meta, TikTok, dan marketplace Indonesia. Kami membidik audiens yang tepat di momen yang tepat, dan mengoptimasi tanpa henti hingga ROAS mencapai 2–4×. Tanpa budget terbuang, tanpa tebak-tebakan, dan tanpa kontrak lock-in jangka panjang.',
    metricChip: 'ROAS 2–4×',
    ctaPrimary: 'Mulai Konsultasi Gratis →', ctaHref: '/contact?service=paid-advertising',
    ctaWhatsApp: 'Chat di WhatsApp',
    waMessage: 'Halo Logink! Saya tertarik dengan layanan Paid Advertising.',
    ctaSecondary: 'Lihat Harga',
    roasDay: 'di hari ke-90',
  },
  en: {
    badge: 'Digital Advertising Jakarta: Google & Meta Ads, Proven 2–4× ROAS',
    trustPills: ['✓ Average ROAS 2–4×', '✓ Full account access', '✓ Weekly optimization reports'],
    home: 'Home', homeHref: '/en', services: 'Services', servicesHref: '/en/services',
    title1: 'Every Rupiah Invested.', title2: 'Maximum Return Realized.',
    desc: 'Data-driven campaigns on Google, Meta, TikTok, and Indonesian marketplaces. We target the right audience at the right moment, optimizing relentlessly until ROAS hits 2–4×. No wasted budget, no guesswork, no long-term lock-in contracts.',
    metricChip: 'ROAS 2–4×',
    ctaPrimary: 'Start Free Consultation →', ctaHref: '/en/contact?service=paid-advertising',
    ctaWhatsApp: 'Chat on WhatsApp',
    waMessage: 'Hi Logink! I am interested in your Paid Advertising service.',
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
      <div className="flex-1 relative h-9 rounded-lg overflow-hidden bg-[rgba(35,26,38,0.04)]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-lg flex items-center px-3"
          style={{ background: `${bar.color}26` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${bar.width}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-lg"
            style={{ background: `linear-gradient(90deg, ${bar.color}4D, ${bar.color}14)` }}
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
      className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-36 md:pt-32 pb-16 mesh-gradient"
    >
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
      {/* Single orange service-accent orb */}
      <div
        className="orb top-16 right-[8%] h-96 w-96 opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(248,132,56,0.22) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
          <Link href={c.homeHref} className="hover:text-[var(--text-primary)] transition-colors">{c.home}</Link>
          <span>/</span>
          <Link href={c.servicesHref} className="hover:text-[var(--text-primary)] transition-colors">{c.services}</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">Paid Advertising</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-6"
          >
            <h1
              className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(248,132,56,0.10)', color: '#C2410C', border: '1px solid rgba(248,132,56,0.30)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} aria-hidden />
              {c.badge}
            </h1>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
              {c.title1}{' '}
              <span className="gradient-text">{c.title2}</span>
            </h2>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {c.desc}
            </p>

            {/* Key ROAS metric chip, CRO anchor */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[var(--border-default)] shadow-sm">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8M15 7h6v6" />
              </svg>
              <span className="font-display text-base font-bold text-[var(--text-primary)]">{c.metricChip}</span>
              <span className="text-xs text-[var(--text-muted)]">{c.roasDay}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={c.ctaHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200"
              >
                {c.ctaPrimary}
              </Link>
              <a
                href={`https://wa.me/628139453933?text=${encodeURIComponent(c.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.ctaWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-sm hover:scale-[1.02] transition-all duration-200"
                style={{ background: '#25D366' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {c.ctaWhatsApp}
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {c.ctaSecondary}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {c.trustPills.map((pill) => (
                <span key={pill} className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-white text-[var(--text-secondary)]">
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Animated Funnel */}
          <motion.div
            ref={funnelRef}
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-2xl border border-[var(--border-default)] bg-white p-6 space-y-5 shadow-card"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
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
                className="flex items-center justify-center gap-3 pt-2 border-t border-[var(--border-default)]"
                initial={{ opacity: 0, y: 8 }}
                animate={funnelInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.6 }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm"
                  style={{ borderColor: 'rgba(16,185,129,0.30)', background: 'rgba(16,185,129,0.10)', color: '#059669' }}
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  ROAS: 3.2×+
                </div>
                <span className="text-xs text-[var(--text-muted)]">{c.roasDay}</span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
