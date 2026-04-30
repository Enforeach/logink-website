'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
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

  const idPath = locale === 'en' ? alternatePath : pathname
  const enPath = locale === 'id' ? alternatePath : pathname

  return (
    <div className="flex items-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-0.5">
      <Link
        href={idPath}
        hrefLang="id"
        title="Lihat dalam Bahasa Indonesia"
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150',
          locale === 'id'
            ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        )}
      >
        <span className="text-[11px] leading-none">🇮🇩</span>
        ID
      </Link>
      <Link
        href={enPath}
        hrefLang="en"
        title="View in English"
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150',
          locale === 'en'
            ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        )}
      >
        <span className="text-[11px] leading-none">🇬🇧</span>
        EN
      </Link>
    </div>
  )
}
