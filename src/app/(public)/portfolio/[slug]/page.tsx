import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/public/CTASection'
import { Badge } from '@/components/ui/Badge'

interface Props { params: Promise<{ slug: string }> }

async function getCaseStudy(slug: string) {
  try {
    return await prisma.caseStudy.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: {
        metrics: { orderBy: { sortOrder: 'asc' } },
        testimonial: true,
        service: true,
        author: { select: { name: true, image: true } },
      },
    })
  } catch { return null }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) return {}
  return buildMetadata({ title: cs.title, description: `${cs.clientName} — ${cs.industry}`, path: `/portfolio/${slug}` })
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) notFound()

  return (
    <>
      <section className="pt-32 pb-16 px-4 mesh-gradient">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-[var(--text-primary)] transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">{cs.title}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="default">{cs.industry}</Badge>
            {cs.service && <Badge variant="violet">{cs.service.name}</Badge>}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">{cs.title}</h1>
          <p className="text-lg text-[var(--text-secondary)]">Client: {cs.clientName}</p>
        </div>
      </section>

      {/* Metrics */}
      {cs.metrics.length > 0 && (
        <section className="py-16 px-4 bg-[var(--bg-surface)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Results Achieved</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {cs.metrics.map((m) => (
                <div key={m.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-6 text-center">
                  <div className="text-sm text-[var(--text-muted)] mb-2">{m.metricLabel}</div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl text-red-400 line-through">{m.beforeValue}</span>
                    <svg className="h-4 w-4 text-brand-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="text-2xl font-extrabold gradient-text">{m.afterValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge / Strategy / Results */}
      <section className="py-16 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            { title: 'Challenge', body: cs.challenge, color: '#DB2777' },
            { title: 'Strategy', body: cs.strategy, color: '#7C3AED' },
            { title: 'Results', body: cs.results, color: '#D97706' },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: section.color }}>{section.title}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="py-16 px-4 bg-[var(--bg-surface)]">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-xl font-medium text-[var(--text-primary)] leading-relaxed mb-8 italic">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </blockquote>
            <div className="font-semibold text-[var(--text-primary)]">{cs.testimonial.clientName}</div>
            <div className="text-sm text-[var(--text-secondary)]">{cs.testimonial.clientTitle} · {cs.testimonial.companyName}</div>
          </div>
        </section>
      )}

      <CTASection title="Want Results Like This?" subtitle="Contact us and start your brand's digital transformation." />
    </>
  )
}
