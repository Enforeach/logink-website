'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { WEBSITE_PROCESS, WEBSITE_PROCESS_EN } from './data'

const PROCESS_COPY = {
  id: {
    eyebrow: 'Cara Kami Bekerja',
    heading: 'Dari brief hingga launch.',
    sub: '5 fase, transparansi penuh. Kamu selalu tahu di mana posisi proyekmu.',
    day1: 'Hari 1-3',
    week: 'Mgg',
  },
  en: {
    eyebrow: 'How We Work',
    heading: 'From brief to launch.',
    sub: '5 phases, full transparency. You always know where your project stands.',
    day1: 'Day 1-3',
    week: 'Wk',
  },
}

export function WebsiteProcess({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const processSteps = locale === 'en' ? WEBSITE_PROCESS_EN : WEBSITE_PROCESS
  const c = PROCESS_COPY[locale]

  const totalWeeks = 8

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#06B6D4] mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            {c.heading}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {c.sub}
          </p>
        </div>

        {/* Desktop Gantt Chart */}
        <div className="hidden md:block">
          {/* Week labels */}
          <div className="flex mb-3 pl-48">
            {Array.from({ length: totalWeeks }, (_, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-[var(--text-muted)]">
                {i === 0 ? c.day1 : `${c.week} ${i}`}
              </div>
            ))}
          </div>

          {/* Phase rows */}
          <div className="space-y-3">
            {(processSteps as typeof WEBSITE_PROCESS).map((phase, i) => {
              const isActive = activePhase === phase.phase
              const barLeft = (phase.barStart / 100) * 100
              const barWidth = ((phase.barEnd - phase.barStart) / 100) * 100

              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-0 cursor-pointer group"
                  onClick={() => setActivePhase(isActive ? null : phase.phase)}
                >
                  {/* Phase label */}
                  <div className="w-48 shrink-0 pr-4">
                    <div className="text-xs font-bold" style={{ color: phase.accentColor }}>
                      {String(phase.phase).padStart(2, '0')} · {phase.title}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)]">{phase.timeline}</div>
                  </div>

                  {/* Gantt track */}
                  <div className="flex-1 relative h-10 rounded-lg bg-white/5 overflow-hidden">
                    <motion.div
                      className="absolute top-0 h-full rounded-lg flex items-center px-3"
                      style={{
                        left: `${barLeft}%`,
                        background: `${phase.accentColor}30`,
                        borderLeft: `2px solid ${phase.accentColor}`,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${barWidth}%` } : { width: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: i * 0.15 + 0.7 }}
                        className="text-[10px] font-semibold whitespace-nowrap truncate"
                        style={{ color: phase.accentColor }}
                      >
                        {phase.title}
                      </motion.span>
                    </motion.div>

                    {/* Expand indicator */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <motion.svg
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-3 w-3 opacity-40"
                        fill="none" viewBox="0 0 24 24" stroke="white"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Expanded description */}
          {activePhase !== null && (() => {
            const phase = (processSteps as typeof WEBSITE_PROCESS).find(p => p.phase === activePhase)!
            return (
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 ml-48 rounded-xl border border-white/10 p-5"
                style={{ borderLeftColor: phase.accentColor, borderLeftWidth: 3, background: `${phase.accentColor}08` }}
              >
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{phase.description}</p>
              </motion.div>
            )
          })()}
        </div>

        {/* Mobile: vertical stacked */}
        <div className="md:hidden space-y-3">
          {(processSteps as typeof WEBSITE_PROCESS).map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-[var(--bg-surface)] p-5"
              style={{ borderLeftColor: phase.accentColor, borderLeftWidth: 3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold" style={{ color: phase.accentColor }}>
                  {String(phase.phase).padStart(2, '0')} · {phase.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: `${phase.accentColor}20`, color: phase.accentColor }}>
                  {phase.timeline}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
