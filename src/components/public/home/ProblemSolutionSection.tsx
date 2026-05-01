'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

interface Card {
  problem: string
  problemDetail: string
  solution: string
  solutionDetail: string
}

const CARDS_ID: Card[] = [
  {
    problem: 'Agensi-agensi yang bekerja sendiri-sendiri',
    problemDetail: 'Kamu hire satu agensi untuk SEO, yang lain untuk social media, freelancer lagi untuk iklan. Tidak ada yang ngobrol satu sama lain. Pesan brand kamu jadi kacau di setiap channel.',
    solution: 'Satu tim terintegrasi untuk semua channel',
    solutionDetail: 'Strategi SEO menginformasikan copy iklan kamu. Konten social media jadi bahan blog. Data iklan mempertajam targeting organik. Semua saling menguatkan.',
  },
  {
    problem: 'Laporan penuh angka yang tidak berarti',
    problemDetail: 'Followers terus naik, impresi meroket, tapi pendapatan tidak bergerak. Dashboard yang terlihat keren, padahal tidak ada yang benar-benar bekerja.',
    solution: 'Kami optimalkan untuk revenue, leads, dan ROAS',
    solutionDetail: 'Transparansi penuh lewat GA4, dashboard Looker Studio, dan review bulanan yang fokus pada angka yang benar-benar menggerakkan bisnis kamu. Bukan screenshot pilihan.',
  },
  {
    problem: 'Konten generik yang daur ulang',
    problemDetail: 'Konten \'kustom\' kamu terlihat sangat mirip konten kompetitor. Wajar saja: template sama, foto stok sama, hanya logo yang berbeda.',
    solution: 'Setiap konten dibuat khusus untuk brand kamu',
    solutionDetail: 'Kreatif yang custom, riset tren lokal, dan konten yang dirancang sesuai cara audiens kamu mengonsumsi media. Tidak ada copy-paste.',
  },
]

const CARDS_EN: Card[] = [
  {
    problem: 'Siloed agencies with zero synergy',
    problemDetail: 'You hire one agency for SEO, another for social, a freelancer for ads. Nobody talks to each other. Your brand message fractures across channels.',
    solution: 'One integrated team running all channels',
    solutionDetail: 'Your SEO strategy informs your ad copy. Your social content feeds your blog. Your paid data refines your organic targeting. Everything compounds.',
  },
  {
    problem: 'Reports full of vanity metrics',
    problemDetail: 'Impressive follower counts and sky-high impressions, but your revenue hasn\'t moved. Pretty dashboards masking the fact that nothing is actually working.',
    solution: 'We optimize for revenue, leads, and ROAS',
    solutionDetail: 'Full GA4 transparency, Looker Studio dashboards, and monthly reviews focused on the numbers that actually grow your business. No cherry-picked screenshots.',
  },
  {
    problem: 'Generic recycled templates',
    problemDetail: "Your 'custom' content looks suspiciously like your competitor's. Because it is: same templates, same stock photos, your logo swapped in.",
    solution: 'Every piece built for your brand',
    solutionDetail: 'Custom creative, local trend research, and content designed for how your audience actually consumes media. No copy-paste.',
  },
]

const COPY = {
  id: {
    badge: 'Kenapa Logink?',
    headline: 'Masalah yang',
    headlineGradient: 'Kami Selesaikan',
    body: 'Agensi konvensional bekerja sendiri-sendiri. Vendor berbeda-beda, meeting yang tidak ada habisnya, dan nol sinergi. Logink dibangun berbeda: satu tim terintegrasi yang mengelola semua channel sekaligus, supaya setiap kampanye saling menguatkan.',
    link: 'Lihat bedanya →',
    problemLabel: 'Masalah',
    solutionLabel: 'Solusi Logink',
  },
  en: {
    badge: 'Why Logink?',
    headline: 'We Solve What Others',
    headlineGradient: "Can't",
    body: "Conventional agencies work in silos. Separate vendors, separate meetings, zero synergy. We built Logink to be different: one integrated team running every channel as a single system, so every campaign compounds on the last.",
    link: 'See how we\'re different →',
    problemLabel: 'Problem',
    solutionLabel: "Logink's Solution",
  },
}

function ProblemCard({ card, index, labels }: { card: Card; index: number; labels: { problemLabel: string; solutionLabel: string } }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden bg-white/4"
    >
      {/* Problem */}
      <div
        className="p-6 border-b border-[var(--border-default)]"
        style={{ background: 'rgba(239,68,68,0.06)', borderLeft: '3px solid rgba(239,68,68,0.5)' }}
      >
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#ef4444' }}>{labels.problemLabel}</div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{card.problem}</p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{card.problemDetail}</p>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div
        className="p-6"
        style={{ background: 'rgba(16,185,129,0.05)', borderLeft: '3px solid rgba(16,185,129,0.4)' }}
      >
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#10b981' }}>{labels.solutionLabel}</div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{card.solution}</p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{card.solutionDetail}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProblemSolutionSection({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = COPY[locale]
  const cards = locale === 'id' ? CARDS_ID : CARDS_EN
  const leftRef = useRef(null)
  const leftInView = useInView(leftRef, { once: true, amount: 0.3 })

  return (
    <section
      className="py-12 sm:py-16 lg:py-24 px-4 relative overflow-hidden"
      style={{ background: '#0F0A1E' }}
    >
      {/* Radial violet spotlight top-left */}
      <div
        className="absolute top-0 left-0 h-[600px] w-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at top left, rgba(124,58,237,0.07) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16 items-start">

          {/* Left sticky column */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -30 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:w-2/5 md:sticky md:top-28 flex-shrink-0"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-pink/20 bg-brand-pink/5 text-brand-pink text-xs font-semibold uppercase tracking-wider mb-6">
              {c.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-5 leading-tight">
              {c.headline}{' '}
              <span className="gradient-text">{c.headlineGradient}</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-base">
              {c.body}
            </p>
            <Link
              href={locale === 'id' ? '/about' : '/en/about'}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:text-brand-pink transition-colors group"
            >
              {c.link}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Right scrollable cards */}
          <div className="md:w-3/5 flex flex-col gap-6">
            {cards.map((card, i) => (
              <ProblemCard key={i} card={card} index={i} labels={{ problemLabel: c.problemLabel, solutionLabel: c.solutionLabel }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
