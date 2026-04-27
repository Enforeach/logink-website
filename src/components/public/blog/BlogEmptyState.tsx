import Link from 'next/link'
import { type Locale, t } from '@/lib/i18n'

export function BlogEmptyState({ locale }: { locale: Locale }) {
  const switchHref = locale === 'en' ? '/blog' : '/en/blog'

  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="mb-6 opacity-40">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-[var(--text-muted)]">
          <rect x="8" y="8" width="48" height="48" rx="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 24h24M20 32h16M20 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="48" cy="48" r="10" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2"/>
          <path d="M44 48h8M48 44v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
        {t(locale, 'blog.noArticles')}
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-sm">
        {t(locale, 'blog.noArticlesSubtext')}
      </p>
      <Link
        href={switchHref}
        className="inline-flex items-center gap-2 text-sm gradient-text font-medium hover:opacity-80 transition-opacity"
      >
        {t(locale, 'blog.switchLanguage')}
      </Link>
    </div>
  )
}
