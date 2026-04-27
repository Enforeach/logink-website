'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { type Locale, t, localePath } from '@/lib/i18n'
import { LogoFull } from '@/components/ui/Logo'

const SERVICE_SLUGS = [
  { slug: 'seo-content-marketing', key: 'seo', color: '#7C3AED' },
  { slug: 'social-media-management', key: 'social', color: '#DB2777' },
  { slug: 'paid-advertising', key: 'ads', color: '#D97706' },
  { slug: 'creative-services', key: 'creative', color: '#F59E0B' },
  { slug: 'website-landing-page', key: 'website', color: '#A78BFA' },
]

interface NavbarProps { locale?: Locale }

export function Navbar({ locale = 'id' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-default)] shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <LogoFull size={30} theme="dark" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services dropdown */}
              <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
                <button
                  onMouseEnter={() => setServicesOpen(true)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1',
                    pathname?.startsWith('/services') || pathname?.startsWith('/en/services')
                      ? 'text-brand-violet'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {t(locale, 'nav.services')}
                  <svg className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-2xl backdrop-blur-xl p-2">
                    <Link
                      href={localePath('/services', locale)}
                      className="block px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors mb-1 font-medium"
                    >
                      {t(locale, 'nav.allServices')}
                    </Link>
                    <div className="border-t border-[var(--border-default)] pt-1">
                      {SERVICE_SLUGS.map((svc) => (
                        <Link
                          key={svc.slug}
                          href={localePath(`/services/${svc.slug}`, locale)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
                        >
                          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: svc.color }} />
                          {t(locale, `services.${svc.key}.name`)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {([
                { href: '/portfolio', key: 'portfolio' },
                { href: '/blog', key: 'blog' },
                { href: '/about', key: 'about' },
              ] as const).map((link) => (
                <Link
                  key={link.href}
                  href={localePath(link.href, locale)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    (pathname === link.href || pathname === `/en${link.href}`)
                      ? 'text-brand-violet'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {t(locale, `nav.${link.key}`)}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher locale={locale} />
              <Link href={localePath('/contact', locale)} className="hidden lg:block">
                <Button size="sm">{t(locale, 'nav.getQuote')}</Button>
              </Link>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
                aria-label="Toggle menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 pt-16 bg-[var(--bg-primary)]/95 backdrop-blur-xl lg:hidden">
          <nav className="max-w-7xl mx-auto px-4 pt-6 flex flex-col gap-2">
            <Link href={localePath('/services', locale)} className="px-4 py-3 rounded-xl text-[var(--text-primary)] font-medium hover:bg-[var(--bg-elevated)] transition-colors">
              {t(locale, 'nav.services')}
            </Link>
            {SERVICE_SLUGS.map((svc) => (
              <Link
                key={svc.slug}
                href={localePath(`/services/${svc.slug}`, locale)}
                className="px-8 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors flex items-center gap-3"
              >
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: svc.color }} />
                {t(locale, `services.${svc.key}.name`)}
              </Link>
            ))}
            {([
              { href: '/portfolio', key: 'portfolio' },
              { href: '/blog', key: 'blog' },
              { href: '/about', key: 'about' },
            ] as const).map((link) => (
              <Link
                key={link.href}
                href={localePath(link.href, locale)}
                className="px-4 py-3 rounded-xl text-[var(--text-primary)] font-medium hover:bg-[var(--bg-elevated)] transition-colors"
              >
                {t(locale, `nav.${link.key}`)}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <LanguageSwitcher locale={locale} />
              <Button href={localePath('/contact', locale)} fullWidth>{t(locale, 'nav.getQuote')}</Button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
