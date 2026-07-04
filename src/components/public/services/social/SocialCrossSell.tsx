'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const SERVICES_ID = [
  {
    title: 'Creative Services',
    color: '#F5A623',
    rgb: '245,166,35',
    description:
      'Butuh produksi video kustom, foto brand, atau motion graphics? Tim Creative Services kami memproduksi aset visual yang membuat konten sosialmu beda dari yang lain.',
    price: 'Harga per proyek',
    href: '/layanan/kreatif',
  },
  {
    title: 'Paid Advertising',
    color: '#F88438',
    rgb: '248,132,56',
    description:
      'Amplifikasi konten organik terbaikmu dengan kampanye berbayar tertarget. Retarget followers yang engaged, jangkau lookalike audience, dan dorong konversi dengan Meta Ads dan TikTok Ads.',
    price: 'Starting from Rp 6M/mo',
    href: '/layanan/paid-ads',
  },
]

const SERVICES_EN = [
  {
    title: 'Creative Services',
    color: '#F5A623',
    rgb: '245,166,35',
    description:
      'Need custom video production, brand photography, or motion graphics? Our Creative Services team produces visual assets that make your social content stand out from the crowd.',
    price: 'Priced per project',
    href: '/en/services/creative-services',
  },
  {
    title: 'Paid Advertising',
    color: '#F88438',
    rgb: '248,132,56',
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

const EASE = [0.22, 1, 0.36, 1] as const

export function SocialCrossSell({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const services = locale === 'en' ? SERVICES_EN : SERVICES_ID
  const c = CROSSSELL_COPY[locale]

  return (
    // Peach tint band — sibling services in their own accents
    <section className="py-20 md:py-28 px-4" style={{ background: 'var(--bg-tint-peach)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            {c.heading}
          </h2>
        </div>

        <div className="space-y-4">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--border-hover)] hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                    style={{ background: svc.color }}
                    aria-hidden
                  />
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">{svc.title}</h3>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: `rgba(${svc.rgb},0.12)`, color: svc.color }}
                  >
                    {svc.price}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{svc.description}</p>
              </div>
              <Link
                href={svc.href}
                className="group flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-sm font-semibold transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ color: svc.color, borderColor: `rgba(${svc.rgb},0.4)` }}
              >
                {c.learnMore}
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
