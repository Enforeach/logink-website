'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SITE, WHATSAPP_URL } from '@/lib/constants'

const COPY = {
  id: {
    headline: 'Ayo Berkembang',
    headlineGradient: 'Bersama',
    subtext: 'Siap bawa brand kamu ke level berikutnya? Yuk bangun sesuatu yang luar biasa bersama Logink.',
    ctaPrimary: 'Minta Penawaran Gratis',
    ctaWhatsapp: 'Chat di WhatsApp',
  },
  en: {
    headline: "Let's Grow",
    headlineGradient: 'Together',
    subtext: "Ready to take your brand to the next level? Let's build something remarkable.",
    ctaPrimary: 'Get a Free Quote',
    ctaWhatsapp: 'Chat on WhatsApp',
  },
}

export function CTASection({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const c = COPY[locale]

  return (
    <section className="relative overflow-hidden py-28 px-4">
      {/* Animated gradient mesh bg */}
      <div className="absolute inset-0 animated-mesh opacity-80" />

      {/* Radial overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.2) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 50%, rgba(219,39,119,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 50% 100%, rgba(217,119,6,0.1) 0%, transparent 50%)
        `
      }} />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Logo icon */}
        <div className="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-violet/30">
          <span className="text-white font-extrabold text-lg">L</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
          {c.headline}{' '}
          <span className="gradient-text">{c.headlineGradient}</span>
        </h2>

        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-12 leading-relaxed">
          {c.subtext}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href={locale === 'id' ? '/contact' : '/en/contact'}
            className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-sm hover:scale-[1.03] hover:shadow-xl hover:shadow-brand-violet/30 transition-all duration-200 w-full sm:w-auto"
          >
            {c.ctaPrimary}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-sm hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-200 w-full sm:w-auto"
            style={{ background: '#25D366' }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {c.ctaWhatsapp}
          </a>
        </div>

        {/* Contact details */}
        <p className="text-xs text-[var(--text-muted)] tracking-wide">
          {SITE.email} · {SITE.address}
        </p>
      </motion.div>
    </section>
  )
}
