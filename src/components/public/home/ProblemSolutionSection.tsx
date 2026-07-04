'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X, MousePointerClick, ArrowRight } from 'lucide-react'

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
    hint: 'Arahkan kursor atau ketuk kartu untuk melihat solusinya',
    link: 'Lihat bedanya →',
    problemLabel: 'Masalah',
    solutionLabel: 'Solusi Logink',
  },
  en: {
    badge: 'Why Logink?',
    headline: 'We Solve What Others',
    headlineGradient: "Can't",
    body: "Conventional agencies work in silos. Separate vendors, separate meetings, zero synergy. We built Logink to be different: one integrated team running every channel as a single system, so every campaign compounds on the last.",
    hint: 'Hover or tap a card to reveal the solution',
    link: 'See how we\'re different →',
    problemLabel: 'Problem',
    solutionLabel: "Logink's Solution",
  },
}

const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

function CardState({
  label,
  title,
  detail,
  solved,
}: {
  label: string
  title: string
  detail: string
  solved: boolean
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="[grid-area:1/1] flex items-start gap-4"
    >
      <span
        aria-hidden="true"
        className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={
          solved
            ? { background: 'rgba(216,28,92,0.10)', color: 'var(--brand-crimson)' }
            : { background: 'rgba(220,38,38,0.10)', color: '#DC2626' }
        }
      >
        {solved ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <X className="h-4 w-4" strokeWidth={2.5} />}
      </span>
      <span className="block">
        <span
          className="block text-xs font-bold uppercase tracking-widest mb-1.5"
          style={{ color: solved ? 'var(--brand-crimson)' : '#DC2626' }}
        >
          {label}
        </span>
        <span
          className="block text-base font-semibold mb-1.5"
          style={{ color: solved ? 'var(--text-primary)' : 'rgba(35,26,38,0.78)' }}
        >
          {title}
        </span>
        <span className="block text-sm leading-relaxed" style={{ color: solved ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
          {detail}
        </span>
      </span>
    </motion.span>
  )
}

function FlipCard({
  card,
  index,
  labels,
}: {
  card: Card
  index: number
  labels: { problemLabel: string; solutionLabel: string }
}) {
  const [solved, setSolved] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      <button
        type="button"
        aria-pressed={solved}
        onMouseEnter={() => canHover() && setSolved(true)}
        onMouseLeave={() => canHover() && setSolved(false)}
        onFocus={(e) => e.target.matches(':focus-visible') && setSolved(true)}
        onBlur={() => setSolved(false)}
        onClick={() => {
          // ponytail: hover reveals on desktop; click only toggles on touch
          if (!canHover()) setSolved((s) => !s)
        }}
        className={`relative w-full text-left rounded-2xl bg-white border overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-tint-rose)] ${
          solved
            ? 'border-transparent -translate-y-1 shadow-[0_20px_44px_-16px_rgba(216,28,92,0.22)]'
            : 'border-[var(--border-default)]'
        }`}
      >
        {/* Gradient left edge — solution state */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-1 gradient-brand-bg transition-opacity duration-300 ${solved ? 'opacity-100' : 'opacity-0'}`}
        />
        <span className="grid p-6 sm:p-7">
          <AnimatePresence initial={false}>
            {solved ? (
              <CardState key="solution" solved label={labels.solutionLabel} title={card.solution} detail={card.solutionDetail} />
            ) : (
              <CardState key="problem" solved={false} label={labels.problemLabel} title={card.problem} detail={card.problemDetail} />
            )}
          </AnimatePresence>
        </span>
      </button>
    </motion.div>
  )
}

export function ProblemSolutionSection({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = COPY[locale]
  const cards = locale === 'id' ? CARDS_ID : CARDS_EN

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'var(--bg-tint-rose)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16 items-start">

          {/* Left sticky column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:w-2/5 md:sticky md:top-28 flex-shrink-0"
          >
            <span className="eyebrow block mb-5">{c.badge}</span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--text-primary)] mb-5 leading-[1.12] tracking-[-0.03em]">
              {c.headline}{' '}
              <span className="gradient-text">{c.headlineGradient}</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-base">
              {c.body}
            </p>
            <p className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
              <MousePointerClick className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              {c.hint}
            </p>
            <Link
              href={locale === 'id' ? '/about' : '/en/about'}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-crimson hover:text-brand-magenta transition-colors group"
            >
              {c.link}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Right: pain → solution cards */}
          <div className="md:w-3/5 flex flex-col gap-5 w-full">
            {cards.map((card, i) => (
              <FlipCard key={i} card={card} index={i} labels={{ problemLabel: c.problemLabel, solutionLabel: c.solutionLabel }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
