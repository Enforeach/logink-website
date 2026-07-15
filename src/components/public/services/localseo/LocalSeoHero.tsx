'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LOCALSEO_ACCENT } from './data'

const COPY = {
  id: {
    badge: 'Jasa Local SEO & Google Maps — Muncul saat pelanggan mencari "terdekat"',
    home: 'Beranda',
    services: 'Layanan',
    homeHref: '/',
    servicesHref: '/layanan',
    crumb: 'Local SEO',
    title1: 'Jadi Pilihan Utama di',
    titleGradient: 'Google Maps',
    title3: 'Sekitar Anda.',
    desc: 'Saat orang di dekat Anda mencari "near me", kami pastikan bisnis Andalah yang mereka temukan lebih dulu. Optimasi Google Business Profile, map pack, dan review yang mengubah pencarian lokal menjadi telepon dan kunjungan.',
    descHighlight: 'Intent tertinggi. Jarak terdekat. Konversi tercepat.',
    metricChip: 'Radius hingga 20 km',
    ctaPrimary: 'Mulai Konsultasi Gratis',
    ctaHref: '/contact?service=local-seo',
    ctaWhatsApp: 'Chat di WhatsApp',
    waMessage: 'Halo Logink! Saya tertarik dengan layanan Local SEO & Google Maps.',
    ctaSecondary: 'Lihat Harga',
    trustPills: [
      '✓ Setup Google Business Profile',
      '✓ Landing page lokal termasuk',
      '✓ Ditagih tahunan, tanpa lock-in',
    ],
    searchQuery: 'kopi terdekat',
    nearMe: 'near me',
    youBadge: 'Anda',
    radiusTag: '20 km',
    mapPackLabel: 'Map pack · Top 3',
    results: [
      { name: 'Bisnis Anda', rating: '4.9', reviews: '218' },
      { name: 'Kompetitor A', rating: '4.4', reviews: '96' },
      { name: 'Kompetitor B', rating: '4.2', reviews: '61' },
    ],
  },
  en: {
    badge: 'Local SEO & Google Maps — Show up when customers search "near me"',
    home: 'Home',
    services: 'Services',
    homeHref: '/en',
    servicesHref: '/en/services',
    crumb: 'Local SEO',
    title1: 'Be the Top Pick on',
    titleGradient: 'Google Maps',
    title3: 'Near You.',
    desc: 'When nearby people search "near me", we make sure your business is the one they find first. Google Business Profile, map pack, and review optimization that turns local searches into calls and visits.',
    descHighlight: 'Highest intent. Shortest distance. Fastest conversion.',
    metricChip: 'Up to 20 km radius',
    ctaPrimary: 'Start Free Consultation',
    ctaHref: '/en/contact?service=local-seo',
    ctaWhatsApp: 'Chat on WhatsApp',
    waMessage: 'Hi Logink! I am interested in your Local SEO & Google Maps service.',
    ctaSecondary: 'See Pricing',
    trustPills: [
      '✓ Google Business Profile setup',
      '✓ Local landing page included',
      '✓ Billed annually, no lock-in',
    ],
    searchQuery: 'coffee near me',
    nearMe: 'near me',
    youBadge: 'You',
    radiusTag: '20 km',
    mapPackLabel: 'Map pack · Top 3',
    results: [
      { name: 'Your Business', rating: '4.9', reviews: '218' },
      { name: 'Competitor A', rating: '4.4', reviews: '96' },
      { name: 'Competitor B', rating: '4.2', reviews: '61' },
    ],
  },
}

function Stars({ rating }: { rating: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="#F59E0B" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 00-.363-1.118L2.075 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
      </svg>
      <span className="text-[11px] font-semibold text-[var(--text-secondary)] tabular-nums">{rating}</span>
    </span>
  )
}

export function LocalSeoHero({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = COPY[locale]
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-36 md:pt-32 pb-16 mesh-gradient">
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
      {/* Teal accent orb */}
      <div
        className="orb top-16 right-[8%] h-96 w-96 opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto w-full z-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
          <Link href={c.homeHref} className="hover:text-[var(--text-primary)] transition-colors">{c.home}</Link>
          <span>/</span>
          <Link href={c.servicesHref} className="hover:text-[var(--text-primary)] transition-colors">{c.services}</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">{c.crumb}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(13,148,136,0.10)', color: '#0F766E', border: '1px solid rgba(13,148,136,0.25)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: LOCALSEO_ACCENT }} />
              {c.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[var(--text-primary)] leading-[1.08] tracking-[-0.03em] mb-5"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              {c.title1}{' '}
              <span className="gradient-text">{c.titleGradient}</span>{' '}
              {c.title3}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed max-w-lg"
            >
              {c.desc}{' '}
              <span className="text-[var(--text-primary)] font-medium">{c.descHighlight}</span>
            </motion.p>

            {/* Key metric chip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border-default)] shadow-sm mb-8"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={LOCALSEO_ACCENT} strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.686-7-11a7 7 0 1114 0c0 5.314-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{c.metricChip}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <Link
                href={c.ctaHref}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200"
              >
                {c.ctaPrimary}
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={`https://wa.me/628139453933?text=${encodeURIComponent(c.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.ctaWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-sm hover:scale-[1.02] transition-all duration-200"
                style={{ background: '#25D366' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {c.ctaWhatsApp}
              </a>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {c.ctaSecondary}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {c.trustPills.map((pill) => (
                <span key={pill} className="text-xs text-[var(--text-secondary)] px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-white">
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Google-Maps-style card */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md mx-auto lg:max-w-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden shadow-card">
                {/* Search bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)]" style={{ background: 'rgba(13,148,136,0.06)' }}>
                  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth={2} aria-hidden>
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="text-sm text-[var(--text-secondary)] truncate">{c.searchQuery}</span>
                  <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#0F766E' }}>
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: LOCALSEO_ACCENT }} />
                    {c.nearMe}
                  </span>
                </div>

                {/* Map surface with radius + pin */}
                <div
                  className="relative h-44 overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(13,148,136,0.05), rgba(13,148,136,0.05)), repeating-linear-gradient(90deg, rgba(35,26,38,0.05) 0 1px, transparent 1px 46px), repeating-linear-gradient(0deg, rgba(35,26,38,0.05) 0 1px, transparent 1px 40px), #F4FAF8',
                  }}
                >
                  {/* faux roads */}
                  <div className="absolute inset-0" aria-hidden style={{ background: 'linear-gradient(115deg, transparent 46%, rgba(13,148,136,0.14) 47%, rgba(13,148,136,0.14) 50%, transparent 51%)' }} />
                  <div className="absolute inset-0" aria-hidden style={{ background: 'linear-gradient(200deg, transparent 62%, rgba(13,148,136,0.10) 63%, rgba(13,148,136,0.10) 65%, transparent 66%)' }} />

                  {/* Radius ring */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 150, height: 150, background: 'radial-gradient(circle, rgba(13,148,136,0.14) 0%, transparent 70%)', border: '1.5px solid rgba(13,148,136,0.35)' }} aria-hidden />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping" style={{ width: 150, height: 150, border: '1.5px solid rgba(13,148,136,0.30)', animationDuration: '2.5s' }} aria-hidden />

                  {/* Center pin */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <svg className="h-8 w-8 drop-shadow" viewBox="0 0 24 24" fill={LOCALSEO_ACCENT} aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" fill="#fff" />
                    </svg>
                  </div>

                  {/* Radius tag */}
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full text-white shadow" style={{ background: LOCALSEO_ACCENT }}>
                    {c.radiusTag}
                  </span>
                </div>

                {/* Map pack results */}
                <div className="p-3">
                  <div className="px-2 pb-2 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">{c.mapPackLabel}</div>
                  {c.results.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                      style={{
                        background: i === 0 ? 'rgba(13,148,136,0.08)' : 'transparent',
                        border: i === 0 ? '1px solid rgba(13,148,136,0.28)' : '1px solid transparent',
                      }}
                    >
                      <span
                        className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                        style={{ background: i === 0 ? LOCALSEO_ACCENT : 'rgba(35,26,38,0.25)' }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[var(--text-primary)] truncate">{r.name}</span>
                          {i === 0 && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white flex-shrink-0" style={{ background: LOCALSEO_ACCENT }}>{c.youBadge}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Stars rating={r.rating} />
                          <span className="text-[10px] text-[var(--text-muted)]">({r.reviews})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pulsing badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow"
                style={{ background: LOCALSEO_ACCENT }}
              >
                Top 3 ✓
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
