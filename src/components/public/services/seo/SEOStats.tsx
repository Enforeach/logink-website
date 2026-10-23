'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion'
import { TrendingUp, Clock, BarChart3, type LucideIcon } from 'lucide-react'

type StatItem = {
  Icon: LucideIcon
  value: string
  label: string
  context: string
  isCounter: boolean
  counterTarget?: number
  counterDecimals?: number
  counterSuffix?: string
}

const STATS_ID: StatItem[] = [
  {
    Icon: TrendingUp,
    value: '150+',
    label: 'Artikel / Bulan',
    context: 'Kapasitas produksi maksimal dengan penulis spesialis.',
    isCounter: true,
    counterTarget: 150,
    counterDecimals: 0,
    counterSuffix: '+',
  },
  {
    Icon: Clock,
    value: '3–6bln',
    label: 'Waktu Ranking',
    context: 'Timeline halaman pertama untuk keyword kompetitif.',
    isCounter: false,
  },
  {
    Icon: BarChart3,
    value: '2.5×',
    label: 'Peningkatan Traffic',
    context: 'Rata-rata seluruh klien setelah 6 bulan eksekusi konsisten.',
    isCounter: true,
    counterTarget: 2.5,
    counterDecimals: 1,
    counterSuffix: '×',
  },
]

const STATS_EN: StatItem[] = [
  {
    Icon: TrendingUp,
    value: '150+',
    label: 'Articles / Month',
    context: 'Maximum production capacity with specialist writers.',
    isCounter: true,
    counterTarget: 150,
    counterDecimals: 0,
    counterSuffix: '+',
  },
  {
    Icon: Clock,
    value: '3–6mo',
    label: 'Time to Rank',
    context: 'Typical page-one timeline for competitive keywords.',
    isCounter: false,
  },
  {
    Icon: BarChart3,
    value: '2.5×',
    label: 'Traffic Lift',
    context: 'Average across clients at 6 months of consistent execution.',
    isCounter: true,
    counterTarget: 2.5,
    counterDecimals: 1,
    counterSuffix: '×',
  },
]

function AnimatedNumber({ target, decimals, suffix }: { target: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    decimals === 0 ? Math.round(v).toString() : v.toFixed(decimals)
  )

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: 'easeOut' })
    }
  }, [isInView, count, target])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

function StatBlock({ stat, index }: { stat: StatItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-6 py-4"
    >
      <div className="mb-4 p-2.5 rounded-xl inline-flex" style={{ background: 'rgba(168,85,247,0.16)' }}>
        <stat.Icon size={22} strokeWidth={1.5} style={{ color: '#C084FC' }} aria-hidden />
      </div>
      <div className="font-display text-5xl md:text-6xl font-bold mb-2 leading-none gradient-text">
        {stat.isCounter ? (
          <AnimatedNumber
            target={stat.counterTarget!}
            decimals={stat.counterDecimals!}
            suffix={stat.counterSuffix!}
          />
        ) : (
          stat.value
        )}
      </div>
      <div className="text-sm font-semibold text-[var(--text-on-ink)] mb-3">{stat.label}</div>
      <div className="h-px w-10 mb-3 gradient-bg" />
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,248,243,0.6)' }}>{stat.context}</p>
    </motion.div>
  )
}

export function SEOStats({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const STATS = locale === 'en' ? STATS_EN : STATS_ID
  return (
    <section className="py-16 md:py-20 px-4" style={{ background: 'var(--bg-ink)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-[rgba(253,248,243,0.1)] divide-y sm:divide-y-0 divide-[rgba(253,248,243,0.1)]">
          {STATS.map((stat, i) => (
            <StatBlock key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
