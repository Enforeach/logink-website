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

  const angle = (val / 100) * 180 - 90
  const r = 36
  const arc = `M ${50 - r},50 A ${r},${r} 0 0,1 ${50 + r},50`

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-24 h-14">
        <svg viewBox="0 0 100 56" className="w-full h-full">
          <path d={arc} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
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
          <text x="50" y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#10B981">{val}</text>
        </svg>
      </div>
      <span className="text-[10px] text-[var(--text-muted)] mt-1">PageSpeed Score</span>
    </div>
  )
}

const TECHFEATURES_COPY = {
  id: {
    eyebrow: 'Dibangun Dengan',
    heading: 'Setiap site yang kami bangun memenuhi standar ini.',
    sub: 'Bukan fitur tambahan opsional — ini adalah baseline kami untuk setiap proyek.',
    perfTitle: 'Build Prioritaskan Performa',
    perfDesc: 'Setiap site dikirim dengan load time di bawah 2 detik. Bundle code-split, gambar lazy-loaded, font teroptimasi, dan pengiriman via CDN. Kami tidak hanya membangun — kami membangun dengan cepat. Skor PageSpeed-mu akan 90+ atau kami perbaiki gratis.',
    mobileTitle: 'Responsif Mobile-First',
    mobileDesc: 'Didesain untuk layar mobile dulu, baru diperluas. Lebih dari 70% traffic web Indonesia berasal dari mobile — sitemu terlihat sempurna di setiap perangkat dan orientasi.',
  },
  en: {
    eyebrow: 'Built With',
    heading: 'Every site we build meets these standards.',
    sub: "These aren't optional add-ons — this is our baseline for every project.",
    perfTitle: 'Performance-First Build',
    perfDesc: 'Every site is delivered with a sub-2-second load time. Code-split bundles, lazy-loaded images, optimized fonts, and CDN delivery. We don\'t just build — we build fast. Your PageSpeed score will be 90+ or we fix it for free.',
    mobileTitle: 'Mobile-First Responsive',
    mobileDesc: 'Designed for mobile screens first, then scaled up. Over 70% of web traffic in Indonesia comes from mobile — your site looks perfect on every device and orientation.',
  },
}

export function WebsiteTechFeatures({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const features = locale === 'en' ? WEBSITE_TECH_FEATURES_EN : WEBSITE_TECH_FEATURES
  const c = TECHFEATURES_COPY[locale]

  return (
    <section
      ref={ref}
      className="py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #0A0716 0%, #0E0B1E 50%, #0A0716 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {c.heading}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {c.sub}
          </p>
        </div>

        {/* Row 1: 2-col card + 1-col card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {/* Performance — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-7 relative overflow-hidden"
            style={{ borderLeftColor: '#06B6D4', borderLeftWidth: 3 }}
          >
            <div className="absolute right-0 top-0 w-64 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top right, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="font-extrabold text-[var(--text-primary)] text-lg mb-2">{c.perfTitle}</h3>
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
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-7 relative overflow-hidden"
            style={{ borderLeftColor: '#7C3AED', borderLeftWidth: 3 }}
          >
            <div className="absolute right-2 top-2 text-5xl font-black pointer-events-none select-none"
              style={{ color: '#7C3AED', opacity: 0.05 }}>70%</div>
            <h3 className="font-extrabold text-[var(--text-primary)] mb-2">{c.mobileTitle}</h3>
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
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i + 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-6"
              style={{ borderLeftColor: feat.accentColor, borderLeftWidth: 3 }}
            >
              <h3 className="font-extrabold text-[var(--text-primary)] mb-2">{feat.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
