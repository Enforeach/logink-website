'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion'
import { LayoutGrid, FileText, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type StatItem = {
  Icon: LucideIcon
  value: number
  suffix: string
  label: string
  context: string
}

const STATS_ID: StatItem[] = [
  {
    Icon: LayoutGrid,
    value: 4,
    suffix: '',
    label: 'Platform Dicakup',
    context: 'Instagram, TikTok, Facebook, LinkedIn: dikelola sebagai satu strategi terpadu.',
  },
  {
    Icon: FileText,
    value: 30,
    suffix: '+',
    label: 'Post / Bulan',
    context: 'Kehadiran konsisten, tidak ada hari yang terlewat. Konten diproduksi dan disetujui sebelum tayang.',
  },
  {
    Icon: Star,
    value: 100,
    suffix: '%',
    label: 'Konten Original',
    context: 'Didesain khusus untuk brand Anda. Tidak ada template pasaran, tidak ada grafis daur ulang.',
  },
]

const STATS_EN: StatItem[] = [
  {
    Icon: LayoutGrid,
    value: 4,
    suffix: '',
    label: 'Platforms Covered',
    context: 'Instagram, TikTok, Facebook, LinkedIn: managed as one integrated strategy.',
  },
  {
    Icon: FileText,
    value: 30,
    suffix: '+',
    label: 'Posts / Month',
    context: 'Consistent presence, zero missed days. Content produced and approved before it goes live.',
  },
  {
    Icon: Star,
    value: 100,
    suffix: '%',
    label: 'Original Content',
    context: 'Custom-designed for your brand. No stock templates, no recycled graphics.',
  },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString())

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: 'easeOut' })
    }
  }, [isInView, count, target])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const EASE = [0.22, 1, 0.36, 1] as const

export function SocialStats({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const STATS = locale === 'en' ? STATS_EN : STATS_ID
  return (
    // Ink band, one of max two inverted moments on this page
    <section className="py-20 md:py-24 px-4 relative overflow-hidden" style={{ background: 'var(--bg-ink)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(216,28,92,0.5),transparent)' }}
        aria-hidden
      />
      <div
        className="orb top-[-30%] right-[10%] h-96 w-96 opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(216,28,92,0.25) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div className="max-w-4xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="flex flex-col items-center text-center p-7 rounded-2xl border transition-transform duration-300 hover:-translate-y-1"
              style={{
                borderColor: 'rgba(253,248,243,0.12)',
                background: 'rgba(253,248,243,0.04)',
              }}
            >
              <div className="mb-4 p-2.5 rounded-xl inline-flex" style={{ background: 'rgba(216,28,92,0.18)' }}>
                <stat.Icon size={22} strokeWidth={1.5} className="text-brand-coral" />
              </div>
              <div className="font-display text-5xl md:text-6xl font-bold mb-2 leading-none gradient-text">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-on-ink)' }}>{stat.label}</div>
              <div className="h-px w-10 mb-3 gradient-bg" aria-hidden />
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,248,243,0.55)' }}>{stat.context}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
