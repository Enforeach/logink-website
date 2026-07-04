'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { type LucideProps, ClipboardList, Compass, PenLine, CalendarCheck } from 'lucide-react'
import type { FC } from 'react'
import { SOCIAL_PROCESS, SOCIAL_PROCESS_EN } from './data'

const ICON_MAP: Record<string, FC<LucideProps>> = { ClipboardList, Compass, PenLine, CalendarCheck }

function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon {...props} />
}

const EASE = [0.22, 1, 0.36, 1] as const

function ProcessStep({ step, index }: { step: typeof SOCIAL_PROCESS[number]; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="relative flex gap-5 sm:gap-7 pl-0"
    >
      {/* Number marker on the connector line */}
      <div className="relative z-10 flex-shrink-0">
        <div
          className="h-11 w-11 rounded-2xl bg-white border flex items-center justify-center font-display text-lg font-bold"
          style={{ borderColor: `${step.accentColor}40`, color: step.accentColor }}
        >
          {step.step}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 rounded-2xl border border-[var(--border-default)] bg-white p-6 mb-8 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: `${step.accentColor}14`, color: step.accentColor }}
          >
            {step.timeline}
          </span>
          <div className="flex items-center gap-2">
            <LucideIcon name={step.icon} size={18} strokeWidth={1.5} style={{ color: step.accentColor }} />
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">{step.title}</h3>
          </div>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>

        <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
          <p className="text-[11px] text-[var(--text-muted)] italic">→ {step.deliverable}</p>
        </div>
      </div>
    </motion.li>
  )
}

const PROC_COPY = {
  id: { eyebrow: 'Cara Kerjanya', heading: 'Dari kickoff hingga hasil nyata.', sub: 'Proses onboarding yang jelas supaya kamu tahu persis apa yang terjadi dan kapan konten tayang.', repeatNote: 'Lalu siklus bulanan berulang. Setiap bulan membangun bulan sebelumnya: kami analisis apa yang berhasil, sempurnakan strategi, dan produksi konten berikutnya.' },
  en: { eyebrow: 'How It Works', heading: 'From kickoff to real results.', sub: 'A clear onboarding process so you know exactly what happens and when content goes live.', repeatNote: 'Then the monthly cycle repeats. Each month builds on the last: we analyze what worked, refine the strategy, and produce the next round of content.' },
}

export function SocialProcess({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const steps = locale === 'en' ? SOCIAL_PROCESS_EN : SOCIAL_PROCESS
  const c = PROC_COPY[locale]
  const timelineRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.6'],
  })

  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">{c.heading}</h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl">
            {c.sub}
          </p>
        </div>

        {/* Vertical timeline with scroll-fill connector line */}
        <ol ref={timelineRef} className="relative list-none m-0 p-0">
          <div
            className="absolute left-[21px] top-2 bottom-10 w-px bg-[var(--border-default)]"
            aria-hidden
          />
          <motion.div
            className="absolute left-[21px] top-2 bottom-10 w-px gradient-brand-bg origin-top"
            style={{ scaleY: scrollYProgress }}
            aria-hidden
          />
          {(steps as typeof SOCIAL_PROCESS).map((step, i) => (
            <ProcessStep key={step.step} step={step} index={i} />
          ))}
        </ol>

        {/* Repeat note */}
        <div className="mt-2 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--border-default)]" />
          <p className="text-xs text-[var(--text-muted)] text-center max-w-sm px-4">
            {c.repeatNote}
          </p>
          <div className="h-px flex-1 bg-[var(--border-default)]" />
        </div>
      </div>
    </section>
  )
}
