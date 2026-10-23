import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/public/CTASection'
import { Reveal } from '@/app/(frontend)/(public)/about/Reveal'
import { BarChart3, Orbit, Sparkles, Target, X, Check } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: 'Logink is a 360° digital marketing agency in Jakarta that combines strategy, creativity, and data into one integrated system built for Indonesian brands.',
  path: '/en/about',
})

const VALUES = [
  { title: 'Data-Driven', desc: 'Every decision is backed by data. We measure what matters: revenue, leads, and ROAS.', color: '#A855F7', tint: 'bg-brand-lilac', icon: BarChart3 },
  { title: '360° Coverage', desc: 'Five integrated services working as one system, not separate siloed agencies.', color: '#D81C5C', tint: 'bg-brand-rose', icon: Orbit },
  { title: 'Creative-First', desc: 'Scroll-stopping content designed specifically for your brand and your audience.', color: '#F5A623', tint: 'bg-brand-peach', icon: Sparkles },
  { title: 'Results-Focused', desc: "We don't stop until targets are hit. Transparent reporting, full account access.", color: '#F88438', tint: 'bg-white', icon: Target },
]

const DIFFERENTIATORS = [
  { title: 'No Siloed Teams', desc: '"We run all channels as one integrated system. Your SEO informs your ads. Your social feeds your content. Everything compounds."' },
  { title: 'No Vanity Metrics', desc: '"We optimize for revenue, leads, and ROAS, not impressions or follower counts."' },
  { title: 'No Generic Content', desc: '"Every piece of creative is built for your brand, your audience, and the Indonesian market."' },
  { title: 'No Black Boxes', desc: '"Transparent GA4 dashboards, Looker Studio reports, and full access to every account."' },
]

/* Derive the "pain" phrase from the claim title, data stays intact */
const pain = (title: string) => title.replace(/^No\s+/, '')

export default function AboutEnPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 mesh-gradient">
        <div aria-hidden className="orb" style={{ width: 320, height: 320, top: -110, right: -70, background: 'rgba(248,132,56,0.20)' }} />
        <div aria-hidden className="orb" style={{ width: 260, height: 260, bottom: -120, left: -60, background: 'rgba(168,85,247,0.14)', animationDelay: '-7s' }} />
        <Reveal className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="eyebrow block mb-4">360° Digital Marketing Agency</span>
          <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6">
            Connected{' '}
            <span className="gradient-text">Creativity</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            We connect strategy, creativity, and data into one seamless engine for your brand&apos;s digital growth.
          </p>
        </Reveal>
      </section>

      {/* Mission + Values */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] mb-6">Our Mission</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Logink was born from one conviction: brands shouldn&apos;t have to choose between strong strategy, creative content, and measurable results. You can have all three.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              We built Logink as a 360° digital marketing agency that runs all channels as one integrated system, not a collection of teams working in isolation.
            </p>
            <blockquote className="relative pl-6 italic text-[var(--text-primary)] font-medium">
              <span aria-hidden className="absolute left-0 top-0 h-full w-1 rounded-full gradient-brand-bg" />
              &ldquo;We connect strategy, creativity, and data into one seamless engine.&rdquo;
            </blockquote>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="h-full">
                <div className={`h-full rounded-2xl border border-[var(--border-default)] p-5 ${v.tint} transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)]`}>
                  <div
                    className="h-10 w-10 rounded-xl bg-white border border-[var(--border-default)] shadow-sm flex items-center justify-center mb-3"
                    style={{ color: v.color }}
                    aria-hidden="true"
                  >
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2">{v.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Not Other Agencies */}
      <section className="py-20 md:py-28 px-6 bg-brand-peach">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="eyebrow block mb-3">Why Logink</span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] mb-4">
              Why Not Other <span className="gradient-text">Agencies?</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">We know you have choices. Here&apos;s why clients choose Logink.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border-default)] bg-white p-6 pl-8 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)]">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 gradient-brand-bg" />
                  <h3 className="sr-only">{d.title}</h3>
                  <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)] line-through decoration-[var(--text-muted)] mb-3">
                    <X className="h-4 w-4 flex-shrink-0 text-brand-crimson" aria-hidden="true" />
                    {pain(d.title)}
                  </p>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full gradient-bg text-white" aria-hidden="true">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="font-semibold text-[var(--text-primary)] leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to Work Together?" subtitle="Let's discuss how we can help your brand grow." locale="en" />
    </>
  )
}
