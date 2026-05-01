'use client'

import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const CARDS = [
  {
    label: 'IG Feed 1:1',
    bg: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
    aspect: 'aspect-square',
    content: (
      <div className="flex flex-col h-full p-4 justify-between">
        <div className="h-3/4 rounded-lg bg-white/10" />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <div className="h-3 w-8 rounded bg-white/30" />
            <div className="h-3 w-6 rounded bg-white/30" />
          </div>
          <div className="h-3 w-3 rounded bg-white/30" />
        </div>
      </div>
    ),
  },
  {
    label: 'Brand Guide',
    bg: 'linear-gradient(160deg,#1a0533,#2d1060)',
    aspect: 'aspect-[3/4]',
    content: (
      <div className="flex flex-col h-full p-4 gap-3">
        <div className="flex gap-2">
          {['#7C3AED','#DB2777','#D97706','#10B981'].map(c => (
            <div key={c} className="h-5 w-5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="text-white font-black text-2xl opacity-80">Aa</div>
        <div className="space-y-1.5 mt-auto">
          {[60,80,50,70].map((w,i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/20" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Video 16:9',
    bg: 'linear-gradient(135deg,#D97706,#F59E0B)',
    aspect: 'aspect-video',
    content: (
      <div className="flex h-full items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: 'Banner Ad',
    bg: 'linear-gradient(135deg,#7C3AED,#DB2777)',
    aspect: 'aspect-[3/1]',
    content: (
      <div className="flex h-full items-center justify-between px-5">
        <div className="space-y-1.5">
          <div className="h-2 w-20 rounded bg-white/40" />
          <div className="h-1.5 w-28 rounded bg-white/20" />
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-bold">CTA</div>
      </div>
    ),
  },
]

const PILLS = ['IG Feed 1:1','Story 9:16','TikTok 9:16','Banner 16:9','Brand Guide']

const HERO_COPY = {
  id: {
    trustPills: ['✓ Desain 100% kustom', '✓ 2 putaran revisi termasuk', '✓ Format multi-platform'],
    title1: 'Visual yang Berani.',
    title2: 'Cerita yang Jelas.\nBrand yang Tak Terlupakan.',
    desc: 'Dari brand identity hingga produksi video, tim kreatif kami mengubah ide menjadi visual yang menghentikan scroll dan mendorong aksi. Setiap aset dibuat untuk audiensmu, tidak pernah dari library template. Desain yang tidak hanya terlihat bagus, tapi juga perform.',
    ctaPrimary: 'Mulai Konsultasi Gratis →',
    ctaHref: '/contact?service=creative-services',
    ctaSecondary: 'Lihat Karya Kami',
    ctaSecondaryHref: '/portfolio',
  },
  en: {
    trustPills: ['✓ 100% custom design', '✓ 2 revision rounds included', '✓ Multi-platform formats'],
    title1: 'Bold Visuals.',
    title2: 'Clear Stories.\nUnforgettable Brands.',
    desc: 'From brand identity to video production, our creative team transforms ideas into visuals that stop scrolls and drive action. Every asset is made for your audience, never from a template library. Design that not only looks great, but also performs.',
    ctaPrimary: 'Start Free Consultation →',
    ctaHref: '/en/contact?service=creative-services',
    ctaSecondary: 'See Our Work',
    ctaSecondaryHref: '/en/portfolio',
  },
}

export function CreativeHero({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const c = HERO_COPY[locale]

  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setActive(a => (a + 1) % CARDS.length), 4000)
    return () => clearInterval(t)
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-24 pb-16"
      style={{ background: '#0F0A1E' }}
    >
      <div className="absolute inset-0 animated-mesh opacity-60" />
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Creative Services</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[var(--text-primary)]">
            {c.title1}{' '}
            <span className="gradient-text">{c.title2.split('\n').map((line, i) => (
              <span key={i}>{line}{i < c.title2.split('\n').length - 1 && <br />}</span>
            ))}</span>
          </h1>

          <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md">
            {c.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {c.trustPills.map(p => (
              <span key={p} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text-secondary)]">{p}</span>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link href={c.ctaHref} className="gradient-bg px-6 py-3 rounded-xl font-semibold text-white text-sm hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 transition-all">
              {c.ctaPrimary}
            </Link>
            <Link href={c.ctaSecondaryHref} className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/15 text-[var(--text-secondary)] hover:border-white/30 hover:text-[var(--text-primary)] transition-all">
              {c.ctaSecondary}
            </Link>
          </div>
        </motion.div>

        {/* Right: mockup stack */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 6 }}
          animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-[320px]"
          >
            {/* Stacked cards */}
            <div className="relative h-64">
              {CARDS.map((card, i) => {
                const offset = i - active
                const normalised = ((offset % CARDS.length) + CARDS.length) % CARDS.length
                const zIndex = CARDS.length - normalised
                const isTop = normalised === 0

                return (
                  <motion.div
                    key={card.label}
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                    style={{ background: card.bg }}
                    animate={{
                      scale: isTop ? 1 : 1 - normalised * 0.05,
                      y: isTop ? 0 : normalised * 14,
                      x: isTop ? 0 : normalised * 8,
                      rotate: isTop ? 0 : normalised * 2,
                      zIndex,
                      opacity: normalised > 2 ? 0 : 1,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {card.content}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/40 text-[10px] text-white/70 font-semibold">
                      {card.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Floating pills */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {PILLS.map((pill, i) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-3 py-1 rounded-full text-xs font-semibold border border-white/15 bg-white/5 text-[var(--text-muted)]"
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
