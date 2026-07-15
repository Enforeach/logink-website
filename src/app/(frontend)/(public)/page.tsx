import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { buildMetadata, organizationSchema, localBusinessSchema } from '@/lib/seo'
import { getHomeData } from '@/payload/queries'
import { HeroSection } from '@/components/public/home/HeroSection'
import { LogoMarquee } from '@/components/public/home/LogoMarquee'

// Lazy-load below-fold Client Components — keeps framer-motion + recharts out
// of the initial JS bundle. HTML still SSR'd, hydration JS loads async.
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
  title: 'Logink | Agensi Digital Marketing 360° Jakarta',
  description: 'Agensi digital marketing 360° untuk brand Indonesia. Layanan SEO, Social Media, Paid Ads, Creative, dan Website terintegrasi dalam satu sistem yang terukur.',
  noSuffix: true,
})

export const revalidate = 3600

async function getData() {
  try {
    return await getHomeData('id')
  } catch {
    return { services: [], featuredCaseStudy: null }
  }
}

export default async function HomePage() {
  const { services, featuredCaseStudy } = await getData()

  const orgSchema = organizationSchema()
  const bizSchema = localBusinessSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, bizSchema]) }}
      />

      <HeroSection locale="id" />
      <LeadProfiler />
      <LogoMarquee locale="id" />
      <ProblemSolutionSection locale="id" />
      <ServicesSection services={services} locale="id" />
      <HowWeWorkSection locale="id" />
      <StatsSection locale="id" />
      <CaseStudyTeaser caseStudy={featuredCaseStudy} locale="id" />
      <CTASection locale="id" />
    </>
  )
}
