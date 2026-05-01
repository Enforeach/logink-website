'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const SERVICES_ID = [
  {
    title: 'Creative Services',
    color: '#F59E0B',
    rgb: '245,158,11',
    description:
      'Butuh produksi video kustom, foto brand, atau motion graphics? Tim Creative Services kami memproduksi aset visual yang membuat konten sosialmu beda dari yang lain.',
    price: 'Harga per proyek',
    href: '/layanan/kreatif',
  },
  {
    title: 'Paid Advertising',
    color: '#D97706',
    rgb: '217,119,6',
    description:
      'Amplifikasi konten organik terbaikmu dengan kampanye berbayar tertarget. Retarget followers yang engaged, jangkau lookalike audience, dan dorong konversi dengan Meta Ads dan TikTok Ads.',
    price: 'Starting from Rp 6M/mo',
    href: '/layanan/paid-ads',
  },
]

const SERVICES_EN = [
  {
    title: 'Creative Services',
    color: '#F59E0B',
    rgb: '245,158,11',
    description:
      'Need custom video production, brand photography, or motion graphics? Our Creative Services team produces visual assets that make your social content stand out from the crowd.',
    price: 'Priced per project',
    href: '/en/services/creative-services',
  },
  {
    title: 'Paid Advertising',
    color: '#D97706',
    rgb: '217,119,6',
    description:
      'Amplify your best organic content with targeted paid campaigns. Retarget engaged followers, reach lookalike audiences, and drive conversions with Meta Ads and TikTok Ads.',
    price: 'Starting from Rp 6M/mo',
    href: '/en/services/paid-advertising',
  },
]

const CROSSSELL_COPY = {
  id: { eyebrow: 'Cocok dikombinasikan dengan', heading: 'Lebih banyak cara untuk tumbuh.', learnMore: 'Pelajari lebih lanjut' },
  en: { eyebrow: 'Pairs well with', heading: 'More ways to grow.', learnMore: 'Learn more' },
}

export function SocialCrossSell({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const services = locale === 'en' ? SERVICES_EN : SERVICES_ID
  const c = CROSSSELL_COPY[locale]

  return (
    <section className="py-20 px-4" style={{ background: '#0C0818' }}>
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-3">{c.eyebrow}</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
            {c.heading}
          </h2>
        </div>

        <div className="space-y-4">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="flex items-center justify-between gap-5 p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:translate-x-1 hover:border-[var(--border-hover)] transition-all duration-300"
              style={{ borderLeft: `3px solid ${svc.color}` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-bold text-[var(--text-primary)]">{svc.title}</h3>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: `rgba(${svc.rgb},0.12)`, color: svc.color }}
                  >
                    {svc.price}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{svc.description}</p>
              </div>
              <Link
                href={svc.href}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                style={{ color: svc.color }}
              >
                {c.learnMore}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
