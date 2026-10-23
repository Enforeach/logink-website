import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCaseStudyBySlug, getRelatedCaseStudies, getAllActiveServicesBrief } from '@/payload/queries'
import { buildMetadata } from '@/lib/seo'
import { CaseStudyDetailPage } from './CaseStudyDetailPage'
import type { CaseStudyFull } from '@/types/case-study'

type Locale = 'id' | 'en'

// ponytail: dropped unstable_cache wrapper (Payload handles caching); try/catch keeps the null fallback
async function getCaseStudy(slug: string, locale: Locale) {
  try {
    return await getCaseStudyBySlug(slug, locale)
  } catch { return null }
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
    description: (description || `${cs.clientName}: ${cs.industry}`) as string,
    path,
  })
}

export async function CaseStudyPage({ slug, locale }: { slug: string; locale: Locale }) {
  const cs = await getCaseStudy(slug, locale)
  if (!cs) notFound()

  const [relatedCases, allServices] = await Promise.all([
    getRelatedCaseStudies({ id: cs.id, industry: cs.industry, serviceId: cs.service?.id ?? null, industryId: null }).catch(() => []),
    getAllActiveServicesBrief(),
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
