'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { icons, LucideProps } from 'lucide-react'
import { SOCIAL_CONTENT_PILLARS } from './data'

function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons]
  if (!Icon) return null
  return <Icon {...props} />
}


function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })

  const segments = SOCIAL_CONTENT_PILLARS.map((p) => ({
    color: p.accentColor,
    pct: p.percentage,
    name: p.name,
  }))

  return (
    <div ref={ref} className="mt-10 max-w-2xl mx-auto">
      <div className="flex rounded-full overflow-hidden h-3 gap-0.5">
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

export function SocialPillars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 px-4" style={{ background: '#0C0818' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-3">Our Approach</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Every post serves a purpose.
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-xl">
            Our content strategy is built on three pillars that move followers from awareness to action.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SOCIAL_CONTENT_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-2xl border border-[var(--border-default)] p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{
                background: `radial-gradient(ellipse at top, rgba(${pillar.accentRgb},0.07) 0%, var(--bg-surface) 60%)`,
                borderTop: `3px solid ${pillar.accentColor}`,
              }}
            >
              <div
                className="mb-4 p-2.5 rounded-xl inline-flex self-start"
                style={{ background: `rgba(${pillar.accentRgb},0.12)` }}
              >
                <LucideIcon
                  name={pillar.icon}
                  size={22}
                  strokeWidth={1.5}
                  style={{ color: pillar.accentColor }}
                />
              </div>

              <div
                className="text-2xl font-extrabold mb-0.5"
                style={{ color: pillar.accentColor }}
              >
                {pillar.name}
              </div>
              <div className="text-sm font-semibold text-[var(--text-secondary)] mb-3">{pillar.subtitle}</div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
                {pillar.description}
              </p>

              <div
                className="text-xs text-[var(--text-muted)] italic mb-5 leading-relaxed border-l-2 pl-3"
                style={{ borderColor: `${pillar.accentColor}50` }}
              >
                {pillar.examples}
              </div>

              <div
                className="text-3xl font-extrabold leading-none"
                style={{
                  background: `linear-gradient(135deg, ${pillar.accentColor}, #ffffff50)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {pillar.percentage}%
                <span className="text-sm font-normal ml-1" style={{ WebkitTextFillColor: 'var(--text-muted)' }}>
                  of content mix
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
