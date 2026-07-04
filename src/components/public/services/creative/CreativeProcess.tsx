'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import { Check } from 'lucide-react'
import { CREATIVE_PROCESS, CREATIVE_PROCESS_EN } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

const PROCESS_COPY = {
  id: { eyebrow: 'Cara Kami Berkreasi', heading: 'Dari brief hingga brilian.', deliverable: 'Deliverable' },
  en: { eyebrow: 'How We Create', heading: 'From brief to brilliant.', deliverable: 'Deliverable' },
}

function StepCard({
  step,
  inView,
  index,
  deliverableLabel,
  className = '',
}: {
  step: typeof CREATIVE_PROCESS[number]
  inView: boolean
  index: number
  deliverableLabel: string
  className?: string
}) {
  const isLeft = step.side === 'left'
  const isCenter = step.side === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : isCenter ? 0 : 30, y: isCenter ? -15 : 0 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: EASE }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl border border-[var(--border-default)] bg-white p-6 overflow-hidden transition-shadow duration-300 hover:shadow-card ${className}`}
      style={{ borderLeftColor: step.accentColor, borderLeftWidth: 3 }}
    >
      {/* Watermark */}
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 font-display text-6xl font-bold pointer-events-none select-none"
        style={{ color: step.accentColor, opacity: 0.08 }}
        aria-hidden
      >
        {String(step.step).padStart(2, '0')}
      </div>

      <div className="flex items-start justify-between mb-2">
        <span className="font-display text-sm font-bold" style={{ color: step.accentColor }}>
          {String(step.step).padStart(2, '0')}
        </span>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
          style={{ background: `${step.accentColor}1A`, color: step.accentColor }}
        >
          {step.timeline}
        </span>
      </div>
      <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{step.description}</p>
      <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
        <Check size={12} strokeWidth={3} style={{ color: step.accentColor }} aria-hidden />
        <span>{deliverableLabel}: {step.deliverable}</span>
      </div>
    </motion.div>
  )
}

export function CreativeProcess({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 0.7', 'end 0.7'] })
  const steps = locale === 'en' ? CREATIVE_PROCESS_EN : CREATIVE_PROCESS
  const c = PROCESS_COPY[locale]

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">
            {c.heading}
          </h2>
        </motion.div>

        {/* Desktop: alternating timeline with scroll-fill line */}
        <div className="hidden md:block relative" ref={trackRef}>
          {/* Base hairline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--border-default)]" aria-hidden />
          {/* Scroll-linked fill */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{
              scaleY: scrollYProgress,
              background: 'linear-gradient(180deg, #A855F7, #D81C5C, #F88438, #F5A623)',
            }}
            aria-hidden
          />

          <div className="space-y-10">
            {(steps as typeof CREATIVE_PROCESS).map((step, i) => {
              const isLeft = step.side === 'left'
              const isCenter = step.side === 'center'
              return (
                <div
                  key={step.step}
                  className={`relative flex ${isCenter ? 'justify-center' : isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Dot on timeline */}
                  <motion.div
                    className="absolute left-1/2 top-6 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-white z-10"
                    style={{ background: step.accentColor }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.3 }}
                    aria-hidden
                  />
                  <StepCard
                    step={step}
                    inView={inView}
                    index={i}
                    deliverableLabel={c.deliverable}
                    className={isCenter ? 'w-72' : 'w-[42%]'}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {(steps as typeof CREATIVE_PROCESS).map((step, i) => (
            <StepCard key={step.step} step={step} inView={inView} index={i} deliverableLabel={c.deliverable} />
          ))}
        </div>
      </div>
    </section>
  )
}
