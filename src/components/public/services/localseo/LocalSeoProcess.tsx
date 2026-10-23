'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import { LOCALSEO_PROCESS_STEPS, LOCALSEO_PROCESS_STEPS_EN } from './data'

const PROCESS_COPY = {
  id: { eyebrow: 'Cara Kerjanya', heading: 'Dari audit lokal hingga dominasi map pack.', sub: 'Proses yang jelas dan berulang agar Anda selalu tahu apa yang terjadi selanjutnya.' },
  en: { eyebrow: 'How It Works', heading: 'From local audit to map-pack dominance.', sub: 'A clear, repeatable process so you always know what happens next.' },
}

export function LocalSeoProcess({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.7', 'end 0.7'],
  })
  const steps = locale === 'en' ? LOCALSEO_PROCESS_STEPS_EN : LOCALSEO_PROCESS_STEPS
  const c = PROCESS_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">{c.heading}</h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto">{c.sub}</p>
        </motion.div>

        <div className="relative" ref={trackRef}>
          {/* Base hairline + scroll-linked fill */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block bg-[var(--border-default)]" aria-hidden />
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block origin-top"
            style={{
              scaleY: scrollYProgress,
              background: 'linear-gradient(to bottom, #0D9488, #14B8A6, #06B6D4)',
            }}
            aria-hidden
          />

          <div className="space-y-16">
            {(steps as typeof LOCALSEO_PROCESS_STEPS).map((step, i) => (
              <StepRow key={i} step={step} isLeft={step.align === 'left'} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepRow({
  step,
  isLeft,
}: {
  step: typeof LOCALSEO_PROCESS_STEPS[number]
  isLeft: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="relative">
      {/* Step dot on the line */}
      <div
        className="absolute left-4 top-3 h-4 w-4 rounded-full border-2 border-white hidden md:flex items-center justify-center z-10"
        style={{ background: step.color }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 md:pl-14">
        {/* Title card */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={isLeft ? 'md:order-1' : 'md:order-2'}
        >
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-display text-5xl font-bold leading-none" style={{ color: step.color }}>
              {step.step}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest">{step.duration}</span>
          </div>
          <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">{step.title}</h3>
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
