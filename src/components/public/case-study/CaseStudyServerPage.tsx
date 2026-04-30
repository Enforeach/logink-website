import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { buildMetadata } from '@/lib/seo'
import { CaseStudyDetailPage } from './CaseStudyDetailPage'
import type { CaseStudyFull } from '@/types/case-study'

type Locale = 'id' | 'en'

const getCaseStudy = unstable_cache(
  async (slug: string, locale: Locale) => {
  try {
    return await prisma.caseStudy.findFirst({
      where: {
        OR: locale === 'en' ? [{ slugEn: slug }, { slug }] : [{ slug }],
        status: 'PUBLISHED',
      },
      include: {
        metrics: { orderBy: { sortOrder: 'asc' } },
        testimonial: true,
        service: { select: { id: true, name: true, slug: true, color: true, icon: true } },
        industryRel: { select: { nameId: true, nameEn: true, slug: true, accentColor: true } },
        blocks: { orderBy: { sortOrder: 'asc' }, where: { isVisible: true } },
        caseStudyServices: {
          include: { service: { select: { id: true, name: true, slug: true, color: true, icon: true } } },
        },
      },
    })
  } catch { return null }
  },
  ['case-study'],
  { revalidate: 3600, tags: ['case-study'] }
)

async function getRelated(cs: NonNullable<Awaited<ReturnType<typeof getCaseStudy>>>, limit = 3) {
  try {
    return await prisma.caseStudy.findMany({
      where: {
        status: 'PUBLISHED',
        id: { not: cs.id },
        OR: [
          { industry: cs.industry },
          ...(cs.serviceId ? [{ serviceId: cs.serviceId }] : []),
          ...(cs.industryId ? [{ industryId: cs.industryId }] : []),
        ],
      },
      take: limit,
      select: {
        id: true, title: true, titleId: true, titleEn: true,
        slug: true, slugEn: true, industry: true, thumbnail: true, featuredImage: true,
        metrics: { orderBy: { sortOrder: 'asc' }, take: 1, select: { metricLabel: true, afterValue: true } },
      },
    })
  } catch { return [] }
}

export async function generateCaseStudyMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const cs = await getCaseStudy(slug, locale)
  if (!cs) return {}
  const title = locale === 'en'
    ? (cs.seoTitleEn || cs.titleEn || cs.titleId || cs.title)
    : (cs.seoTitleId || cs.titleId || cs.title)
  const description = locale === 'en'
    ? (cs.seoDescEn || cs.summaryEn || cs.summaryId)
    : (cs.seoDescId || cs.summaryId)
  const path = locale === 'en' ? `/en/portfolio/${slug}` : `/portfolio/${slug}`
  return buildMetadata({
    title: (title || cs.title) as string,
    description: (description || `${cs.clientName} — ${cs.industry}`) as string,
    path,
  })
}

export async function CaseStudyPage({ slug, locale }: { slug: string; locale: Locale }) {
  const cs = await getCaseStudy(slug, locale)
  if (!cs) notFound()

  const [relatedCases, allServices] = await Promise.all([
    getRelated(cs),
    prisma.service.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true, color: true, icon: true },
    }),
  ])

  return (
    <CaseStudyDetailPage
      caseStudy={cs as unknown as CaseStudyFull}
      locale={locale}
      relatedCases={relatedCases as Parameters<typeof CaseStudyDetailPage>[0]['relatedCases']}
      allServices={allServices}
    />
  )
}
