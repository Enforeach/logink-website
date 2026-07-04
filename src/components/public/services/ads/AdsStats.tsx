'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, TrendingDown, LayoutGrid, type LucideIcon } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'
import { ADS_STATS, ADS_STATS_EN } from './data'

const STAT_ICONS: LucideIcon[] = [TrendingUp, TrendingDown, LayoutGrid]

// ponytail: count-up config keyed by index; move into data.ts if stats ever change shape
const COUNTERS: ({ target: number; prefix: string; suffix: string } | null)[] = [
  null, // '2–4×' — a range, shown as-is
  { target: 35, prefix: '~', suffix: '%' },
  { target: 5, prefix: '', suffix: '' },
]

function StatCard({ stat, Icon, counter, inView, index }: {
  stat: typeof ADS_STATS[number]
  Icon: LucideIcon
  counter: { target: number; prefix: string; suffix: string } | null
  inView: boolean
  index: number
}) {
  const count = useCountUp(counter?.target ?? 0, inView && !!counter, 1800, index * 120)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-6 py-4"
    >
      <div className="mb-4 p-2.5 rounded-xl inline-flex" style={{ background: 'rgba(248,132,56,0.16)' }}>
        <Icon size={22} strokeWidth={1.5} style={{ color: '#FDBA74' }} aria-hidden />
      </div>
      <div className="font-display text-5xl md:text-6xl font-bold mb-2 leading-none gradient-text tabular-nums">
        {counter ? `${counter.prefix}${count}${counter.suffix}` : stat.value}
      </div>
      <div className="text-sm font-semibold text-[var(--text-on-ink)] mb-3">{stat.label}</div>
      <div className="h-px w-10 mb-3 gradient-bg" aria-hidden />
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,248,243,0.6)' }}>{stat.context}</p>
    </motion.div>
  )
}

export function AdsStats({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const stats = locale === 'en' ? ADS_STATS_EN : ADS_STATS

  return (
    <section ref={ref} className="py-16 md:py-20 px-4" style={{ background: 'var(--bg-ink)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-[rgba(253,248,243,0.1)] divide-y sm:divide-y-0 divide-[rgba(253,248,243,0.1)]">
          {(stats as typeof ADS_STATS).map((stat, i) => (
            <StatCard key={stat.label} stat={stat} Icon={STAT_ICONS[i]} counter={COUNTERS[i]} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
