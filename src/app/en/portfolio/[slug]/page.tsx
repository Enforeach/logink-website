import type { Metadata } from 'next'
import { CaseStudyPage, generateCaseStudyMetadata } from '@/components/public/case-study/CaseStudyServerPage'

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return generateCaseStudyMetadata(slug, 'en')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <CaseStudyPage slug={slug} locale="en" />
}
