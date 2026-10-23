'use client'

import { motion } from 'framer-motion'
import { MapPin, Trophy, TrendingUp, Layers, type LucideIcon } from 'lucide-react'
import { LOCALSEO_STATS, LOCALSEO_STATS_EN } from './data'

const STAT_ICONS: LucideIcon[] = [MapPin, Trophy, TrendingUp, Layers]

function StatBlock({
  Icon,
  value,
  label,
  color,
  index,
}: {
  Icon: LucideIcon
  value: string
  label: string
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-6 py-4"
    >
      <div className="mb-4 p-2.5 rounded-xl inline-flex" style={{ background: `${color}28` }}>
        <Icon size={22} strokeWidth={1.5} style={{ color }} aria-hidden />
      </div>
      <div className="font-display text-4xl md:text-5xl font-bold mb-2 leading-none tabular-nums" style={{ color }}>
        {value}
      </div>
      <div className="text-sm font-semibold text-[var(--text-on-ink)] mb-3">{label}</div>
      <div className="h-px w-10" style={{ background: color }} />
    </motion.div>
  )
}

export function LocalSeoStats({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const STATS = locale === 'en' ? LOCALSEO_STATS_EN : LOCALSEO_STATS
  return (
    <section className="py-16 md:py-20 px-4" style={{ background: 'var(--bg-ink)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-[rgba(253,248,243,0.1)] divide-y sm:divide-y-0 divide-[rgba(253,248,243,0.1)]">
          {STATS.map((stat, i) => (
            <StatBlock
              key={stat.label}
              Icon={STAT_ICONS[i] ?? MapPin}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
