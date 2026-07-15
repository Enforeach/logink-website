'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
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
    bg: 'linear-gradient(160deg,#231A26,#3D2A44)',
    aspect: 'aspect-[3/4]',
    content: (
      <div className="flex flex-col h-full p-4 gap-3">
        <div className="flex gap-2">
          {['#A8138F','#D81C5C','#F88438','#F5A623'].map(c => (
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
    bg: 'linear-gradient(135deg,#F88438,#F5A623)',
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
    bg: 'linear-gradient(135deg,#A8138F,#D81C5C)',
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
    badge: 'Jasa Desain Kreatif Jakarta — Branding, Konten Visual & Produksi Video',
    trustPills: ['✓ Desain 100% kustom', '✓ 2 putaran revisi sudah termasuk', '✓ Format multi-platform'],
    home: 'Beranda', services: 'Layanan', homeHref: '/', servicesHref: '/layanan',
    title1: 'Visual yang Berani.',
    title2: 'Cerita yang Jelas.\nBrand yang Tak Terlupakan.',
    desc: 'Dari brand identity hingga produksi video, tim kreatif kami mengubah ide menjadi visual yang mencuri perhatian dan mendorong audiens untuk bertindak. Setiap aset dibuat khusus untuk audiens Anda, bukan template pasaran. Desain yang tidak hanya indah dipandang, tapi juga terbukti efektif.',
    ctaPrimary: 'Mulai Konsultasi Gratis →',
    ctaHref: '/contact?service=creative-services',
    ctaSecondary: 'Lihat Karya Kami',
    ctaSecondaryHref: '/portfolio',
  },
  en: {
    badge: 'Creative Design Services Jakarta — Branding, Visual Content & Video Production',
    trustPills: ['✓ 100% custom design', '✓ 2 revision rounds included', '✓ Multi-platform formats'],
    home: 'Home', services: 'Services', homeHref: '/en', servicesHref: '/en/services',
    title1: 'Bold Visuals.',
    title2: 'Clear Stories.\nUnforgettable Brands.',
    desc: 'From brand identity to video production, our creative team transforms ideas into visuals that stop scrolls and drive action. Every asset is made for your audience, never from a template library. Design that not only looks great, but also performs.',
    ctaPrimary: 'Start Free Consultation →',
    ctaHref: '/en/contact?service=creative-services',
    ctaSecondary: 'See Our Work',
    ctaSecondaryHref: '/en/portfolio',
  },
}

const EASE = [0.22, 1, 0.36, 1] as const

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
      className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-36 md:pt-32 pb-16 mesh-gradient"
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden />
      {/* Gold + crimson accent orbs */}
      <div
        className="orb top-[12%] right-[10%] h-96 w-96"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.20) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="orb bottom-[12%] left-[6%] h-72 w-72"
        style={{ background: 'radial-gradient(circle, rgba(216,28,92,0.10) 0%, transparent 70%)', animationDelay: '-7s' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
          <Link href={c.homeHref} className="hover:text-[var(--text-primary)] transition-colors">{c.home}</Link>
          <span>/</span>
          <Link href={c.servicesHref} className="hover:text-[var(--text-primary)] transition-colors">{c.services}</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">Creative Services</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-gold mb-6 border border-brand-gold/25"
              style={{ background: 'rgba(245,166,35,0.10)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" aria-hidden />
              {c.badge}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-[1.08] tracking-tight mb-5"
            >
              {c.title1}{' '}
              <span className="gradient-text">{c.title2.split('\n').map((line, i) => (
                <span key={i}>{line}{i < c.title2.split('\n').length - 1 && <br />}</span>
              ))}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
              className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg mb-8"
            >
              {c.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <Link
                href={c.ctaHref}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
              >
                {c.ctaPrimary}
              </Link>
              <Link
                href={c.ctaSecondaryHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold text-sm hover:bg-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
              >
                {c.ctaSecondary}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
              className="flex flex-wrap gap-2"
            >
              {c.trustPills.map(p => (
                <span key={p} className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-white text-[var(--text-secondary)]">{p}</span>
              ))}
            </motion.div>
          </div>

          {/* Right: mockup stack */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 6 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
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
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      style={{ background: card.bg, boxShadow: '0 24px 64px -20px rgba(35,26,38,0.35), 0 8px 32px -8px rgba(245,166,35,0.18)' }}
                      animate={{
                        scale: isTop ? 1 : 1 - normalised * 0.05,
                        y: isTop ? 0 : normalised * 14,
                        x: isTop ? 0 : normalised * 8,
                        rotate: isTop ? 0 : normalised * 2,
                        zIndex,
                        opacity: normalised > 2 ? 0 : 1,
                      }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      {card.content}
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/40 text-[10px] text-white/80 font-semibold">
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
                    className="px-3 py-1 rounded-full text-xs font-semibold border border-[var(--border-default)] bg-white text-[var(--text-secondary)]"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
