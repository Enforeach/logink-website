'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { WHATSAPP_URL } from '@/lib/constants'

interface CTASectionProps {
  title?: string
  subtitle?: string
  locale?: 'id' | 'en'
}

export function CTASection({
  title,
  subtitle,
  locale = 'id',
}: CTASectionProps) {
  const defaultTitle = locale === 'id' ? 'Ayo Kerja Sama' : "Let's Work Together"
  const defaultSubtitle = locale === 'id' ? 'Siap diskusikan bagaimana kami bisa bantu brand kamu berkembang.' : "Ready to take your brand to the next level?"
  title = title ?? defaultTitle
  subtitle = subtitle ?? defaultSubtitle
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[2rem] gradient-brand-bg px-6 py-16 sm:px-12 md:py-20">
        {/* Soft white orb */}
        <div
          aria-hidden
          className="orb"
          style={{ width: 300, height: 300, top: -90, right: -70, background: 'rgba(255,255,255,0.3)' }}
        />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.1] text-white mb-4">
            {title}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href={locale === 'id' ? '/contact' : '/en/contact'}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-brand-crimson font-semibold text-sm shadow-lg hover:scale-[1.02] transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {locale === 'id' ? 'Minta Penawaran Gratis' : 'Get a Free Quote'}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm shadow-lg hover:scale-[1.02] hover:brightness-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ background: '#25D366' }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {locale === 'id' ? 'Chat di WhatsApp' : 'Chat on WhatsApp'}
            </a>
          </div>

          {/* Trust microcopy (CRO friction cue) */}
          <p className="text-xs text-white/70 tracking-wide">
            {locale === 'id' ? 'Tanpa kontrak mengikat · Pelaporan GA4 transparan' : 'No lock-in contracts · Transparent GA4 reporting'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
