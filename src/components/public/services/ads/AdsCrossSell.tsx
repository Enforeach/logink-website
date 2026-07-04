'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const CARDS_ID = [
  {
    href: '/layanan/jasa-seo-profesional',
    accent: '#A855F7',
    title: 'SEO & Content Marketing',
    description:
      'Tangkap traffic organik yang terus berkembang sementara iklanmu mendatangkan hasil cepat. SEO + Ads bersama artinya kamu mendominasi paid dan organic, sehingga kompetitor melihatmu di mana-mana.',
    pricing: 'Mulai dari Rp 6 Juta/bln',
  },
  {
    href: '/layanan/kreatif',
    accent: '#F5A623',
    title: 'Creative Services',
    description:
      'Iklan yang perform butuh kreativitas yang bikin berhenti scroll. Tim desain dan video kami memproduksi aset iklan yang tidak terlihat seperti iklan: dari Meta carousel hingga video native TikTok.',
    pricing: 'Harga per proyek',
  },
] as const

const CARDS_EN = [
  {
    href: '/en/services/seo-content-marketing',
    accent: '#A855F7',
    title: 'SEO & Content Marketing',
    description:
      'Capture compounding organic traffic while your ads drive quick wins. SEO + Ads together means you dominate both paid and organic, so competitors see you everywhere.',
    pricing: 'Starting from Rp 6M/mo',
  },
  {
    href: '/en/services/creative-services',
    accent: '#F5A623',
    title: 'Creative Services',
    description:
      'High-performing ads need scroll-stopping creative. Our design and video team produces ad assets that don\'t look like ads: from Meta carousels to native TikTok videos.',
    pricing: 'Priced per project',
  },
] as const

const CROSSSELL_COPY = {
  id: { eyebrow: 'Cocok dikombinasikan dengan', heading: 'Perkuat hasilmu.', learnMore: 'Pelajari lebih lanjut →' },
  en: { eyebrow: 'Pairs well with', heading: 'Amplify your results.', learnMore: 'Learn more →' },
}

export function AdsCrossSell({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const cards = locale === 'en' ? CARDS_EN : CARDS_ID
  const c = CROSSSELL_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6" style={{ background: 'var(--bg-tint-peach)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">
            {c.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(cards as typeof CARDS_ID).map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={card.href}
                className="group relative flex flex-col h-full rounded-2xl border border-[var(--border-default)] bg-white p-6 overflow-hidden hover:shadow-card hover:-translate-y-1 hover:border-[var(--border-hover)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F88438]"
              >
                {/* Accent top bar */}
                <span className="absolute top-0 left-0 right-0 h-1" style={{ background: card.accent }} aria-hidden />

                <div className="flex items-center gap-2.5 mb-2 mt-1">
                  <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: card.accent }} aria-hidden />
                  <span className="font-display font-bold text-lg text-[var(--text-primary)]">{card.title}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">{card.description}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-[var(--text-muted)]">{card.pricing}</span>
                  <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
                    {c.learnMore}
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
