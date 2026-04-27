'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CREATIVE_PROCESS } from './data'

export function CreativeProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Cara Kami Berkreasi</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Dari brief hingga brilian.
          </h2>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="hidden md:block relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, #7C3AED, #D97706, #A78BFA)' }} />

          <div className="space-y-10">
            {CREATIVE_PROCESS.map((step, i) => {
              const isLeft = step.side === 'left'
              const isCenter = step.side === 'center'

              return (
                <div key={step.step} className={`relative flex ${isCenter ? 'justify-center' : isLeft ? 'justify-start' : 'justify-end'}`}>
                  {/* Dot on timeline */}
                  <motion.div
                    className="absolute left-1/2 top-6 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-[var(--bg-primary)]"
                    style={{ background: step.accentColor }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.3 }}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : isCenter ? 0 : 30, y: isCenter ? -15 : 0 }}
                    animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-6 overflow-hidden ${isCenter ? 'w-72' : 'w-[42%]'}`}
                    style={{ borderLeftColor: step.accentColor, borderLeftWidth: 3 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    {/* Watermark */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-6xl font-black pointer-events-none select-none"
                      style={{ color: step.accentColor, opacity: 0.06 }}>
                      {String(step.step).padStart(2, '0')}
                    </div>

                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold" style={{ color: step.accentColor }}>
                        {String(step.step).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: `${step.accentColor}20`, color: step.accentColor }}>
                        {step.timeline}
                      </span>
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{step.description}</p>
                    <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                      <svg className="h-3 w-3" viewBox="0 0 20 20" fill={step.accentColor}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Deliverable: {step.deliverable}</span>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {CREATIVE_PROCESS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-[var(--bg-surface)] p-5"
              style={{ borderLeftColor: step.accentColor, borderLeftWidth: 3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold" style={{ color: step.accentColor }}>
                  {String(step.step).padStart(2, '0')} · {step.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: `${step.accentColor}20`, color: step.accentColor }}>
                  {step.timeline}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">{step.description}</p>
              <div className="text-[10px] text-[var(--text-muted)]">✓ {step.deliverable}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
