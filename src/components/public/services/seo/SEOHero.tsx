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
    desc: 'Kami bangun kehadiran organic search yang terus berkompon setiap bulan. Dari strategi keyword hingga 150+ artikel per bulan, setiap konten dirancang untuk menangkap traffic high-intent dan mengubahnya jadi revenue.',
    descHighlight: 'Tidak ada vanity metric. Tidak ada template daur ulang. Hanya pertumbuhan sistematis.',
    ctaPrimary: 'Mulai Konsultasi Gratis',
    ctaHref: '/contact?service=seo-content-marketing',
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
    ctaPrimary: 'Start Free Consultation',
    ctaHref: '/en/contact?service=seo-content-marketing',
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

export function SEOHero({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = COPY[locale]
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-24 pb-16">
      <div className="absolute inset-0 animated-mesh opacity-80" />
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-1/4 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.14) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto w-full z-10">
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
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
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/8 text-xs font-semibold text-violet-400 mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              {c.badge}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight mb-5"
            >
              {c.title1}{' '}
              <span className="gradient-text">{c.title2}</span>{' '}
              {c.title3}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg"
            >
              {c.desc}{' '}
              <span className="text-[var(--text-primary)] font-medium">{c.descHighlight}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <Link
                href={c.ctaHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-bg text-white font-semibold text-sm hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-200"
              >
                {c.ctaPrimary}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--bg-elevated)] transition-all duration-200"
              >
                {c.ctaSecondary}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {c.trustPills.map((pill) => (
                <span key={pill} className="text-xs text-[var(--text-secondary)] px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)]">
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
              <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] overflow-hidden shadow-2xl shadow-violet-500/10">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">keyword-tracker.csv</span>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                      className="grid grid-cols-[1fr_52px_60px] px-3 py-2.5 rounded-lg items-center transition-colors hover:bg-violet-500/5"
                      style={{ background: i % 2 === 0 ? 'rgba(124,58,237,0.05)' : 'transparent' }}
                    >
                      <span className="text-xs text-[var(--text-secondary)] truncate pr-2">{r.kw}</span>
                      <span className="text-center text-sm font-bold text-violet-400">{r.rank}</span>
                      <span className="text-right text-xs font-semibold text-emerald-400">↑ {r.change}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-[var(--border-default)] flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">{c.updatedToday}</span>
                  <span className="text-emerald-400 font-semibold">{c.allImproving}</span>
                </div>
              </div>

              {/* Pulsing badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg shadow-violet-500/30"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#DB2777)' }}
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
