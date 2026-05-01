'use client'

import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

interface StatConfig {
  prefix?: string
  target: number
  suffix: string
  labelId: string
  labelEn: string
  color: string
}

const STATS: StatConfig[] = [
  { prefix: '2–', target: 4, suffix: 'x', labelId: 'Rata-rata ROAS', labelEn: 'Average ROAS', color: '#7C3AED' },
  { target: 150, suffix: '+', labelId: 'Artikel per Bulan', labelEn: 'Articles Per Month', color: '#DB2777' },
  { target: 5, suffix: '', labelId: 'Layanan Terintegrasi', labelEn: 'Integrated Services', color: '#D97706' },
  { target: 100, suffix: '%', labelId: 'Pelaporan Transparan', labelEn: 'Transparent Reporting', color: '#F59E0B' },
]

function AnimatedStat({ stat, index, locale }: { stat: StatConfig; index: number; locale: 'id' | 'en' }) {
  const [ref, inView] = useInView({ once: true, amount: 0.5 })
  const count = useCountUp(stat.target, inView, 2000, index * 120)

  return (
    <div
      ref={ref}
      style={inView
        ? { animation: `fade-up 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s both` }
        : { opacity: 0 }}
      className="flex-1 text-center relative px-6 py-8"
    >
      {/* Glow behind number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0.12 }}
      >
        <div
          className="h-32 w-32 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${stat.color} 0%, transparent 70%)` }}
        />
      </div>

      {/* Number */}
      <div className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text leading-none mb-3">
        {stat.prefix}
        <span>{count}</span>
        {stat.suffix}
      </div>

      {/* Label */}
      <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
        {locale === 'id' ? stat.labelId : stat.labelEn}
      </div>
    </div>
  )
}

export function StatsSection({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  return (
    <section className="px-4 py-4" style={{ background: '#0A0716' }}>
      {/* Gradient top border */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #DB2777, #D97706, transparent)' }} />

      <div className="max-w-7xl mx-auto py-8">
        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 lg:hidden gap-4">
          {STATS.map((s, i) => (
            <AnimatedStat key={s.labelEn} stat={s} index={i} locale={locale} />
          ))}
        </div>

        {/* Desktop: row with dividers */}
        <div className="hidden lg:flex items-stretch divide-x divide-[var(--border-default)]">
          {STATS.map((s, i) => (
            <AnimatedStat key={s.labelEn} stat={s} index={i} locale={locale} />
          ))}
        </div>
      </div>

      {/* Gradient bottom border */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #DB2777, #D97706, transparent)' }} />
    </section>
  )
}
