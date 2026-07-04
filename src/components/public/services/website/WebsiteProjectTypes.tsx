'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { WEBSITE_PROJECT_TYPES, WEBSITE_PROJECT_TYPES_EN } from './data'

function LandingPageMockup({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-white p-3 space-y-2 w-full max-w-[160px] mx-auto shadow-sm">
      <div className="h-10 rounded-lg p-2 space-y-1" style={{ background: `${accent}18` }}>
        <div className="h-1.5 w-2/3 rounded bg-[rgba(35,26,38,0.16)]" />
        <div className="h-1 w-1/2 rounded bg-[rgba(35,26,38,0.10)]" />
        <div className="h-4 w-12 rounded-md mt-1" style={{ background: `${accent}60` }} />
      </div>
      <div className="space-y-1 px-1">
        {[1, 0.8, 0.6].map((w, i) => (
          <div key={i} className="h-1 rounded bg-[rgba(35,26,38,0.08)]" style={{ width: `${w * 100}%` }} />
        ))}
      </div>
      <div className="h-6 rounded-md border border-[var(--border-hover)] flex items-center justify-center">
        <div className="h-1 w-12 rounded bg-[rgba(35,26,38,0.16)]" />
      </div>
    </div>
  )
}

function CompanyMockup({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-white overflow-hidden w-full max-w-[160px] mx-auto shadow-sm">
      <div className="flex gap-1 px-2 py-1.5 border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
        {['Home', 'About', 'Contact'].map((tab) => (
          <div key={tab} className="rounded px-1.5 py-0.5 text-[7px] font-medium text-[var(--text-secondary)]" style={{ background: `${accent}20` }}>{tab}</div>
        ))}
      </div>
      <div className="p-2.5 space-y-2">
        <div className="h-8 rounded-lg p-2" style={{ background: `${accent}15` }}>
          <div className="h-1.5 w-3/4 rounded bg-[rgba(35,26,38,0.16)]" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-md border border-[var(--border-default)] bg-[rgba(35,26,38,0.03)] p-1.5 space-y-1">
              <div className="h-1 w-full rounded bg-[rgba(35,26,38,0.12)]" />
              <div className="h-1 w-2/3 rounded bg-[rgba(35,26,38,0.08)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EcommerceMockup({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-white overflow-hidden w-full max-w-[160px] mx-auto shadow-sm">
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
        <div className="h-1 w-12 rounded bg-[rgba(35,26,38,0.16)]" />
        <div className="relative">
          <svg className="h-4 w-4 text-[rgba(35,26,38,0.35)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full text-[7px] font-bold flex items-center justify-center" style={{ background: accent, color: '#fff' }}>2</div>
        </div>
      </div>
      <div className="p-2.5 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-[var(--border-default)] bg-[rgba(35,26,38,0.02)] space-y-1 overflow-hidden">
            <div className="h-6 w-full" style={{ background: `${accent}18` }} />
            <div className="px-1 pb-1 space-y-0.5">
              <div className="h-1 w-full rounded bg-[rgba(35,26,38,0.12)]" />
              <div className="h-1 w-2/3 rounded bg-[rgba(35,26,38,0.08)]" />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-2 mb-2 h-5 rounded-md flex items-center justify-center text-[8px] font-semibold text-[var(--text-primary)]" style={{ background: `${accent}30` }}>
        Checkout →
      </div>
    </div>
  )
}

const MOCKUP_MAP: Record<string, (accent: string) => React.ReactElement> = {
  'landing-page': (a) => <LandingPageMockup accent={a} />,
  'company-profile': (a) => <CompanyMockup accent={a} />,
  'e-commerce': (a) => <EcommerceMockup accent={a} />,
}

const PROJECTTYPES_COPY = {
  id: {
    eyebrow: 'Apa yang Kami Bangun',
    heading1: 'Tiga tipe proyek web.',
    heading2: 'Satu standar kualitas.',
    pricingLabel: 'All projects',
    pricingNote: 'Scope dan harga final diberikan setelah Discovery call gratis.',
    bestFor: 'Cocok untuk:',
    ctaLabel: 'Dapatkan Penawaran Kustom →',
    ctaHref: '/contact?service=website-landing-page',
    ctaNote: 'Ceritakan proyekmu dan kami akan kirim scope serta proposal detail dalam 48 jam.',
  },
  en: {
    eyebrow: 'What We Build',
    heading1: 'Three web project types.',
    heading2: 'One quality standard.',
    pricingLabel: 'All projects',
    pricingNote: 'Final scope and pricing provided after a free Discovery call.',
    bestFor: 'Best for:',
    ctaLabel: 'Get a Custom Quote →',
    ctaHref: '/en/contact?service=website-landing-page',
    ctaNote: "Tell us about your project and we'll send a detailed scope and proposal within 48 hours.",
  },
}

export function WebsiteProjectTypes({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const projectTypes = locale === 'en' ? WEBSITE_PROJECT_TYPES_EN : WEBSITE_PROJECT_TYPES
  const c = PROJECTTYPES_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em] mb-4">
            {c.heading1}{' '}
            <span className="gradient-text">{c.heading2}</span>
          </h2>
        </motion.div>

        {/* Pricing tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-14"
        >
          <div className="inline-flex flex-col items-center rounded-2xl border border-[var(--border-default)] bg-white px-6 py-4 text-center shadow-card">
            <span className="text-sm font-bold text-[var(--text-primary)]">
              {c.pricingLabel} <span className="gradient-text">starting from Rp 10 Juta</span>
            </span>
            <span className="text-xs text-[var(--text-secondary)] mt-1">
              {c.pricingNote}
            </span>
          </div>
        </motion.div>

        {/* Project type cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(projectTypes as typeof WEBSITE_PROJECT_TYPES).map((pt, i) => (
            <motion.div
              key={pt.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Accent top bar */}
              <span className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: pt.accentColor }} aria-hidden />

              {/* Mockup panel */}
              <div className="flex items-center justify-center p-8 border-b border-[var(--border-default)]" style={{ background: `${pt.accentColor}0D` }} aria-hidden>
                {MOCKUP_MAP[pt.id]?.(pt.accentColor)}
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">{pt.title}</h3>
                  <span className="shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold text-[var(--text-primary)]"
                    style={{ background: `${pt.accentColor}1A` }}>
                    {pt.timeline}
                  </span>
                </div>

                <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">{pt.tagline}</p>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{pt.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {pt.features.map((f) => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] font-medium text-[var(--text-secondary)]">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Best for badge */}
                <div className="mt-auto">
                  <span className="inline-flex items-start gap-1.5 rounded-lg px-3 py-2 text-xs" style={{ background: `${pt.accentColor}14` }}>
                    <span className="font-bold text-[var(--text-primary)]">{c.bestFor}</span>
                    <span className="text-[var(--text-secondary)] font-medium">{pt.bestFor}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <Link
            href={c.ctaHref}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white gradient-bg shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200"
          >
            {c.ctaLabel}
          </Link>
          <p className="mt-3 text-xs text-[var(--text-secondary)]">
            {c.ctaNote}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
