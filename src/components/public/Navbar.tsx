'use client'

import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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
        slug: 'seo-content-marketing', slugId: 'jasa-seo-profesional', key: 'seo', color: '#A855F7',
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
        slug: 'social-media-management', slugId: 'sosial-media-manajemen', key: 'social', color: '#D81C5C',
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
        slug: 'paid-advertising', slugId: 'paid-ads', key: 'ads', color: '#F88438',
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
        slug: 'website-landing-page', slugId: 'website-development', key: 'website', color: '#C084FC',
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
        slug: 'creative-services', slugId: 'kreatif', key: 'creative', color: '#F5A623',
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

const MAIN_LINKS = [
  { href: '/portfolio', key: 'portfolio' },
  { href: '/blog', key: 'blog' },
  { href: '/about', key: 'about' },
] as const

interface NavbarProps { locale?: Locale }

const BANNER_KEY = 'logink-banner-v1-dismissed'

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Stable no-op subscription for useSyncExternalStore (sessionStorage never changes externally)
const noopSubscribe = () => () => {}

export function Navbar({ locale = 'id' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [bannerDismissedNow, setBannerDismissedNow] = useState(false)
  // Hydration-safe read of the dismiss flag: hidden on the server, storage-driven on the client.
  const bannerStoredDismiss = useSyncExternalStore(
    noopSubscribe,
    () => !!sessionStorage.getItem(BANNER_KEY),
    () => true,
  )
  const bannerVisible = !bannerStoredDismiss && !bannerDismissedNow
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
    setBannerDismissedNow(true)
    sessionStorage.setItem(BANNER_KEY, '1')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on navigation — state adjustment during render instead of an effect
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMenuOpen(false)
    setServicesOpen(false)
  }

  const isServicesActive = pathname?.startsWith('/layanan') || pathname?.startsWith('/en/services')

  return (
    <>
      {/* header is relative so the mega menu can be absolute top-full */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-[var(--border-default)] shadow-[0_1px_16px_rgba(35,26,38,0.06)]'
            : 'bg-transparent'
        )}
      >
        {/* Announcement Bar — ink band */}
        {bannerVisible && (
          <div className="bg-[#231A26] relative flex items-center justify-center px-10 py-2">
            {/* Subtle gradient accents */}
            <div className="absolute left-0 top-0 h-full w-40 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(168,19,143,0.35), transparent)' }} />
            <div className="absolute right-0 top-0 h-full w-40 pointer-events-none"
              style={{ background: 'linear-gradient(to left, rgba(248,132,56,0.25), transparent)' }} />

            <Link
              href={localePath('/contact', locale)}
              className="relative flex items-center gap-2.5 group"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F88438]/20 text-[#F88438] text-[10px] flex-shrink-0">✦</span>
              <span className="text-[#FDF8F3]/70 text-xs">
                {locale === 'en'
                  ? 'Get a free digital marketing consultation for your business.'
                  : 'Dapatkan konsultasi digital marketing gratis untuk bisnis Anda.'}
              </span>
              <span className="text-[#FDF8F3] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {locale === 'en' ? 'Contact us' : 'Hubungi kami'}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <button
              onClick={dismissBanner}
              aria-label="Dismiss"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md text-[#FDF8F3]/40 hover:text-[#FDF8F3] hover:bg-white/10 transition-colors"
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
            <Link href={localePath('/', locale)} className="flex items-center flex-shrink-0" aria-label="Logink — home">
              <LogoFull size={30} theme="light" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* Services: mega menu trigger */}
              <div onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                <button
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  className={cn(
                    'group relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson rounded-lg',
                    isServicesActive
                      ? 'text-[var(--text-primary)]'
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
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-4 right-4 bottom-0.5 h-0.5 rounded-full gradient-bg origin-left transition-transform duration-300 ease-out',
                      isServicesActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </button>
              </div>

              {MAIN_LINKS.map((link) => {
                const active = pathname === link.href || pathname === `/en${link.href}`
                return (
                  <Link
                    key={link.href}
                    href={localePath(link.href, locale)}
                    className={cn(
                      'group relative px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson rounded-lg',
                      active
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    )}
                  >
                    {t(locale, `nav.${link.key}`)}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute left-4 right-4 bottom-0.5 h-0.5 rounded-full gradient-bg origin-left transition-transform duration-300 ease-out',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      )}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher locale={locale} />
              <Button
                href={localePath('/contact', locale)}
                size="sm"
                className="group hidden lg:inline-flex"
              >
                {t(locale, 'nav.getQuote')}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </Button>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-full border border-[var(--border-default)] bg-white text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
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
        <AnimatePresence>
          {servicesOpen && (
            <div
              className="absolute inset-x-0 top-full hidden lg:block px-4 sm:px-6 lg:px-8"
              onMouseEnter={openServices}
              onMouseLeave={scheduleClose}
            >
              <motion.nav
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: easeOut }}
                aria-label={locale === 'en' ? 'Services' : 'Layanan'}
                className="max-w-7xl mx-auto mt-3 rounded-2xl bg-white border border-[var(--border-default)] shadow-card overflow-hidden"
              >
                <div className="px-8 py-8">
                  <div className="grid grid-cols-4 gap-8">

                    {/* Service groups (3 columns) */}
                    {SERVICE_GROUPS.map((group) => (
                      <div key={group.categoryId}>
                        <h3 className="text-[10px] font-bold tracking-[0.18em] text-[var(--text-muted)] uppercase mb-4">
                          {locale === 'en' ? group.categoryEn : group.categoryId}
                        </h3>
                        <div className="space-y-1">
                          {group.items.map((svc) => (
                            <Link
                              key={svc.slug}
                              href={locale === 'id' ? `/layanan/${svc.slugId}` : `/en/services/${svc.slug}`}
                              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-[var(--bg-primary)] transition-colors"
                            >
                              <span
                                className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                style={{ backgroundColor: `${svc.color}1A`, color: svc.color }}
                              >
                                {svc.icon}
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-crimson transition-colors leading-tight flex items-center gap-1.5">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: svc.color }}
                                    aria-hidden
                                  />
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

                    {/* Featured card (4th column) — peach tint */}
                    <div className="rounded-2xl overflow-hidden bg-[var(--bg-tint-peach)] p-5 flex flex-col justify-between min-h-[200px] relative">
                      {/* Soft brand orbs */}
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none blur-2xl"
                        style={{ background: 'radial-gradient(circle, #D81C5C 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-20 pointer-events-none blur-2xl"
                        style={{ background: 'radial-gradient(circle, #F88438 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                      <div className="relative">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[var(--text-primary)] text-[10px] font-semibold tracking-wide uppercase mb-4 border border-[var(--border-default)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                          {locale === 'en' ? 'Free consultation' : 'Konsultasi gratis'}
                        </div>
                        <p className="font-display text-[var(--text-primary)] font-bold text-lg leading-snug tracking-[-0.02em]">
                          {locale === 'en'
                            ? "Let's build your brand's next chapter"
                            : 'Bangun babak berikutnya brand Anda'}
                        </p>
                        <p className="text-[var(--text-secondary)] text-xs mt-2 leading-relaxed">
                          {locale === 'en'
                            ? '360° digital marketing, from strategy to execution.'
                            : '360° digital marketing, dari strategi hingga eksekusi.'}
                        </p>
                      </div>

                      <Link
                        href={localePath('/contact', locale)}
                        className="group relative mt-5 inline-flex items-center gap-2 gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-cta hover:brightness-105 transition w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
                      >
                        {locale === 'en' ? 'Get started' : 'Mulai sekarang'}
                        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="mt-6 pt-5 border-t border-[var(--border-default)] flex items-center justify-between">
                    <Link
                      href={locale === 'id' ? '/layanan' : '/en/services'}
                      className="group flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-brand-crimson transition-colors"
                    >
                      {locale === 'en' ? 'View all services' : 'Lihat semua layanan'}
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <p className="text-xs text-[var(--text-muted)]">
                      {locale === 'en' ? 'Connected creativity. 360° digital marketing.' : 'Connected creativity. 360° digital marketing.'}
                    </p>
                  </div>
                </div>
              </motion.nav>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu — full-screen light drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed inset-0 z-30 pt-16 bg-[var(--bg-primary)] lg:hidden overflow-y-auto"
          >
            <nav aria-label={locale === 'en' ? 'Mobile navigation' : 'Navigasi mobile'} className="max-w-7xl mx-auto px-6 pt-8 flex flex-col pb-10">

              {/* Big display links */}
              {MAIN_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.05 + i * 0.08 }}
                >
                  <Link
                    href={localePath(link.href, locale)}
                    className="block py-3 font-display text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)] active:text-brand-crimson transition-colors"
                  >
                    {t(locale, `nav.${link.key}`)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.05 + MAIN_LINKS.length * 0.08 }}
                className="my-6 border-t border-[var(--border-default)]"
              />

              {/* Services */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.35 }}
                className="eyebrow mb-2"
              >
                {locale === 'en' ? 'Services' : 'Layanan'}
              </motion.p>
              {SERVICE_GROUPS.flatMap(g => g.items).map((svc, i) => (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.4 + i * 0.06 }}
                >
                  <Link
                    href={locale === 'id' ? `/layanan/${svc.slugId}` : `/en/services/${svc.slug}`}
                    className="flex items-center gap-3 py-2.5 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${svc.color}1A`, color: svc.color }}>
                      {svc.icon}
                    </span>
                    {t(locale, `services.${svc.key}.name`)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.72 }}
              >
                <Link
                  href={locale === 'id' ? '/layanan' : '/en/services'}
                  className="inline-flex items-center gap-2 py-2.5 text-sm font-semibold text-brand-crimson"
                >
                  {t(locale, 'nav.allServices')}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.8 }}
                className="pt-6 mt-4 border-t border-[var(--border-default)] flex flex-col gap-4"
              >
                <LanguageSwitcher locale={locale} />
                <Button href={localePath('/contact', locale)} fullWidth className="group">
                  {t(locale, 'nav.getQuote')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
