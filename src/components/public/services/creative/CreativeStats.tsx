'use client'

import { CREATIVE_STATS, CREATIVE_STATS_EN } from './data'

export function CreativeStats({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  return (
    <section
      className="py-16 px-4 border-y border-white/10"
      style={{ background: 'linear-gradient(180deg, #0A0716 0%, #0D091C 50%, #0A0716 100%)' }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {(locale === 'en' ? CREATIVE_STATS_EN : CREATIVE_STATS).map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 px-8 py-6">
            <div className="text-4xl font-extrabold gradient-text">{stat.value}</div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">{stat.label}</div>
            <div className="text-xs text-[var(--text-muted)] leading-relaxed">{stat.context}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
