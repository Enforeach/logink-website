import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/public/CTASection'

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: 'Logink is a 360° digital marketing agency in Jakarta that combines strategy, creativity, and data into one integrated system built for Indonesian brands.',
  path: '/en/about',
})

const VALUES = [
  { title: 'Data-Driven', desc: 'Every decision is backed by data. We measure what matters: revenue, leads, and ROAS.', color: '#7C3AED' },
  { title: '360° Coverage', desc: 'Five integrated services working as one system, not separate siloed agencies.', color: '#DB2777' },
  { title: 'Creative-First', desc: 'Scroll-stopping content designed specifically for your brand and your audience.', color: '#D97706' },
  { title: 'Results-Focused', desc: "We don't stop until targets are hit. Transparent reporting, full account access.", color: '#F59E0B' },
]

const DIFFERENTIATORS = [
  { title: 'No Siloed Teams', desc: '"We run all channels as one integrated system. Your SEO informs your ads. Your social feeds your content. Everything compounds."' },
  { title: 'No Vanity Metrics', desc: '"We optimize for revenue, leads, and ROAS, not impressions or follower counts."' },
  { title: 'No Generic Content', desc: '"Every piece of creative is built for your brand, your audience, and the Indonesian market."' },
  { title: 'No Black Boxes', desc: '"Transparent GA4 dashboards, Looker Studio reports, and full access to every account."' },
]

export default function AboutEnPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 mesh-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">
            About Logink
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] mb-6">
            Connected{' '}
            <span className="gradient-text">Creativity</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            We connect strategy, creativity, and data into one seamless engine for your brand&apos;s digital growth.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Our Mission</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Logink was born from one conviction: brands shouldn&apos;t have to choose between strong strategy, creative content, and measurable results. You can have all three.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                We built Logink as a 360° digital marketing agency that runs all channels as one integrated system, not a collection of teams working in isolation.
              </p>
              <blockquote className="border-l-4 border-brand-violet pl-6 italic text-[var(--text-primary)] font-medium">
                &ldquo;We connect strategy, creativity, and data into one seamless engine.&rdquo;
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-5" style={{ borderTopColor: v.color, borderTopWidth: '3px' }}>
                  <h3 className="font-bold text-[var(--text-primary)] mb-2" style={{ color: v.color }}>{v.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Why Not Other <span className="gradient-text">Agencies?</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">We know you have choices. Here&apos;s why clients choose Logink.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {DIFFERENTIATORS.map((d, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)]">{d.title}</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to Work Together?" subtitle="Let's discuss how we can help your brand grow." locale="en" />
    </>
  )
}
