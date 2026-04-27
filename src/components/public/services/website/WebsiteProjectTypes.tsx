'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WEBSITE_PROJECT_TYPES } from './data'

function LandingPageMockup({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0D0A1F] p-3 space-y-2 w-full max-w-[160px] mx-auto">
      <div className="h-10 rounded-lg p-2 space-y-1" style={{ background: `${accent}18` }}>
        <div className="h-1.5 w-2/3 rounded bg-white/20" />
        <div className="h-1 w-1/2 rounded bg-white/12" />
        <div className="h-4 w-12 rounded-md mt-1" style={{ background: `${accent}50` }} />
      </div>
      <div className="space-y-1 px-1">
        {[1, 0.8, 0.6].map((w, i) => (
          <div key={i} className="h-1 rounded bg-white/10" style={{ width: `${w * 100}%` }} />
        ))}
      </div>
      <div className="h-6 rounded-md border border-white/15 flex items-center justify-center">
        <div className="h-1 w-12 rounded bg-white/20" />
      </div>
    </div>
  )
}

function CompanyMockup({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0D0A1F] overflow-hidden w-full max-w-[160px] mx-auto">
      <div className="flex gap-1 px-2 py-1.5 border-b border-white/10 bg-[#0A0716]">
        {['Home', 'About', 'Contact'].map((tab) => (
          <div key={tab} className="rounded px-1.5 py-0.5 text-[7px]" style={{ background: `${accent}20`, color: accent }}>{tab}</div>
        ))}
      </div>
      <div className="p-2.5 space-y-2">
        <div className="h-8 rounded-lg p-2" style={{ background: `${accent}15` }}>
          <div className="h-1.5 w-3/4 rounded bg-white/20" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-md border border-white/10 bg-white/5 p-1.5 space-y-1">
              <div className="h-1 w-full rounded bg-white/15" />
              <div className="h-1 w-2/3 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EcommerceMockup({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0D0A1F] overflow-hidden w-full max-w-[160px] mx-auto">
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-white/10 bg-[#0A0716]">
        <div className="h-1 w-12 rounded bg-white/20" />
        <div className="relative">
          <svg className="h-4 w-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full text-[7px] font-bold flex items-center justify-center" style={{ background: accent, color: '#fff' }}>2</div>
        </div>
      </div>
      <div className="p-2.5 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-white/10 bg-white/5 space-y-1 overflow-hidden">
            <div className="h-6 w-full" style={{ background: `${accent}15` }} />
            <div className="px-1 pb-1 space-y-0.5">
              <div className="h-1 w-full rounded bg-white/15" />
              <div className="h-1 w-2/3 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-2 mb-2 h-5 rounded-md flex items-center justify-center text-[8px] font-semibold" style={{ background: `${accent}30`, color: accent }}>
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

export function WebsiteProjectTypes() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Apa yang Kami Bangun</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Tiga tipe proyek web.{' '}
            <span className="gradient-text">Satu standar kualitas.</span>
          </h2>
        </div>

        {/* Pricing tag */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex flex-col items-center rounded-2xl border px-6 py-4 text-center"
            style={{ borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)' }}>
            <span className="text-sm font-bold text-[var(--text-primary)]">
              All projects <span className="gradient-text">starting from Rp 10 Juta</span>
            </span>
            <span className="text-xs text-[var(--text-muted)] mt-1">
              Scope dan harga final diberikan setelah Discovery call gratis.
            </span>
          </div>
        </div>

        {/* Project type cards */}
        <div className="space-y-6">
          {WEBSITE_PROJECT_TYPES.map((pt, i) => (
            <motion.div
              key={pt.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-white/10 bg-[var(--bg-surface)] overflow-hidden"
              style={{ borderLeftColor: pt.accentColor, borderLeftWidth: 3 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col md:flex-row gap-0">
                {/* Mockup (mobile: top) */}
                <div className="md:hidden flex items-center justify-center p-6 border-b border-white/10"
                  style={{ background: `${pt.accentColor}08` }}>
                  {MOCKUP_MAP[pt.id]?.(pt.accentColor)}
                </div>

                {/* Text */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold mb-1" style={{ color: pt.accentColor }}>{pt.title}</h3>
                      <p className="text-sm font-medium text-[var(--text-secondary)]">{pt.tagline}</p>
                    </div>
                    <span className="shrink-0 text-xs px-2 py-1 rounded-full font-semibold"
                      style={{ background: `${pt.accentColor}20`, color: pt.accentColor }}>
                      {pt.timeline}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">{pt.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {pt.features.map((f) => (
                      <span key={f} className="text-xs px-2 py-1 rounded-lg border font-medium"
                        style={{ borderColor: `${pt.accentColor}30`, color: pt.accentColor, background: `${pt.accentColor}10` }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--text-secondary)]">Cocok untuk:</span>{' '}
                    {pt.bestFor}
                  </div>
                </div>

                {/* Mockup (desktop: right) */}
                <div className="hidden md:flex items-center justify-center w-56 shrink-0 border-l border-white/10 p-6"
                  style={{ background: `${pt.accentColor}08` }}>
                  {MOCKUP_MAP[pt.id]?.(pt.accentColor)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact?service=website-landing-page"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white gradient-bg shadow-lg transition-transform hover:scale-105"
          >
            Dapatkan Penawaran Kustom →
          </Link>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Ceritakan proyekmu dan kami akan kirim scope serta proposal detail dalam 48 jam.
          </p>
        </div>
      </div>
    </section>
  )
}
