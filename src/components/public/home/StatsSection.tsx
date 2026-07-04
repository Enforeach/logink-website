'use client'

import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

interface StatConfig {
  prefix?: string
  target: number
  suffix: string
  labelId: string
  labelEn: string
}

const STATS: StatConfig[] = [
  { prefix: '2–', target: 4, suffix: 'x', labelId: 'Rata-rata ROAS', labelEn: 'Average ROAS' },
  { target: 150, suffix: '+', labelId: 'Artikel per Bulan', labelEn: 'Articles Per Month' },
  { target: 5, suffix: '', labelId: 'Layanan Terintegrasi', labelEn: 'Integrated Services' },
  { target: 100, suffix: '%', labelId: 'Pelaporan Transparan', labelEn: 'Transparent Reporting' },
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
      className="flex-1 text-center px-6 py-8"
    >
      {/* Number */}
      <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] gradient-text leading-none mb-4">
        {stat.prefix}
        <span>{count}</span>
        {stat.suffix}
      </div>

      {/* Label */}
      <div
        className="text-xs uppercase tracking-[0.18em] font-medium"
        style={{ color: 'rgba(253, 248, 243, 0.6)' }}
      >
        {locale === 'id' ? stat.labelId : stat.labelEn}
      </div>
    </div>
  )
}

export function StatsSection({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24" style={{ background: 'var(--bg-ink)' }}>
      {/* Subtle light dot grid on the ink band */}
      <div
        aria-hidden
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(253, 248, 243, 0.07) 1px, transparent 1px)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 lg:hidden gap-4">
          {STATS.map((s, i) => (
            <AnimatedStat key={s.labelEn} stat={s} index={i} locale={locale} />
          ))}
        </div>

        {/* Desktop: row with hairline dividers */}
        <div className="hidden lg:flex items-stretch divide-x divide-[rgba(253,248,243,0.12)]">
          {STATS.map((s, i) => (
            <AnimatedStat key={s.labelEn} stat={s} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
