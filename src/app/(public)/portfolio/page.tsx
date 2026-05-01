import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CaseStudyCard } from '@/components/public/CaseStudyCard'
import { CTASection } from '@/components/public/CTASection'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio & Case Studies',
  description: 'Lihat hasil nyata yang telah Logink capai untuk klien Indonesia. Pertumbuhan organic traffic, ROAS tinggi, dan brand awareness yang terukur dan terdokumentasi.',
  path: '/portfolio',
})

export const revalidate = 3600

export default async function PortfolioPage() {
  let caseStudies: any[] = []

  try {
    caseStudies = await prisma.caseStudy.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      include: {
        metrics: { orderBy: { sortOrder: 'asc' }, take: 1 },
        service: { select: { name: true, slug: true, color: true } },
      },
    })
  } catch {
    caseStudies = []
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 mesh-gradient text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">
          Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
          Real Results,{' '}
          <span className="gradient-text">Real Clients</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
          Every number here is a real result we achieved together with our clients.
        </p>
      </section>

      {/* Grid */}
      <section className="py-20 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((cs: any) => (
                <CaseStudyCard key={cs.id} caseStudy={cs} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      <CTASection title="Want Results Like These?" subtitle="Let's discuss how Logink can help your brand." />
    </>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="h-20 w-20 rounded-full gradient-bg opacity-20 mx-auto mb-6 flex items-center justify-center">
        <svg className="h-10 w-10 text-brand-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Portfolio being updated</h3>
      <p className="text-[var(--text-secondary)]">Our case studies will be published here soon.</p>
    </div>
  )
}
