import Link from 'next/link'
import { ArrowRight, TrendingUp, FileText, Layers, ChevronDown } from 'lucide-react'

const COPY = {
  id: {
    badge: '360° Digital Marketing Agency · Jakarta, Indonesia',
    headline: 'Kembangkan Brand Anda',
    headlineGradient: 'Secara Digital',
    subtext: 'Agensi digital marketing 360° yang dirancang untuk membantu brand Indonesia tumbuh dan memimpin di ranah digital. Strategi, kreativitas, dan data bekerja sebagai satu sistem yang terintegrasi.',
    ctaPrimary: 'Minta Penawaran Gratis',
    ctaSecondary: 'Lihat Portofolio',
    trust: 'Tanpa kontrak lock-in · Laporan GA4 transparan',
    stats: [
      { value: '2–4x', label: 'Rata-rata ROAS', glow: '#F88438' },
      { value: '150+', label: 'Artikel per Bulan', glow: '#A855F7' },
      { value: '5', label: 'Layanan Terintegrasi', glow: '#D81C5C' },
    ],
    scroll: 'Scroll',
  },
  en: {
    badge: '360° Digital Marketing Agency · Jakarta, Indonesia',
    headline: 'Grow Your Brand',
    headlineGradient: 'Digitally',
    subtext: '360° digital marketing agency built to help brands dominate online. Strategy, creativity, and data: all in one integrated engine.',
    ctaPrimary: 'Get a Free Quote',
    ctaSecondary: 'See Our Work',
    trust: 'No lock-in contracts · Transparent GA4 reporting',
    stats: [
      { value: '2–4x', label: 'Average ROAS', glow: '#F88438' },
      { value: '150+', label: 'Articles / Month', glow: '#A855F7' },
      { value: '5', label: 'Integrated Services', glow: '#D81C5C' },
    ],
    scroll: 'Scroll',
  },
}

const STAT_ICONS = [TrendingUp, FileText, Layers]
const STAT_OFFSETS = ['sm:-translate-y-2', 'sm:translate-y-3', 'sm:-translate-y-1']

export function HeroSection({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = COPY[locale]

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-36 md:pt-20 mesh-gradient">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      {/* Drifting brand orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="orb top-[8%] left-[12%] h-[480px] w-[480px]"
          style={{ background: 'rgba(216,28,92,0.15)' }}
        />
        <div
          className="orb top-[30%] right-[8%] h-[380px] w-[380px]"
          style={{ background: 'rgba(248,132,56,0.18)', animationDelay: '-5s' }}
        />
        <div
          className="orb bottom-[10%] left-[35%] h-[320px] w-[320px]"
          style={{ background: 'rgba(168,85,247,0.12)', animationDelay: '-9s' }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10 w-full flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="mb-8" style={{ animation: 'fade-down 0.5s ease-out both' }}>
          <span className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-crimson/20 bg-brand-crimson/10 text-sm font-medium text-brand-crimson shimmer-badge">
            <span className="h-2 w-2 rounded-full bg-brand-crimson animate-pulse" />
            {c.badge}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold text-[var(--text-primary)] mb-6 leading-[1.05] tracking-[-0.03em]"
          style={{ animation: 'fade-up 0.5s ease-out both', animationDelay: '150ms' }}
        >
          {c.headline}{' '}
          <span className="gradient-text">{c.headlineGradient}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animation: 'fade-up 0.5s ease-out both', animationDelay: '300ms' }}
        >
          {c.subtext}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: 'fade-up 0.5s ease-out both', animationDelay: '450ms' }}
        >
          <Link
            href={locale === 'id' ? '/contact' : '/en/contact'}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50 focus-visible:ring-offset-2"
          >
            {c.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href={locale === 'id' ? '/portfolio' : '/en/portfolio'}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold text-sm hover:bg-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50 focus-visible:ring-offset-2"
          >
            {c.ctaSecondary}
          </Link>
        </div>

        {/* Trust microcopy */}
        <p
          className="mt-4 mb-16 text-sm text-[var(--text-muted)]"
          style={{ animation: 'fade-up 0.5s ease-out both', animationDelay: '550ms' }}
        >
          {c.trust}
        </p>

        {/* Stat cards */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          style={{ animation: 'fade-up 0.5s ease-out both', animationDelay: '700ms' }}
        >
          {c.stats.map((s, i) => {
            const Icon = STAT_ICONS[i]
            return (
              <div
                key={s.label}
                className={`flex items-center gap-3.5 rounded-2xl bg-white border border-[var(--border-default)] shadow-card px-5 py-4 text-left transition-transform duration-300 hover:-translate-y-1 ${STAT_OFFSETS[i]}`}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${s.glow}1A`, color: s.glow }}
                >
                  <Icon size={18} />
                </span>
                <div>
                  <div className="font-display text-2xl font-bold leading-none text-[var(--text-primary)]">{s.value}</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-1 uppercase tracking-widest">{s.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">{c.scroll}</span>
        <div style={{ animation: 'bounce-arrow 1.8s ease-in-out infinite' }}>
          <ChevronDown className="h-5 w-5 text-[var(--text-muted)]" />
        </div>
      </div>
    </section>
  )
}
