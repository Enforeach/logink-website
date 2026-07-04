import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'
import { type Locale, localePath } from '@/lib/i18n'

/** Mid-funnel CRO card for the blog right rail (F-pattern sidebar). */
export function BlogSidebarCta({ locale }: { locale: Locale }) {
  const en = locale === 'en'
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-brand p-6 text-white shadow-cta">
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/15 blur-2xl" aria-hidden />
      <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
        {en ? 'Need a strategy?' : 'Butuh strategi?'}
      </p>
      <p className="relative font-display text-xl font-bold leading-snug tracking-[-0.02em] mt-2">
        {en
          ? 'Talk to us — free growth consultation with the Logink team.'
          : 'Konsultasi growth gratis bareng tim Logink.'}
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label={en ? 'Chat with Logink on WhatsApp' : 'Chat dengan Logink via WhatsApp'}
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        {en ? 'Chat on WhatsApp' : 'Chat via WhatsApp'}
      </a>
      <Link
        href={localePath('/contact', locale)}
        className="group relative mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
      >
        {en ? 'Request a proposal' : 'Minta proposal'}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
      <p className="relative mt-4 text-[11px] text-white/70">
        {en ? 'No lock-in contracts · Transparent GA4 reporting' : 'Tanpa kontrak mengikat · Laporan GA4 transparan'}
      </p>
    </div>
  )
}
