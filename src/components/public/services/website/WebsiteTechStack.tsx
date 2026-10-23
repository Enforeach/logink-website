'use client'

import { motion } from 'framer-motion'
import { WEBSITE_TECH_STACK } from './data'

const TECHSTACK_COPY = {
  id: {
    eyebrow: 'Tech Stack Kami',
    heading: 'Kami pilih tool terbaik untuk proyek Anda.',
    sub: 'Tidak terpaku pada satu platform; kami merekomendasikan berdasarkan skala, budget, dan tujuan jangka panjang Anda.',
  },
  en: {
    eyebrow: 'Our Tech Stack',
    heading: 'We choose the best tool for your project.',
    sub: "Not locked to one platform; we recommend based on scale, budget, and your long-term goals.",
  },
}

export function WebsiteTechStack({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = TECHSTACK_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em] mb-3">
            {c.heading}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            {c.sub}
          </p>
        </motion.div>

        <div className="space-y-10">
          {WEBSITE_TECH_STACK.map((group, gi) => (
            <div key={group.category}>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: group.accentColor }} aria-hidden />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: gi * 0.04 + ii * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ borderColor: `${group.accentColor}66` }}
                    className="group flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-secondary)] cursor-default transition-all hover:-translate-y-0.5 hover:text-[var(--text-primary)] hover:shadow-card"
                  >
                    {/* Monochrome dot → colorizes on hover */}
                    <span
                      className="h-1.5 w-1.5 rounded-full opacity-30 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                      style={{ background: group.accentColor }}
                      aria-hidden
                    />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
