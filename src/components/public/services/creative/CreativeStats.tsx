'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { Layers, RefreshCw, Timer, type LucideIcon } from 'lucide-react'
import { CREATIVE_STATS, CREATIVE_STATS_EN } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

// ponytail: counter config keyed by index of CREATIVE_STATS; update if data order changes
const STAT_META: { Icon: LucideIcon; counter?: { target: number; suffix: string } }[] = [
  { Icon: Layers, counter: { target: 500, suffix: '+' } },
  { Icon: RefreshCw, counter: { target: 2, suffix: '' } },
  { Icon: Timer },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString())

  useEffect(() => {
    if (isInView) animate(count, target, { duration: 2, ease: 'easeOut' })
  }, [isInView, count, target])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export function CreativeStats({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const stats = locale === 'en' ? CREATIVE_STATS_EN : CREATIVE_STATS

  return (
    <section className="py-16 md:py-20 px-4" style={{ background: 'var(--bg-ink)' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(253,248,243,0.1)]">
        {stats.map((stat, i) => {
          const meta = STAT_META[i] ?? STAT_META[0]
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="flex flex-col items-center text-center px-6 py-6"
            >
              <div className="mb-4 p-2.5 rounded-xl inline-flex" style={{ background: 'rgba(245,166,35,0.16)' }}>
                <meta.Icon size={22} strokeWidth={1.5} className="text-brand-gold" aria-hidden />
              </div>
              <div className="font-display text-5xl md:text-6xl font-bold mb-2 leading-none gradient-text">
                {meta.counter ? (
                  <AnimatedNumber target={meta.counter.target} suffix={meta.counter.suffix} />
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-sm font-semibold text-[var(--text-on-ink)] mb-3">{stat.label}</div>
              <div className="h-px w-10 mb-3 gradient-bg" aria-hidden />
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,248,243,0.6)' }}>{stat.context}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
