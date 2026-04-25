'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion'

type StatItem = {
  icon: string
  value: string
  label: string
  context: string
  isCounter: boolean
  counterTarget?: number
  counterDecimals?: number
  counterSuffix?: string
}

const STATS: StatItem[] = [
  {
    icon: '📈',
    value: '150+',
    label: 'Articles / Month',
    context: 'Maximum production capacity with specialist writers.',
    isCounter: true,
    counterTarget: 150,
    counterDecimals: 0,
    counterSuffix: '+',
  },
  {
    icon: '⏱️',
    value: '3–6mo',
    label: 'Time to Rank',
    context: 'Typical page-one timeline for competitive keywords.',
    isCounter: false,
  },
  {
    icon: '📊',
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

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <div className="group flex flex-col items-center text-center p-7 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300">
      <div className="text-3xl mb-4">{stat.icon}</div>
      <div
        className="text-5xl font-extrabold mb-2 leading-none"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #DB2777)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
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
      <div className="text-sm font-semibold text-[var(--text-primary)] mb-3">{stat.label}</div>
      <div className="h-px w-10 mb-3" style={{ background: 'linear-gradient(90deg,#7C3AED,#DB2777)' }} />
      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{stat.context}</p>
    </div>
  )
}

export function SEOStats() {
  return (
    <section className="py-16 px-4" style={{ background: '#0A0716' }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
