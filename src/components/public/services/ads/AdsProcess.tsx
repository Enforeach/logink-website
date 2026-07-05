'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ADS_PROCESS, ADS_PROCESS_EN } from './data'

const PROCESS_COPY = {
  id: { eyebrow: 'Cara Kerjanya', heading: 'Dari kickoff hingga hasil nyata.', sub: 'Proses yang jelas dan berulang agar Anda selalu tahu apa yang terjadi berikutnya.', ongoing: 'Berkelanjutan' },
  en: { eyebrow: 'How It Works', heading: 'From kickoff to real results.', sub: 'A clear, repeatable process so you always know what happens next.', ongoing: 'Ongoing' },
}

export function AdsProcess({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.7', 'end 0.7'],
  })
  const steps = locale === 'en' ? ADS_PROCESS_EN : ADS_PROCESS
  const c = PROCESS_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6 bg-[var(--bg-primary)] overflow-hidden">
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
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm">
            {c.sub}
          </p>
        </motion.div>

        <div className="relative" ref={trackRef}>
          {/* Base hairline + scroll-linked gradient fill */}
          <div className="absolute left-7 top-2 bottom-2 w-px hidden md:block bg-[var(--border-default)]" aria-hidden />
          <motion.div
            className="absolute left-7 top-2 bottom-2 w-px hidden md:block origin-top"
            style={{
              scaleY: scrollYProgress,
              background: 'linear-gradient(to bottom, #D81C5C, #EE3D5E, #F88438)',
            }}
            aria-hidden
          />

          <div className="space-y-6">
            {(steps as typeof ADS_PROCESS).map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative md:pl-16"
              >
                {/* Dot on the line */}
                <span
                  className="absolute left-[1.3125rem] top-7 h-4 w-4 rounded-full border-2 border-white hidden md:block z-10"
                  style={{ background: step.accentColor }}
                  aria-hidden
                />

                <div className="group relative rounded-2xl border border-[var(--border-default)] bg-white px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  {/* Step number */}
                  <div
                    className="font-display text-4xl font-bold flex-shrink-0 sm:w-14 sm:text-right leading-none pt-0.5"
                    style={{ color: step.accentColor }}
                  >
                    {String(step.step).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-1">{step.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">{step.description}</p>
                  </div>

                  {/* Timeline badge */}
                  <div className="flex-shrink-0 flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ background: `${step.accentColor}1A`, color: '#231A26', border: `1px solid ${step.accentColor}40` }}
                    >
                      {step.timeline}
                    </span>
                    {'isOngoing' in step && step.isOngoing && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{ background: 'rgba(16,185,129,0.10)', color: '#059669', border: '1px solid rgba(16,185,129,0.3)' }}
                      >
                        {c.ongoing}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
