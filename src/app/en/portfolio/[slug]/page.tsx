import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { CaseStudyPage, generateCaseStudyMetadata } from '@/components/public/case-study/CaseStudyServerPage'

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const cases = await prisma.caseStudy.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, slugEn: true },
    })
    return cases.flatMap(c => [
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
