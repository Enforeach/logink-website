'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ADS_PROCESS } from './data'

export function AdsProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #0F0A1E 0%, #120D20 40%, #0F0A1E 100%)' }}
    >
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Cara Kerjanya</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Dari kickoff hingga hasil nyata.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm">
            Proses yang jelas dan berulang supaya kamu selalu tahu apa yang terjadi berikutnya.
          </p>
        </div>

        <div className="space-y-4">
          {ADS_PROCESS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="relative rounded-xl border border-white/10 bg-[var(--bg-surface)] px-6 py-5 overflow-hidden flex items-start gap-6"
              style={{ borderLeftColor: step.accentColor, borderLeftWidth: 3 }}
            >
              {/* Watermark number */}
              <div
                className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl font-black pointer-events-none select-none"
                style={{ color: step.accentColor, opacity: 0.06 }}
              >
                {String(step.step).padStart(2, '0')}
              </div>

              {/* Step number */}
              <div
                className="text-3xl font-black flex-shrink-0 w-14 text-right"
                style={{ color: step.accentColor, opacity: 0.7 }}
              >
                {String(step.step).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">{step.description}</p>
              </div>

              {/* Timeline badge */}
              <div className="flex-shrink-0 flex flex-col items-end gap-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{ background: `${step.accentColor}20`, color: step.accentColor, border: `1px solid ${step.accentColor}40` }}
                >
                  {step.timeline}
                </span>
                {'isOngoing' in step && step.isOngoing && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
                    Berkelanjutan
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
