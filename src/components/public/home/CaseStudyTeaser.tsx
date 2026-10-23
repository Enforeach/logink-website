'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  titleId?: string | null
  titleEn?: string | null
  slug: string
  slugEn?: string | null
  clientName: string
  industry: string
  metrics: Metric[]
  service?: { name: string; color: string } | null
  thumbnail?: string | null
  featuredImage?: string | null
  summaryId?: string | null
  summaryEn?: string | null
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
        ? { animation: `fade-up 0.5s cubic-bezier(0.22,1,0.36,1) ${0.3 + index * 0.15}s both` }
        : { opacity: 0 }}
      className="flex-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-4 text-center min-w-0"
    >
      <div className="font-display text-xl sm:text-2xl font-bold gradient-text leading-none mb-1.5">{displayAfter}</div>
      <div className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">{metric.metricLabel}</div>
      <div className="text-[11px] text-[var(--text-muted)] line-through mt-0.5">{metric.beforeValue}</div>
    </div>
  )
}

export function CaseStudyTeaser({ caseStudy, locale = 'id' }: { caseStudy?: CaseStudy | null; locale?: 'id' | 'en' }) {
  const [ref, isInView] = useInView({ once: true, amount: 0.25 })
  const c = COPY[locale]

  if (!caseStudy) return null

  const cs = caseStudy
  const portfolioBase = locale === 'en' ? '/en/portfolio' : '/portfolio'
  const image = cs.featuredImage || cs.thumbnail
  const excerpt = locale === 'en' ? cs.summaryEn : cs.summaryId
  const title = locale === 'en' ? (cs.titleEn || cs.title) : (cs.titleId || cs.title)

  return (
    <section className="px-6 py-20 md:py-28 bg-[var(--bg-surface)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          style={{ animation: 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both' }}
          className="text-center mb-12"
        >
          <span className="eyebrow block mb-4">{c.badge}</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)]">
            {c.heading} <span className="gradient-text">{c.headingGradient}</span>
          </h2>
        </div>

        {/* Case study card: horizontal split */}
        <div
          ref={ref}
          style={isInView ? { animation: 'fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both' } : { opacity: 0 }}
          className="group grid md:grid-cols-2 overflow-hidden rounded-3xl border border-[var(--border-default)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
        >
          {/* Left: content */}
          <div className="p-8 sm:p-10 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {cs.service && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: `${cs.service.color}1A`, color: cs.service.color }}>
                  {cs.service.name}
                </span>
              )}
              <span className="text-xs px-2.5 py-1 rounded-full border border-[var(--border-default)] text-[var(--text-muted)]">
                {cs.industry}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-[1.15] text-[var(--text-primary)]">
              {title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1.5">Client: {cs.clientName}</p>

            {excerpt && (
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4 line-clamp-3">{excerpt}</p>
            )}

            {/* Metric chips */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 mb-8">
              {cs.metrics.map((m, i) => (
                <MetricCounter key={i} metric={m} index={i} isInView={isInView} />
              ))}
            </div>

            <div className="mt-auto">
              <Link
                href={`${portfolioBase}/${cs.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold group/link"
              >
                <span className="gradient-text">{c.viewFull}</span>
                <svg className="h-4 w-4 text-brand-orange transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: thumbnail */}
          <div className="relative p-4 sm:p-6 flex">
            <div className="relative w-full min-h-[240px] md:min-h-full rounded-2xl overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 gradient-brand-bg flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                  <span className="font-display text-7xl sm:text-8xl font-bold text-white/30 select-none" aria-hidden>
                    {cs.clientName[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            href={portfolioBase}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-brand-crimson transition-colors group"
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
