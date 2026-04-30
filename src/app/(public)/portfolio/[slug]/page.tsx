import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { CaseStudyPage, generateCaseStudyMetadata } from '@/components/public/case-study/CaseStudyServerPage'

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const cases = await prisma.caseStudy.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true },
    })
    return cases.map(c => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return generateCaseStudyMetadata(slug, 'id')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <CaseStudyPage slug={slug} locale="id" />
}
