'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { ADS_STATS } from './data'

function StatCard({ stat, inView }: { stat: typeof ADS_STATS[number]; inView: boolean }) {
  return (
    <div className="flex flex-col gap-2 px-8 py-6 border-r border-white/10 last:border-r-0">
      <div className="text-4xl font-extrabold gradient-text">{stat.value}</div>
      <div className="text-sm font-semibold text-[var(--text-primary)]">{stat.label}</div>
      <div className="text-xs text-[var(--text-muted)] leading-relaxed">{stat.context}</div>
    </div>
  )
}

export function AdsStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-16 px-4 border-y border-white/10"
      style={{ background: 'linear-gradient(180deg, #0A0716 0%, #0D091C 50%, #0A0716 100%)' }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {ADS_STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} inView={inView} />
        ))}
      </div>
    </section>
  )
}
