import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/public/home/HeroSection'
import { LogoMarquee } from '@/components/public/home/LogoMarquee'
import { ProblemSolutionSection } from '@/components/public/home/ProblemSolutionSection'
import { ServicesSection } from '@/components/public/home/ServicesSection'
import { HowWeWorkSection } from '@/components/public/home/HowWeWorkSection'
import { StatsSection } from '@/components/public/home/StatsSection'
import { CaseStudyTeaser } from '@/components/public/home/CaseStudyTeaser'
import { CTASection } from '@/components/public/home/CTASection'
import LeadProfiler from '@/components/public/LeadProfiler'

export const metadata: Metadata = buildMetadata({
  title: 'Logink | 360° Digital Marketing Agency Jakarta',
  description: 'Full-service digital marketing agency for Indonesian brands. SEO, Social Media, Paid Advertising, Creative, and Website — all integrated, all measurable.',
  path: '/en',
  noSuffix: true,
})

export const revalidate = 3600

export default async function EnHomePage() {
  let caseStudy: any = null
  try {
    caseStudy = await prisma.caseStudy.findFirst({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' }, include: { metrics: true, service: true } })
  } catch {}

  return (
    <>
      <HeroSection locale="en" />
      <LeadProfiler locale="en" />
      <LogoMarquee />
      <ProblemSolutionSection locale="en" />
      <ServicesSection locale="en" />
      <StatsSection locale="en" />
      <HowWeWorkSection locale="en" />
      <CaseStudyTeaser caseStudy={caseStudy} />
      <CTASection locale="en" />
    </>
  )
}
