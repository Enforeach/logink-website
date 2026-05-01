import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { buildMetadata } from '@/lib/seo'
import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/public/home/HeroSection'
import { LogoMarquee } from '@/components/public/home/LogoMarquee'

const LeadProfiler = dynamic(() => import('@/components/public/LeadProfiler'))
const ProblemSolutionSection = dynamic(() =>
  import('@/components/public/home/ProblemSolutionSection').then(m => ({ default: m.ProblemSolutionSection }))
)
const ServicesSection = dynamic(() =>
  import('@/components/public/home/ServicesSection').then(m => ({ default: m.ServicesSection }))
)
const HowWeWorkSection = dynamic(() =>
  import('@/components/public/home/HowWeWorkSection').then(m => ({ default: m.HowWeWorkSection }))
)
const StatsSection = dynamic(() =>
  import('@/components/public/home/StatsSection').then(m => ({ default: m.StatsSection }))
)
const CaseStudyTeaser = dynamic(() =>
  import('@/components/public/home/CaseStudyTeaser').then(m => ({ default: m.CaseStudyTeaser }))
)
const CTASection = dynamic(() =>
  import('@/components/public/home/CTASection').then(m => ({ default: m.CTASection }))
)

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
