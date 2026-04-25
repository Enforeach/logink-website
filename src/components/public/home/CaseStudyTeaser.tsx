'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

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

const PLACEHOLDER: CaseStudy = {
  id: 'placeholder',
  title: 'E-Commerce Brand Growth',
  slug: '#',
  clientName: 'Leading Indonesian F&B Brand',
  industry: 'Food & Beverage',
  metrics: [
    { metricLabel: 'Organic Traffic', beforeValue: '1,200/mo', afterValue: '5,400/mo', numericAfter: 5400, suffix: '/mo' },
    { metricLabel: 'ROAS', beforeValue: '1.2x', afterValue: '4.1x', numericAfter: 4 },
    { metricLabel: 'Conversion Rate', beforeValue: '2.1%', afterValue: '8.7%', numericAfter: 87 },
  ],
  service: { name: 'SEO & Paid Ads', color: '#7C3AED' },
}

function MetricCounter({ metric, index, isInView }: { metric: Metric; index: number; isInView: boolean }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => {
    if (metric.suffix === '/mo') return Math.round(v).toLocaleString()
    if (metric.metricLabel === 'Conversion Rate') return (v / 10).toFixed(1)
    return v.toFixed(1)
  })

  useEffect(() => {
    if (isInView && metric.numericAfter !== undefined) {
      animate(count, metric.numericAfter, { duration: 1.8, ease: 'easeOut', delay: index * 0.25 })
    }
  }, [isInView, count, metric.numericAfter, index])

  const displayAfter = metric.numericAfter !== undefined
    ? metric.metricLabel === 'Conversion Rate'
      ? <><motion.span>{rounded}</motion.span>%</>
      : metric.suffix === '/mo'
        ? <><motion.span>{rounded}</motion.span>/mo</>
        : <><motion.span>{rounded}</motion.span>x</>
    : metric.afterValue

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 text-center min-w-0"
    >
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-2">{metric.metricLabel}</div>
      <div className="text-sm text-[var(--text-muted)] line-through mb-1">{metric.beforeValue}</div>
      <svg className="h-4 w-4 mx-auto mb-1 text-brand-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
      <div className="text-2xl font-extrabold gradient-text">{displayAfter}</div>
    </motion.div>
  )
}

export function CaseStudyTeaser({ caseStudy }: { caseStudy?: CaseStudy | null }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

  const cs = caseStudy ?? PLACEHOLDER
  const isPlaceholder = !caseStudy

  return (
    <section className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Real Results, <span className="gradient-text">Real Clients</span>
          </h2>
        </motion.div>

        {/* Case study card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, #1A1530 0%, #1d1040 50%, #1A1530 100%)',
            border: '1px solid transparent',
            backgroundClip: 'padding-box',
          }}
        >
          {/* Gradient border via pseudo — we fake it with box-shadow and border overlay */}
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
            {isPlaceholder ? (
              <p className="text-xs text-[var(--text-muted)] italic">Sample data — add real case studies via CMS.</p>
            ) : (
              <Link
                href={`/portfolio/${cs.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:text-brand-pink transition-colors group"
              >
                View full case study
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </motion.div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-brand-violet transition-colors group"
          >
            View all case studies
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
