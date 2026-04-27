'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SEO_PROCESS_STEPS, SEO_PROCESS_STEPS_EN } from './data'

function StepVisual({ step }: { step: number }) {
  if (step === 1) {
    return (
      <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 mt-3 w-full max-w-[200px]">
        <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">Kesulitan keyword</div>
        {[{ w: '85%', color: '#EF4444', label: 'Tinggi' }, { w: '55%', color: '#F59E0B', label: 'Sedang' }, { w: '30%', color: '#10B981', label: 'Rendah' }].map((b, i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5">
            <div className="h-2 rounded-full" style={{ width: b.w, background: b.color, opacity: 0.7 }} />
            <span className="text-[10px] text-[var(--text-muted)]">{b.label}</span>
          </div>
        ))}
      </div>
    )
  }
  if (step === 2) {
    return (
      <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-3 mt-3 w-full max-w-[200px]">
        <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">Topic cluster</div>
        <div className="flex flex-col gap-1">
          <div className="h-5 rounded px-2 flex items-center text-[10px] font-semibold text-pink-400" style={{ background: 'rgba(219,39,119,0.15)' }}>Halaman pilar</div>
          {['Cluster A', 'Cluster B', 'Cluster C'].map((c) => (
            <div key={c} className="ml-3 h-4 rounded px-2 flex items-center text-[9px] text-[var(--text-muted)]" style={{ background: 'rgba(219,39,119,0.07)' }}>
              └ {c}
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (step === 3) {
    return (
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 mt-3 w-full max-w-[200px]">
        <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">Audit teknikal</div>
        {['Crawl error diperbaiki', 'Page speed +40%', 'Schema diterapkan'].map((item, i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5 text-[10px]">
            <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 20 20" fill="#10B981">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[var(--text-secondary)]">{item}</span>
          </div>
        ))}
      </div>
    )
  }
  if (step === 4) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 mt-3 w-full max-w-[200px]">
        <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">Bulan ini</div>
        <div className="space-y-1.5">
          {['Artikel: Dasar SEO...', 'Artikel: Google Ads...', 'Artikel: Meta Ads...'].map((a, i) => (
            <div key={i} className="flex items-center justify-between text-[10px]">
              <span className="text-[var(--text-secondary)] truncate mr-2">{a}</span>
              <span className="text-emerald-400 flex-shrink-0 font-semibold">Live</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  // step 5 — chart
  return (
    <div className="rounded-xl border border-violet-400/20 bg-violet-400/5 p-3 mt-3 w-full max-w-[200px]">
      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">Tren traffic</div>
      <svg viewBox="0 0 140 50" className="w-full h-10">
        <polyline
          points="0,45 25,38 50,30 75,22 100,12 125,6 140,3"
          fill="none"
          stroke="url(#trendGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

const PROCESS_COPY = {
  id: { eyebrow: 'Cara Kerjanya', heading: 'Dari kickoff hingga hasil nyata.', sub: 'Proses yang jelas dan berulang agar kamu selalu tahu apa yang terjadi selanjutnya.' },
  en: { eyebrow: 'How It Works', heading: 'From kickoff to real results.', sub: 'A clear, repeatable process so you always know what happens next.' },
}

export function SEOProcess({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const lineRef = useRef<HTMLDivElement>(null)
  const steps = locale === 'en' ? SEO_PROCESS_STEPS_EN : SEO_PROCESS_STEPS
  const c = PROCESS_COPY[locale]

  return (
    <section className="py-20 px-4 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">{c.eyebrow}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">{c.heading}</h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto">
            {c.sub}
          </p>
        </div>

        <div className="relative">
          {/* Vertical connecting gradient line */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #7C3AED, #DB2777, #D97706, #F59E0B, #A78BFA)' }}
          />

          <div className="space-y-16">
            {(steps as typeof SEO_PROCESS_STEPS).map((step, i) => {
              const isLeft = step.align === 'left'
              return (
                <StepRow key={i} step={step} index={i} isLeft={isLeft} stepNum={i + 1} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepRow({
  step,
  index,
  isLeft,
  stepNum,
}: {
  step: typeof SEO_PROCESS_STEPS[number]
  index: number
  isLeft: boolean
  stepNum: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="relative">
      {/* Step dot on the line */}
      <div
        className="absolute left-4 top-3 h-4 w-4 rounded-full border-2 border-[var(--bg-primary)] hidden md:flex items-center justify-center z-10"
        style={{ background: step.color, boxShadow: `0 0 12px ${step.color}60` }}
      />

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 md:pl-14`}>
        {/* Title card */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={isLeft ? 'md:order-1' : 'md:order-2'}
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="text-xs font-black px-2.5 py-1 rounded-lg text-white"
              style={{ background: step.color }}
            >
              {step.step}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest">{step.duration}</span>
          </div>
          <h3 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">{step.title}</h3>
          <StepVisual step={stepNum} />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-start ${isLeft ? 'md:order-2' : 'md:order-1'}`}
        >
          <p className="text-[var(--text-secondary)] leading-relaxed text-base">{step.desc}</p>
        </motion.div>
      </div>
    </div>
  )
}
