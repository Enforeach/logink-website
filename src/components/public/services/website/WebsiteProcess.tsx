'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.7', 'end 0.7'],
  })
  const processSteps = locale === 'en' ? WEBSITE_PROCESS_EN : WEBSITE_PROCESS
  const c = PROCESS_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em] mb-4">
            {c.heading}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            {c.sub}
          </p>
        </motion.div>

        {/* Scroll-linked timeline */}
        <div ref={trackRef} className="relative">
          {/* Base hairline + scroll fill */}
          <div className="absolute left-[15px] top-1 bottom-1 w-px bg-[var(--border-default)]" aria-hidden />
          <motion.div
            className="absolute left-[15px] top-1 bottom-1 w-px origin-top"
            style={{
              scaleY: scrollYProgress,
              background: 'linear-gradient(to bottom, #C084FC, #D81C5C, #F88438)',
            }}
            aria-hidden
          />

          <div className="space-y-12">
            {(processSteps as typeof WEBSITE_PROCESS).map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12"
              >
                {/* Dot on the line */}
                <span
                  className="absolute left-[8px] top-2 h-4 w-4 rounded-full border-2 border-white shadow-sm z-10"
                  style={{ background: phase.accentColor }}
                  aria-hidden
                />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <span className="font-display text-3xl font-bold leading-none text-[var(--text-primary)]">
                    {String(phase.phase).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">{phase.title}</h3>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold text-[var(--text-primary)]"
                    style={{ background: `${phase.accentColor}1A` }}
                  >
                    {phase.timeline}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
