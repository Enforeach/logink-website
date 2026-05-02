'use client'

import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'

interface Metric {
  metricLabel: string
  beforeValue: string
  afterValue: string
  numericAfter?: number
  suffix?: string
}

interface CaseStudy {
  id: string
  title: string
  slug: string
  clientName: string
  industry: string
  metrics: Metric[]
  service?: { name: string; color: string } | null
}

const COPY = {
  id: { badge: 'Kisah Sukses', heading: 'Hasil Nyata,', headingGradient: 'Klien Nyata', viewFull: 'Lihat case study lengkap', viewAll: 'Lihat semua case study' },
  en: { badge: 'Success Stories', heading: 'Real Results,', headingGradient: 'Real Clients', viewFull: 'View full case study', viewAll: 'View all case studies' },
}

function MetricCounter({ metric, index, isInView }: { metric: Metric; index: number; isInView: boolean }) {
  const raw = useCountUp(metric.numericAfter ?? 0, isInView && metric.numericAfter !== undefined, 1800, index * 250)

  let displayAfter: React.ReactNode = metric.afterValue
  if (metric.numericAfter !== undefined) {
    if (metric.metricLabel === 'Conversion Rate') {
      displayAfter = <><span>{(raw / 10).toFixed(1)}</span>%</>
    } else if (metric.suffix === '/mo') {
      displayAfter = <><span>{raw.toLocaleString()}</span>/mo</>
    } else {
      displayAfter = <><span>{raw}</span>x</>
    }
  }

  return (
    <div
      style={isInView
        ? { animation: `fade-up 0.5s cubic-bezier(0.22,1,0.36,1) ${0.3 + index * 0.2}s both` }
        : { opacity: 0 }}
      className="flex-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 text-center min-w-0"
    >
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-2">{metric.metricLabel}</div>
      <div className="text-sm text-[var(--text-muted)] line-through mb-1">{metric.beforeValue}</div>
      <svg className="h-4 w-4 mx-auto mb-1 text-brand-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
      <div className="text-2xl font-extrabold gradient-text">{displayAfter}</div>
    </div>
  )
}

export function CaseStudyTeaser({ caseStudy, locale = 'id' }: { caseStudy?: CaseStudy | null; locale?: 'id' | 'en' }) {
  const [ref, isInView] = useInView({ once: true, amount: 0.25 })
  const c = COPY[locale]

  if (!caseStudy) return null

  const cs = caseStudy
  const portfolioBase = locale === 'en' ? '/en/portfolio' : '/portfolio'

  return (
    <section className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          style={{ animation: 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both' }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-4">
            {c.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            {c.heading} <span className="gradient-text">{c.headingGradient}</span>
          </h2>
        </div>

        {/* Case study card */}
        <div
          ref={ref}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, #1A1530 0%, #1d1040 50%, #1A1530 100%)',
            border: '1px solid transparent',
            backgroundClip: 'padding-box',
            ...(isInView ? { animation: 'fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both' } : { opacity: 0 }),
          }}
        >
          {/* Gradient border via pseudo */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.3), rgba(217,119,6,0.2))',
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          {/* Radial spotlight */}
          <div
            className="absolute top-0 left-0 h-64 w-64 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top left, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
          />

          {/* Header row */}
          <div className="relative flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {cs.service && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${cs.service.color}20`, color: cs.service.color }}>
                    {cs.service.name}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--border-default)] text-[var(--text-muted)]">
                  {cs.industry}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">{cs.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">Client: {cs.clientName}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {cs.metrics.map((m, i) => (
              <MetricCounter key={i} metric={m} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              href={`${portfolioBase}/${cs.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:text-brand-pink transition-colors group"
            >
              {c.viewFull}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            href={portfolioBase}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-brand-violet transition-colors group"
          >
            {c.viewAll}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
