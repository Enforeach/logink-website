'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

function PageSpeedRing({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0)
  const circumference = 2 * Math.PI * 20

  useEffect(() => {
    let start: number | null = null
    const duration = 1200
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setDisplayed(Math.round(progress * score))
      if (progress < 1) requestAnimationFrame(step)
    }
    const timeout = setTimeout(() => requestAnimationFrame(step), 900)
    return () => clearTimeout(timeout)
  }, [score])

  const strokeDashoffset = circumference - (displayed / 100) * circumference

  return (
    <div className="relative flex items-center justify-center h-14 w-14">
      <svg className="absolute inset-0 -rotate-90" width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(35,26,38,0.08)" strokeWidth="4" />
        <motion.circle
          cx="28" cy="28" r="20" fill="none"
          stroke="#10B981" strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.9 }}
        />
      </svg>
      <span className="text-xs font-bold text-[#059669]">{displayed}</span>
    </div>
  )
}

const HERO_COPY = {
  id: {
    badge: 'Jasa Website & Landing Page Jakarta — Cepat, Mobile-First, Konversi Tinggi',
    pills: ['Load time di bawah 2 detik', 'Responsif mobile-first', 'GA4 + pixel tracking termasuk'],
    home: 'Beranda',
    services: 'Layanan',
    homeHref: '/',
    servicesHref: '/layanan',
    title1: 'Ubah Pengunjung Menjadi Pelanggan.',
    title2: 'Dibangun untuk Berperforma.',
    desc: 'Kami mendesain dan membangun website serta landing page berperforma tinggi: cepat, mobile-first, dan dirancang untuk konversi. Dari landing page kampanye hingga toko e-commerce lengkap, setiap site dibangun untuk load di bawah 2 detik, ranking di Google, dan mengubah traffic menjadi revenue.',
    ctaPrimary: 'Mulai Konsultasi Gratis →',
    ctaHref: '/contact?service=website-landing-page',
    ctaWhatsApp: 'Chat di WhatsApp',
    waMessage: 'Halo Logink! Saya tertarik dengan layanan Website & Landing Page.',
    ctaSecondary: 'Lihat Harga',
  },
  en: {
    badge: 'Website & Landing Page Development Jakarta — Fast, Mobile-First, High Conversion',
    pills: ['Load time under 2 seconds', 'Mobile-first responsive', 'GA4 + pixel tracking included'],
    home: 'Home',
    services: 'Services',
    homeHref: '/en',
    servicesHref: '/en/services',
    title1: 'Turn Visitors Into Customers.',
    title2: 'Built to Perform.',
    desc: 'We design and build high-performance websites and landing pages: fast, mobile-first, and engineered for conversion. From campaign landing pages to full e-commerce stores, every site is built to load in under 2 seconds, rank on Google, and turn traffic into revenue.',
    ctaPrimary: 'Start Free Consultation →',
    ctaHref: '/en/contact?service=website-landing-page',
    ctaWhatsApp: 'Chat on WhatsApp',
    waMessage: 'Hi Logink! I am interested in your Website & Landing Page service.',
    ctaSecondary: 'See Pricing',
  },
}

const ACCENT = '#C084FC'

export function WebsiteHero({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = HERO_COPY[locale]
  const browserControls = useAnimation()
  const innerControls = useAnimation()

  useEffect(() => {
    browserControls.start({ opacity: 1, x: 0 }).then(() => {
      innerControls.start('visible')
    })
  }, [browserControls, innerControls])

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 8 },
    visible: (i: number) => ({ opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.12 + 0.4 } }),
  }

  const badges = [
    { label: 'Performance', score: 95 },
    { label: 'SEO', score: 100 },
    { label: 'Accessibility', score: 95 },
  ]

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-36 md:pt-32 pb-16 mesh-gradient">
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
      {/* Lilac service-accent orb */}
      <div
        className="orb top-16 right-[8%] h-96 w-96 opacity-70"
        style={{ background: `radial-gradient(circle, rgba(192,132,252,0.22) 0%, transparent 70%)` }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto w-full z-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
          <Link href={c.homeHref} className="hover:text-[var(--text-primary)] transition-colors">{c.home}</Link>
          <span>/</span>
          <Link href={c.servicesHref} className="hover:text-[var(--text-primary)] transition-colors">{c.services}</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">Website & Landing Page</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6 text-xs font-semibold"
              style={{ background: 'rgba(192,132,252,0.10)', color: '#9333EA', border: '1px solid rgba(192,132,252,0.35)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
              {c.badge}
            </h1>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-[1.08] tracking-[-0.03em] mb-5">
              {c.title1}{' '}
              <span className="gradient-text">{c.title2}</span>
            </h2>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              {c.desc}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {c.pills.map((pill) => (
                <span key={pill} className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-white">
                  <svg className="h-3.5 w-3.5 text-[#059669]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {pill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={c.ctaHref}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white gradient-bg shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200"
              >
                {c.ctaPrimary}
              </Link>
              <a
                href={`https://wa.me/628139453933?text=${encodeURIComponent(c.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.ctaWhatsApp}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white hover:scale-[1.02] transition-all duration-200"
                style={{ background: '#25D366' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {c.ctaWhatsApp}
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {c.ctaSecondary}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right: Browser mockup */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={browserControls}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: 0 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-2xl border border-[var(--border-default)] bg-white shadow-card overflow-hidden w-full max-w-sm"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-tint-lilac)]">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <div className="flex-1 mx-3 flex items-center gap-1.5 rounded-md bg-white px-2 py-1 border border-[var(--border-default)]">
                    <svg className="h-3 w-3 text-[#059669]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] text-[var(--text-muted)]">yourwebsite.com</span>
                  </div>
                </div>

                {/* Browser content */}
                <div className="p-4 space-y-3 relative">
                  {/* Hero section wireframe */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={innerControls}
                    variants={{ visible: { opacity: 1, transition: { delay: 0.2 } } }}
                    className="rounded-lg p-3 space-y-2"
                    style={{ background: 'linear-gradient(135deg, rgba(192,132,252,0.18), rgba(238,61,94,0.08))' }}
                  >
                    <div className="h-2 w-3/4 rounded bg-[rgba(35,26,38,0.16)]" />
                    <div className="h-1.5 w-1/2 rounded bg-[rgba(35,26,38,0.10)]" />
                    <div className="h-6 w-20 rounded-md mt-2" style={{ background: 'rgba(192,132,252,0.55)' }} />
                  </motion.div>

                  {/* Card grid wireframe */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={innerControls}
                    variants={{ visible: { opacity: 1, transition: { delay: 0.35 } } }}
                    className="grid grid-cols-3 gap-2"
                  >
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="rounded-md border border-[var(--border-default)] bg-[rgba(35,26,38,0.03)] p-2 space-y-1">
                        <div className="h-1.5 w-full rounded bg-[rgba(35,26,38,0.12)]" />
                        <div className="h-1 w-2/3 rounded bg-[rgba(35,26,38,0.08)]" />
                      </div>
                    ))}
                  </motion.div>

                  {/* Analytics overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={innerControls}
                    variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.5 } } }}
                    className="absolute bottom-4 right-4 rounded-xl border border-[var(--border-default)] bg-white/95 p-3 shadow-card backdrop-blur-sm flex items-center gap-3"
                  >
                    <PageSpeedRing score={95} />
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">PageSpeed</div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={innerControls}
                        variants={{ visible: { opacity: 1, transition: { delay: 1.4 } } }}
                        className="text-[9px] text-[var(--text-muted)]"
                      >
                        0.8s LCP · 0 CLS
                      </motion.div>
                      {/* Mini line chart */}
                      <svg width="56" height="16" viewBox="0 0 56 16">
                        <motion.polyline
                          points="0,14 10,10 20,11 30,6 40,7 56,2"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                        />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Performance badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  custom={i}
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-1.5 rounded-full border border-emerald-600/25 bg-emerald-50 px-3 py-1"
                >
                  <svg className="h-3 w-3 text-[#059669]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] font-semibold text-emerald-700">{badge.label} {badge.score}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
