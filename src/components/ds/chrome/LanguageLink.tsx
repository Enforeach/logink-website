import { page, type Locale } from '@/lib/services'
import { T } from '../strings'
import { cn } from '@/lib/utils'

/** The other locale's URL of this page (or its home when there is none). Crosses roots: a full load, never usePathname. */
export function LanguageLink({ locale: l, alt, className }: { locale: Locale; alt: { id: string | null; en: string | null }; className?: string }) {
  const o: Locale = l === 'id' ? 'en' : 'id'
  return (
    <a href={alt[o] ?? page('home').path[o]} hrefLang={o} lang={o} aria-label={T.langName[o]}
      className={cn('inline-flex min-h-tap min-w-tap items-center justify-center rounded font-exp text-[.8125rem] font-650 tracking-[.08em] [font-stretch:125%] hover:underline', className)}>
      {o.toUpperCase()}
    </a>
  )
}
