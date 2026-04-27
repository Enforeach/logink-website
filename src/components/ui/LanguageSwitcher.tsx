'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
  alternateSlug?: string | null
}

export function LanguageSwitcher({ locale, alternateSlug }: Props) {
  const pathname = usePathname()

  function getAlternatePath(): string {
    if (locale === 'id') {
      if (alternateSlug) {
        return `/en${pathname.replace(/\/blog\/[^/]+/, `/blog/${alternateSlug}`)}`
      }
      return `/en${pathname === '/' ? '' : pathname}`
    } else {
      const withoutLocale = pathname.replace(/^\/en/, '') || '/'
      if (alternateSlug) {
        return withoutLocale.replace(/\/blog\/[^/]+/, `/blog/${alternateSlug}`)
      }
      return withoutLocale
    }
  }

  const alternatePath = getAlternatePath()
  const alternateLabel = locale === 'id' ? 'EN' : 'ID'

  return (
    <Link
      href={alternatePath}
      hrefLang={locale === 'id' ? 'en' : 'id'}
      title={locale === 'id' ? 'View in English' : 'Lihat dalam Bahasa Indonesia'}
      className="flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-[var(--border-default)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      {alternateLabel}
    </Link>
  )
}
