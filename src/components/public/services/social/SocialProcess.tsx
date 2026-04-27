'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { icons, LucideProps } from 'lucide-react'
import { SOCIAL_PROCESS } from './data'

function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons]
  if (!Icon) return null
  return <Icon {...props} />
}

function ProcessCard({ step, index }: { step: typeof SOCIAL_PROCESS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 snap-start flex-shrink-0 hover:-translate-y-1 transition-transform duration-300"
      style={{
        borderTop: `3px solid ${step.accentColor}`,
        minWidth: 220,
      }}
    >
      {/* Timeline badge */}
      <span
        className="inline-flex self-start px-2.5 py-1 rounded-full text-[10px] font-bold mb-5"
        style={{
          background: `${step.accentColor}18`,
          color: step.accentColor,
          border: `1px solid ${step.accentColor}40`,
        }}
      >
        {step.timeline}
      </span>

      {/* Step number behind title */}
      <div className="relative mb-1">
        <span
          className="absolute -top-3 left-0 text-5xl font-black leading-none select-none"
          style={{ color: `${step.accentColor}20` }}
        >
          {String(step.step).padStart(2, '0')}
        </span>
        <div className="relative flex items-center gap-2 pt-5">
          <LucideIcon name={step.icon} size={18} strokeWidth={1.5} style={{ color: step.accentColor }} />
          <h3 className="font-bold text-[var(--text-primary)]">{step.title}</h3>
        </div>
      </div>

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3 flex-1">{step.description}</p>

      <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
        <p className="text-[11px] text-[var(--text-muted)] italic">→ {step.deliverable}</p>
      </div>
    </motion.div>
  )
}

export function SocialProcess() {
  return (
    <section className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-3">Cara Kerjanya</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">Dari kickoff hingga hasil nyata.</h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-xl">
            Proses onboarding yang jelas supaya kamu tahu persis apa yang terjadi — dan kapan konten tayang.
          </p>
        </div>

        {/* Desktop: 4-column grid | Mobile: horizontal scroll */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {SOCIAL_PROCESS.map((step, i) => (
            <ProcessCard key={step.step} step={step} index={i} />
          ))}
        </div>

        {/* Repeat note */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--border-default)]" />
          <p className="text-xs text-[var(--text-muted)] text-center max-w-sm px-4">
            Lalu siklus bulanan berulang. Setiap bulan membangun bulan sebelumnya — kami analisis apa yang berhasil, sempurnakan strategi, dan produksi konten berikutnya.
          </p>
          <div className="h-px flex-1 bg-[var(--border-default)]" />
        </div>
      </div>
    </section>
  )
}
