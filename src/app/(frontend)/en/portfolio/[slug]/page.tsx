import type { Metadata } from 'next'
import { getSitemapEntries } from '@/payload/queries'
import { CaseStudyPage, generateCaseStudyMetadata } from '@/components/public/case-study/CaseStudyServerPage'

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const { caseStudies } = await getSitemapEntries()
    return caseStudies.flatMap(c => [
      ...(c.slugEn ? [{ slug: c.slugEn }] : []),
      { slug: c.slug },
    ])
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return generateCaseStudyMetadata(slug, 'en')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <CaseStudyPage slug={slug} locale="en" />
}
