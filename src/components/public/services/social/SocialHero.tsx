'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const HERO_COPY = {
  id: {
    badge: 'Jasa Social Media Marketing Jakarta — Konten Viral, Followers & Engagement Bertumbuh',
    trustPills: ['✓ Konten 100% original', '✓ Native Bahasa Indonesia', '✓ Kalender konten bulanan'],
    home: 'Beranda', services: 'Layanan', homeHref: '/', servicesHref: '/layanan',
    title1: 'Konten yang Mengena.', title2: 'Kehadiran yang Mengonversi.',
    desc: 'Kami urus semua urusan social media Anda: strategi, pembuatan konten, penjadwalan, community management, dan laporan performa di Instagram, TikTok, Facebook, dan LinkedIn.',
    descHighlight: 'Anda fokus ke bisnis. Kami pastikan brand Anda sulit dilewatkan di feed.',
    ctaPrimary: 'Mulai Konsultasi Gratis', ctaHref: '/contact?service=social-media-management', ctaSecondary: 'Lihat Harga',
    ctaWhatsApp: 'Chat di WhatsApp',
  },
  en: {
    badge: 'Social Media Management Jakarta — Viral Content, Growing Followers & Engagement',
    trustPills: ['✓ 100% original content', '✓ Bahasa Indonesia native', '✓ Monthly content calendar'],
    home: 'Home', services: 'Services', homeHref: '/en', servicesHref: '/en/services',
    title1: 'Content That Connects.', title2: 'Presence That Converts.',
    desc: 'We take social media completely off your plate: strategy, content creation, scheduling, community management, and performance reporting across Instagram, TikTok, Facebook, and LinkedIn.',
    descHighlight: 'You focus on your business. We make your brand impossible to scroll past.',
    ctaPrimary: 'Start Free Consultation', ctaHref: '/en/contact?service=social-media-management', ctaSecondary: 'See Pricing',
    ctaWhatsApp: 'Chat on WhatsApp',
  },
}

const POSTS = [
  {
    type: 'image' as const,
    bg: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
    label: 'Instagram',
    heart: '2.4K',
    comment: '186',
  },
  {
    type: 'video' as const,
    bg: '#010101',
    label: 'TikTok',
    views: '45.2K views',
  },
  {
    type: 'text' as const,
    bg: 'linear-gradient(135deg,#0a66c2 0%,#1e3a5f 100%)',
    label: 'LinkedIn',
    likes: '312',
  },
  {
    type: 'image' as const,
    bg: 'linear-gradient(135deg,#f77062,#fe5196)',
    label: 'Instagram',
    heart: '1.8K',
    comment: '94',
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function SocialHero({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = HERO_COPY[locale]
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-28 pb-16 mesh-gradient">
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden />
      {/* Floating accent orbs */}
      <div
        className="orb top-[12%] left-[8%] h-80 w-80"
        style={{ background: 'radial-gradient(circle, rgba(216,28,92,0.16) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="orb bottom-[10%] right-[6%] h-72 w-72"
        style={{ background: 'radial-gradient(circle, rgba(248,132,56,0.14) 0%, transparent 70%)', animationDelay: '-7s' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto w-full z-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
          <Link href={c.homeHref} className="hover:text-[var(--text-primary)] transition-colors">{c.home}</Link>
          <span>/</span>
          <Link href={c.servicesHref} className="hover:text-[var(--text-primary)] transition-colors">{c.services}</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">Social Media Management</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-crimson mb-6 border border-brand-crimson/20"
              style={{ background: 'rgba(216,28,92,0.08)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-crimson animate-pulse" aria-hidden />
              {c.badge}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-[1.08] tracking-tight mb-5"
            >
              {c.title1} <span className="gradient-text">{c.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
              className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg"
            >
              {c.desc}{' '}
              <span className="text-[var(--text-primary)] font-medium">
                {c.descHighlight}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <Link
                href={c.ctaHref}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
              >
                {c.ctaPrimary}
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="https://wa.me/6287782495916"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.ctaWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white hover:scale-[1.02] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                style={{ background: '#25D366' }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {c.ctaWhatsApp}
              </a>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold text-sm hover:bg-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
              >
                {c.ctaSecondary}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              {c.trustPills.map((pill) => (
                <span
                  key={pill}
                  className="text-xs text-[var(--text-secondary)] px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-white"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
              style={{ width: 260 }}
            >
              {/* Phone frame */}
              <div
                className="rounded-[36px] overflow-hidden bg-white"
                style={{
                  width: 260,
                  height: 480,
                  border: '6px solid #231A26',
                  boxShadow: '0 24px 64px -20px rgba(35,26,38,0.35), 0 8px 32px -8px rgba(216,28,92,0.18)',
                }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-3 pb-1">
                  <span className="text-[9px] font-semibold" style={{ color: 'rgba(35,26,38,0.5)' }}>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="h-1 w-3 rounded-sm" style={{ background: 'rgba(35,26,38,0.35)' }} />
                    <div className="h-1 w-1 rounded-sm" style={{ background: 'rgba(35,26,38,0.35)' }} />
                  </div>
                </div>

                {/* Scrolling feed */}
                <div className="overflow-hidden" style={{ height: 420 }}>
                  <motion.div
                    animate={{ y: [0, -320] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="flex flex-col gap-2.5 px-2 pt-1"
                  >
                    {[...POSTS, ...POSTS].map((post, i) => (
                      <div key={i}>
                        {post.type === 'image' && (
                          <div className="rounded-xl overflow-hidden" style={{ background: post.bg, height: 134 }}>
                            <div className="h-full flex flex-col justify-between p-3">
                              <div className="flex items-center gap-1.5">
                                <div className="h-5 w-5 rounded-full bg-white/30" />
                                <div className="h-1.5 w-16 rounded-full bg-white/30" />
                              </div>
                              <div className="flex gap-3 text-white text-xs font-semibold">
                                <span>❤ {post.heart}</span>
                                <span>💬 {post.comment}</span>
                              </div>
                            </div>
                          </div>
                        )}
                        {post.type === 'video' && (
                          <div
                            className="rounded-xl flex flex-col items-center justify-center gap-1.5"
                            style={{ background: post.bg, height: 134 }}
                          >
                            <div className="h-9 w-9 rounded-full border-2 border-white/40 flex items-center justify-center">
                              <svg className="h-3.5 w-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            <span className="text-white/70 text-[11px]">{post.views}</span>
                            <span className="text-white/40 text-[10px]">♫ Trending audio</span>
                          </div>
                        )}
                        {post.type === 'text' && (
                          <div className="rounded-xl p-3" style={{ background: post.bg, height: 134 }}>
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <div className="h-5 w-5 rounded-full bg-white/30" />
                              <div className="h-1.5 w-20 rounded-full bg-white/30" />
                            </div>
                            <div className="space-y-1.5 mb-2.5">
                              <div className="h-1.5 w-full rounded-full bg-white/20" />
                              <div className="h-1.5 w-4/5 rounded-full bg-white/20" />
                              <div className="h-1.5 w-3/5 rounded-full bg-white/20" />
                            </div>
                            <div className="text-white/70 text-[11px]">👍 {post.likes}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Floating platform pills */}
              {[
                { name: 'Instagram', color: '#E4405F', style: { top: -16, left: 8 }, delay: 0 },
                { name: 'TikTok', color: '#FE2C55', style: { top: -16, right: 12 }, delay: 0.7 },
                { name: 'Facebook', color: '#1877F2', style: { bottom: -16, left: 12 }, delay: 1.4 },
                { name: 'LinkedIn', color: '#0A66C2', style: { bottom: -16, right: 8 }, delay: 2.1 },
              ].map((p, i) => (
                <motion.span
                  key={p.name}
                  animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                  transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                  className="absolute px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                  style={{
                    background: p.color,
                    boxShadow: `0 6px 16px -6px ${p.color}80`,
                    ...p.style,
                  }}
                >
                  {p.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
