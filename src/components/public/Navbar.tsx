'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { cn } from '@/lib/utils'
import { type Locale, t, localePath } from '@/lib/i18n'
import { LogoFull } from '@/components/ui/Logo'

const SERVICE_GROUPS = [
  {
    categoryId: 'TINGKATKAN ORGANIK',
    categoryEn: 'GROW ORGANIC',
    items: [
      {
        slug: 'seo-content-marketing', key: 'seo', color: '#7C3AED',
        descId: 'Dominasi Google, raih traffic berkualitas',
        descEn: 'Dominate Google, earn quality traffic',
        icon: (
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="9" cy="9" r="5.5" /><path strokeLinecap="round" d="M14 14l3 3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.5v5M6.5 9h5" />
          </svg>
        ),
      },
      {
        slug: 'social-media-management', key: 'social', color: '#DB2777',
        descId: 'Bangun audiens & komunitas engaged',
        descEn: 'Build an engaged audience & community',
        icon: (
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8.5c0 3.5-3.1 6.3-7 6.3-.9 0-1.8-.2-2.6-.5L3 15.5l.7-3.7A6.1 6.1 0 013 8.5C3 5 6.1 2.2 10 2.2S17 5 17 8.5z" />
          </svg>
        ),
      },
    ],
  },
  {
    categoryId: 'TINGKATKAN PENJUALAN',
    categoryEn: 'DRIVE REVENUE',
    items: [
      {
        slug: 'paid-advertising', key: 'ads', color: '#D97706',
        descId: 'Iklan yang menghasilkan ROI nyata',
        descEn: 'Ads that deliver measurable ROI',
        icon: (
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l4-4 3 3 4-5 3 3" />
            <path strokeLinecap="round" d="M3 3h14M3 3v14" />
          </svg>
        ),
      },
      {
        slug: 'website-landing-page', key: 'website', color: '#A78BFA',
        descId: 'Website & landing page yang mengkonversi',
        descEn: 'Websites & landing pages that convert',
        icon: (
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
            <rect x="2.5" y="4" width="15" height="12" rx="2" />
            <path strokeLinecap="round" d="M2.5 7.5h15" />
            <circle cx="5.5" cy="5.75" r=".75" fill="currentColor" />
            <circle cx="8" cy="5.75" r=".75" fill="currentColor" />
          </svg>
        ),
      },
    ],
  },
  {
    categoryId: 'KREASI & KONTEN',
    categoryEn: 'CREATIVE & CONTENT',
    items: [
      {
        slug: 'creative-services', key: 'creative', color: '#F59E0B',
        descId: 'Visual & konten yang menggerakkan',
        descEn: 'Visuals & content that move people',
        icon: (
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 14.5l3.5-3.5 2.5 2.5 3-4 3.5 5H4z" />
            <circle cx="13.5" cy="6.5" r="1.5" />
            <rect x="2.5" y="2.5" width="15" height="15" rx="2.5" />
          </svg>
        ),
      },
    ],
  },
]

interface NavbarProps { locale?: Locale }

const BANNER_KEY = 'logink-banner-v1-dismissed'

export function Navbar({ locale = 'id' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 200)
  }

  const dismissBanner = () => {
    setBannerVisible(false)
    sessionStorage.setItem(BANNER_KEY, '1')
  }

  useEffect(() => {
    if (!sessionStorage.getItem(BANNER_KEY)) setBannerVisible(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const isServicesActive = pathname?.startsWith('/services') || pathname?.startsWith('/en/services')

  return (
    <>
      {/* header is relative so the mega menu can be absolute top-full */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-default)] shadow-lg'
            : 'bg-transparent'
        )}
      >
        {/* Announcement Bar */}
        {bannerVisible && (
          <div className="bg-[#0F0A1E] border-b border-white/10 relative flex items-center justify-center px-10 py-2">
            {/* Subtle gradient accents */}
            <div className="absolute left-0 top-0 h-full w-40 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(124,58,237,0.25), transparent)' }} />
            <div className="absolute right-0 top-0 h-full w-40 pointer-events-none"
              style={{ background: 'linear-gradient(to left, rgba(219,39,119,0.15), transparent)' }} />

            <Link
              href={localePath('/contact', locale)}
              className="relative flex items-center gap-2.5 group"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex-shrink-0">✦</span>
              <span className="text-white/70 text-xs">
                {locale === 'en'
                  ? 'Get a free digital marketing consultation for your business.'
                  : 'Dapatkan konsultasi digital marketing gratis untuk bisnis Anda.'}
              </span>
              <span className="text-white text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {locale === 'en' ? 'Contact us' : 'Hubungi kami'}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <button
              onClick={dismissBanner}
              aria-label="Dismiss"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-8">

            {/* Logo */}
            <Link href={localePath('/', locale)} className="flex items-center flex-shrink-0">
              <LogoFull size={30} theme="dark" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* Services — mega menu trigger */}
              <div onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                <button
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                    isServicesActive
                      ? 'text-brand-violet'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {t(locale, 'nav.services')}
                  <svg
                    className={cn('h-3.5 w-3.5 transition-transform duration-200', servicesOpen && 'rotate-180')}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
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

        {/* ── MEGA MENU ── */}
        {servicesOpen && (
          <div
            className="absolute left-0 right-0 top-full border-t border-[var(--border-default)] bg-[var(--bg-primary)]/95 backdrop-blur-xl shadow-2xl"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-4 gap-8">

                {/* Service groups (3 columns) */}
                {SERVICE_GROUPS.map((group) => (
                  <div key={group.categoryId}>
                    <p className="text-[10px] font-bold tracking-[0.12em] text-[var(--text-muted)] uppercase mb-4">
                      {locale === 'en' ? group.categoryEn : group.categoryId}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((svc) => (
                        <Link
                          key={svc.slug}
                          href={localePath(`/services/${svc.slug}`, locale)}
                          className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-[var(--bg-elevated)] transition-colors"
                        >
                          <span
                            className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            style={{ backgroundColor: `${svc.color}18`, color: svc.color }}
                          >
                            {svc.icon}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-violet transition-colors leading-tight">
                              {t(locale, `services.${svc.key}.name`)}
                            </p>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">
                              {locale === 'en' ? svc.descEn : svc.descId}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Featured card (4th column) */}
                <div className="rounded-2xl overflow-hidden bg-[#0F0A1E] p-5 flex flex-col justify-between min-h-[200px] relative">
                  {/* Gradient blob */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-40 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-30 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #DB2777 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 bg-white/10 text-white text-[10px] font-semibold tracking-wide uppercase mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {locale === 'en' ? 'Free consultation' : 'Konsultasi gratis'}
                    </div>
                    <p className="text-white font-bold text-lg leading-snug">
                      {locale === 'en'
                        ? "Let's build your brand's next chapter"
                        : 'Bangun babak berikutnya brand Anda'}
                    </p>
                    <p className="text-white/60 text-xs mt-2 leading-relaxed">
                      {locale === 'en'
                        ? '360° digital marketing, from strategy to execution.'
                        : '360° digital marketing, dari strategi hingga eksekusi.'}
                    </p>
                  </div>

                  <Link
                    href={localePath('/contact', locale)}
                    className="relative mt-5 inline-flex items-center gap-2 gradient-bg text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity w-fit"
                  >
                    {locale === 'en' ? 'Get started' : 'Mulai sekarang'}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Footer row */}
              <div className="mt-6 pt-5 border-t border-[var(--border-default)] flex items-center justify-between">
                <Link
                  href={localePath('/services', locale)}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-brand-violet transition-colors"
                >
                  {locale === 'en' ? 'View all services' : 'Lihat semua layanan'}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="text-xs text-[var(--text-muted)]">
                  {locale === 'en' ? 'Connected creativity. 360° digital marketing.' : 'Connected creativity. 360° digital marketing.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 pt-16 bg-[var(--bg-primary)]/95 backdrop-blur-xl lg:hidden overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 pt-6 flex flex-col gap-1 pb-8">
            <p className="px-4 text-[10px] font-bold tracking-[0.12em] text-[var(--text-muted)] uppercase mt-2 mb-1">
              {locale === 'en' ? 'Services' : 'Layanan'}
            </p>
            <Link href={localePath('/services', locale)} className="px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-elevated)] transition-colors">
              {t(locale, 'nav.allServices')} →
            </Link>
            {SERVICE_GROUPS.flatMap(g => g.items).map((svc) => (
              <Link
                key={svc.slug}
                href={localePath(`/services/${svc.slug}`, locale)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <span className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${svc.color}20`, color: svc.color }}>
                  {svc.icon}
                </span>
                {t(locale, `services.${svc.key}.name`)}
              </Link>
            ))}

            <div className="my-3 border-t border-[var(--border-default)]" />

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
