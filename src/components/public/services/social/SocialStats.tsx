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

const STATS: StatItem[] = [
  {
    Icon: LayoutGrid,
    value: 4,
    suffix: '',
    label: 'Platform Dicakup',
    context: 'Instagram, TikTok, Facebook, LinkedIn — dikelola sebagai satu strategi terpadu.',
  },
  {
    Icon: FileText,
    value: 30,
    suffix: '+',
    label: 'Post / Bulan',
    context: 'Kehadiran konsisten, nol hari terlewat. Konten diproduksi dan disetujui sebelum tayang.',
  },
  {
    Icon: Star,
    value: 100,
    suffix: '%',
    label: 'Konten Original',
    context: 'Didesain khusus untuk brandmu. Tidak ada template stock, tidak ada grafis daur ulang.',
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

export function SocialStats() {
  return (
    <section
      className="py-16 px-4 relative"
      style={{ background: '#0A0716' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(219,39,119,0.3),transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.3),transparent)' }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center text-center p-7 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4 p-2.5 rounded-xl inline-flex" style={{ background: 'rgba(219,39,119,0.12)' }}>
                <stat.Icon size={22} strokeWidth={1.5} className="text-pink-400" />
              </div>
              <div
                className="text-5xl font-extrabold mb-2 leading-none"
                style={{
                  background: 'linear-gradient(135deg, #DB2777, #7C3AED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-3">{stat.label}</div>
              <div className="h-px w-10 mb-3" style={{ background: 'linear-gradient(90deg,#DB2777,#7C3AED)' }} />
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{stat.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
