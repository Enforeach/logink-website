'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { WEBSITE_TECH_FEATURES, WEBSITE_TECH_FEATURES_EN } from './data'

function PageSpeedGauge({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1000, 1)
      setVal(Math.round(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  const r = 36
  const arc = `M ${50 - r},50 A ${r},${r} 0 0,1 ${50 + r},50`

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-24 h-14">
        <svg viewBox="0 0 100 56" className="w-full h-full">
          <path d={arc} fill="none" stroke="rgba(35,26,38,0.08)" strokeWidth="8" strokeLinecap="round" />
          <motion.path
            d={arc}
            fill="none"
            stroke="#10B981"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * r}`}
            strokeDashoffset={`${Math.PI * r * (1 - val / 100)}`}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <text x="50" y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#059669">{val}</text>
        </svg>
      </div>
      <span className="text-[10px] text-[var(--text-muted)] mt-1">PageSpeed Score</span>
    </div>
  )
}

const TECHFEATURES_COPY = {
  id: {
    eyebrow: 'Dibangun Dengan',
    heading: 'Setiap website yang kami bangun memenuhi standar ini.',
    sub: 'Bukan fitur tambahan opsional: ini adalah baseline kami untuk setiap proyek.',
    perfTitle: 'Dibangun untuk Performa Tinggi',
    perfDesc: 'Setiap website dibangun dengan load time di bawah 2 detik. Bundle code-split, gambar lazy-loaded, font teroptimasi, dan delivery lewat CDN. Bukan sekadar dibangun, tapi dibangun untuk kecepatan. Skor PageSpeed Anda dijamin 90+ atau kami perbaiki gratis.',
    mobileTitle: 'Responsif Mobile-First',
    mobileDesc: 'Didesain untuk layar mobile lebih dulu, lalu dioptimalkan untuk layar yang lebih besar. Lebih dari 70% traffic web Indonesia berasal dari mobile, dan website Anda tampil sempurna di setiap perangkat dan orientasi.',
  },
  en: {
    eyebrow: 'Built With',
    heading: 'Every site we build meets these standards.',
    sub: "These aren't optional add-ons: this is our baseline for every project.",
    perfTitle: 'Performance-First Build',
    perfDesc: 'Every site is delivered with a sub-2-second load time. Code-split bundles, lazy-loaded images, optimized fonts, and CDN delivery. We don\'t just build; we build fast. Your PageSpeed score will be 90+ or we fix it for free.',
    mobileTitle: 'Mobile-First Responsive',
    mobileDesc: 'Designed for mobile screens first, then scaled up. Over 70% of web traffic in Indonesia comes from mobile, and your site looks perfect on every device and orientation.',
  },
}

export function WebsiteTechFeatures({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const features = locale === 'en' ? WEBSITE_TECH_FEATURES_EN : WEBSITE_TECH_FEATURES
  const c = TECHFEATURES_COPY[locale]

  const cardBase =
    'rounded-2xl border border-[var(--border-default)] bg-white relative overflow-hidden hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)] hover:-translate-y-1 transition-all duration-300'

  return (
    <section className="py-20 md:py-28 px-6" style={{ background: 'var(--bg-tint-lilac)' }}>
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
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            {c.sub}
          </p>
        </motion.div>

        {/* Row 1: 2-col card + 1-col card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {/* Performance: spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`md:col-span-2 p-7 ${cardBase}`}
          >
            <span className="absolute top-0 left-0 right-0 h-1" style={{ background: '#C084FC' }} aria-hidden />
            <div className="absolute right-0 top-0 w-64 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top right, rgba(192,132,252,0.14) 0%, transparent 70%)' }} aria-hidden />
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="font-display font-bold text-[var(--text-primary)] text-lg mb-2">{c.perfTitle}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {c.perfDesc}
                </p>
              </div>
              <div className="shrink-0">
                <PageSpeedGauge target={95} />
              </div>
            </div>
          </motion.div>

          {/* Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`p-7 ${cardBase}`}
          >
            <span className="absolute top-0 left-0 right-0 h-1" style={{ background: '#A855F7' }} aria-hidden />
            <div className="absolute right-2 top-3 text-5xl font-black pointer-events-none select-none font-display"
              style={{ color: '#A855F7', opacity: 0.07 }} aria-hidden>70%</div>
            <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">{c.mobileTitle}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {c.mobileDesc}
            </p>
          </motion.div>
        </div>

        {/* Row 2: 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {(features as typeof WEBSITE_TECH_FEATURES).slice(2).map((feat, i) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i + 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`p-6 ${cardBase}`}
            >
              <span className="absolute top-0 left-0 right-0 h-1" style={{ background: feat.accentColor }} aria-hidden />
              <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">{feat.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
