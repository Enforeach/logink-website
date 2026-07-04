'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { type LucideProps, Smartphone, Film, Briefcase, BookOpen, Sparkles, ShoppingCart, ClipboardList, Compass, PenLine, CalendarCheck } from 'lucide-react'
import type { FC } from 'react'
import { SOCIAL_CONTENT_PILLARS, SOCIAL_CONTENT_PILLARS_EN } from './data'

const ICON_MAP: Record<string, FC<LucideProps>> = { Smartphone, Film, Briefcase, BookOpen, Sparkles, ShoppingCart, ClipboardList, Compass, PenLine, CalendarCheck }

function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon {...props} />
}

// Educate → lilac, Entertain → rose, Convert → peach
const PILLAR_TINTS = ['var(--bg-tint-lilac)', 'var(--bg-tint-rose)', 'var(--bg-tint-peach)']

function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })

  const segments = SOCIAL_CONTENT_PILLARS.map((p) => ({
    color: p.accentColor,
    pct: p.percentage,
    name: p.name,
  }))

  return (
    <div ref={ref} className="mt-12 max-w-2xl mx-auto">
      <div className="flex rounded-full overflow-hidden h-3 gap-0.5" style={{ background: 'var(--border-default)' }}>
        {segments.map((s) => (
          <motion.div
            key={s.name}
            initial={{ flex: 0 }}
            animate={inView ? { flex: s.pct } : { flex: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            style={{ background: s.color, minWidth: 0 }}
          />
        ))}
      </div>
      <div className="flex mt-2.5 gap-0.5">
        {segments.map((s) => (
          <div key={s.name} style={{ flex: s.pct }} className="flex justify-center">
            <span className="text-[11px] font-semibold" style={{ color: s.color }}>
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PILLARS_COPY = {
  id: { eyebrow: 'Pendekatan Kami', heading: 'Setiap post punya tujuan.', sub: 'Strategi konten kami dibangun di atas tiga pilar yang menggerakkan followers dari awareness ke aksi nyata.' },
  en: { eyebrow: 'Our Approach', heading: 'Every post has a purpose.', sub: 'Our content strategy is built on three pillars that move followers from awareness to real action.' },
}

const EASE = [0.22, 1, 0.36, 1] as const

export function SocialPillars({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const pillars = locale === 'en' ? SOCIAL_CONTENT_PILLARS_EN : SOCIAL_CONTENT_PILLARS
  const c = PILLARS_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            {c.heading}
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl">
            {c.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              className="relative overflow-hidden rounded-2xl p-7 flex flex-col hover:-translate-y-1 hover:shadow-card transition-all duration-300"
              style={{ background: PILLAR_TINTS[i] }}
            >
              {/* Big display initial */}
              <span
                aria-hidden
                className="absolute -top-8 -right-3 font-display font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: '9rem', color: pillar.accentColor, opacity: 0.1 }}
              >
                {pillar.name.charAt(0)}
              </span>

              <div
                className="relative mb-5 h-11 w-11 rounded-xl inline-flex items-center justify-center self-start"
                style={{ background: `rgba(${pillar.accentRgb},0.14)` }}
              >
                <LucideIcon
                  name={pillar.icon}
                  size={22}
                  strokeWidth={1.5}
                  style={{ color: pillar.accentColor }}
                />
              </div>

              <div className="relative font-display text-2xl font-bold mb-0.5 text-[var(--text-primary)]">
                {pillar.name}
              </div>
              <div className="relative text-sm font-semibold mb-3" style={{ color: pillar.accentColor }}>{pillar.subtitle}</div>

              <p className="relative text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
                {pillar.description}
              </p>

              <div
                className="relative text-xs text-[var(--text-muted)] italic mb-6 leading-relaxed border-l-2 pl-3"
                style={{ borderColor: `rgba(${pillar.accentRgb},0.4)` }}
              >
                {pillar.examples}
              </div>

              <div className="relative font-display text-4xl font-bold leading-none" style={{ color: pillar.accentColor }}>
                {pillar.percentage}%
                <span className="text-sm font-normal font-outfit ml-1.5 text-[var(--text-muted)]">
                  dari mix konten
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <ProgressBar />
      </div>
    </section>
  )
}
