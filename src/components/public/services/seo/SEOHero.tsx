'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const COPY = {
  id: {
    badge: 'Jasa SEO Profesional Jakarta — Ranking #1 Google, Traffic Organik Berkembang',
    trustPills: [
      '✓ Penulis native Bahasa Indonesia',
      '✓ Transparansi GA4 penuh',
      '✓ Tanpa kontrak lock-in',
    ],
    home: 'Beranda',
    services: 'Layanan',
    homeHref: '/',
    servicesHref: '/layanan',
    title1: 'Ranking Lebih Tinggi.',
    title2: 'Jangkauan Lebih Luas.',
    title3: 'Konversi Lebih Baik.',
    desc: 'Kami membangun kehadiran organic search yang efeknya terus berlipat setiap bulan. Dari strategi keyword hingga 150+ artikel per bulan, setiap konten dirancang untuk menangkap traffic high-intent dan mengubahnya menjadi revenue.',
    descHighlight: 'Tanpa vanity metric. Tanpa template pasaran. Hanya pertumbuhan yang sistematis.',
    metricChip: '2.5× traffic organik dalam 6 bulan',
    ctaPrimary: 'Mulai Konsultasi Gratis',
    ctaHref: '/contact?service=seo-content-marketing',
    ctaWhatsApp: 'Chat di WhatsApp',
    waMessage: 'Halo Logink! Saya tertarik dengan layanan SEO & Content Marketing.',
    ctaSecondary: 'Lihat Harga',
    updatedToday: 'Diperbarui hari ini · Google.co.id',
    allImproving: 'Semua naik ↑',
    changeLabel: 'Δ Naik',
  },
  en: {
    badge: 'Professional SEO Services Jakarta — Rank #1 on Google, Grow Organic Traffic',
    trustPills: [
      '✓ Bahasa Indonesia native writers',
      '✓ Full GA4 transparency',
      '✓ No lock-in contracts',
    ],
    home: 'Home',
    services: 'Services',
    homeHref: '/en',
    servicesHref: '/en/services',
    title1: 'Rank Higher.',
    title2: 'Reach Further.',
    title3: 'Convert Better.',
    desc: 'We build organic search presence that compounds month over month. From keyword strategy to 150+ articles per month, every piece is crafted to capture high-intent traffic and turn it into revenue.',
    descHighlight: 'No vanity metrics. No recycled templates. Just systematic growth.',
    metricChip: '2.5× organic traffic in 6 months',
    ctaPrimary: 'Start Free Consultation',
    ctaHref: '/en/contact?service=seo-content-marketing',
    ctaWhatsApp: 'Chat on WhatsApp',
    waMessage: 'Hi Logink! I am interested in your SEO & Content Marketing service.',
    ctaSecondary: 'See Pricing',
    updatedToday: 'Updated today · Google.co.id',
    allImproving: 'All improving ↑',
    changeLabel: 'Δ Change',
  },
}

const KEYWORD_ROWS = [
  { kw: 'jasa digital marketing jakarta', rank: '#1', change: '+5' },
  { kw: 'agency social media indonesia', rank: '#2', change: '+7' },
  { kw: 'google ads management jakarta', rank: '#3', change: '+11' },
  { kw: 'content marketing seo murah', rank: '#4', change: '+14' },
]

const ACCENT = '#A855F7'

export function SEOHero({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = COPY[locale]
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-24 pb-16 mesh-gradient">
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
      {/* Single accent-tinted orb */}
      <div
        className="orb top-16 right-[8%] h-96 w-96 opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.20) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto w-full z-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
          <Link href={c.homeHref} className="hover:text-[var(--text-primary)] transition-colors">{c.home}</Link>
          <span>/</span>
          <Link href={c.servicesHref} className="hover:text-[var(--text-primary)] transition-colors">{c.services}</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">SEO & Content Marketing</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(168,85,247,0.10)', color: '#9333EA', border: '1px solid rgba(168,85,247,0.25)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
              {c.badge}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-[1.08] tracking-[-0.03em] mb-5"
            >
              {c.title1}{' '}
              <span className="gradient-text">{c.title2}</span>{' '}
              {c.title3}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed max-w-lg"
            >
              {c.desc}{' '}
              <span className="text-[var(--text-primary)] font-medium">{c.descHighlight}</span>
            </motion.p>

            {/* Key metric chip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border-default)] shadow-sm mb-8"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8M15 7h6v6" />
              </svg>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{c.metricChip}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <Link
                href={c.ctaHref}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200"
              >
                {c.ctaPrimary}
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={`https://wa.me/6287782495916?text=${encodeURIComponent(c.waMessage)}`}
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
              <Link
                href="#pricing"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {c.ctaSecondary}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {c.trustPills.map((pill) => (
                <span key={pill} className="text-xs text-[var(--text-secondary)] px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-white">
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: keyword tracker visual */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md mx-auto lg:max-w-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden shadow-card">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-tint-lilac)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">keyword-tracker.csv</span>
                  <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </div>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-[1fr_52px_60px] px-3 py-1.5 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                    <span>Keyword</span>
                    <span className="text-center">Rank</span>
                    <span className="text-right">{c.changeLabel}</span>
                  </div>
                  {KEYWORD_ROWS.map((r, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_52px_60px] px-3 py-2.5 rounded-lg items-center transition-colors hover:bg-[var(--bg-tint-lilac)]"
                      style={{ background: i % 2 === 0 ? 'rgba(168,85,247,0.05)' : 'transparent' }}
                    >
                      <span className="text-xs text-[var(--text-secondary)] truncate pr-2">{r.kw}</span>
                      <span className="text-center text-sm font-bold" style={{ color: '#9333EA' }}>{r.rank}</span>
                      <span className="text-right text-xs font-semibold text-emerald-600">↑ {r.change}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-[var(--border-default)] flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">{c.updatedToday}</span>
                  <span className="text-emerald-600 font-semibold">{c.allImproving}</span>
                </div>
              </div>

              {/* Pulsing badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-xs font-bold text-white gradient-bg shadow-cta"
              >
                Page #1 ✓
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
