'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    href: '/services/seo-content-marketing',
    accent: '#7C3AED',
    accentRgb: '124,58,237',
    title: 'SEO & Content Marketing',
    description:
      'Tangkap traffic organik yang terus berkembang sementara iklanmu mendatangkan hasil cepat. SEO + Ads bersama artinya kamu mendominasi paid dan organic — kompetitor melihatmu di mana-mana.',
    pricing: 'Mulai dari Rp 6 Juta/bln',
  },
  {
    href: '/services/creative-services',
    accent: '#F59E0B',
    accentRgb: '245,158,11',
    title: 'Creative Services',
    description:
      'Iklan yang perform butuh kreativitas yang bikin berhenti scroll. Tim desain dan video kami memproduksi aset iklan yang tidak terlihat seperti iklan — dari Meta carousel hingga video native TikTok.',
    pricing: 'Harga per proyek',
  },
] as const

export function AdsCrossSell() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-20 px-4"
      style={{ background: '#0C0818' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Cocok dikombinasikan dengan</p>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
            Perkuat hasilmu.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={card.href}
                className="group block rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-6 transition-all hover:border-white/20 hover:translate-x-1"
                style={{ borderLeftColor: card.accent, borderLeftWidth: 3 }}
              >
                <div className="font-bold text-lg mb-2" style={{ color: card.accent }}>{card.title}</div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{card.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">{card.pricing}</span>
                  <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform" style={{ color: card.accent }}>
                    Pelajari lebih lanjut →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
