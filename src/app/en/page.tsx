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
import { TestimonialsSection } from '@/components/public/home/TestimonialsSection'
import { CTASection } from '@/components/public/home/CTASection'

export const metadata: Metadata = buildMetadata({
  title: 'Logink - 360° Digital Marketing Agency Jakarta',
  description: '360° digital marketing agency built to help Indonesian brands dominate online. SEO, Social Media, Paid Ads, Creative, & Web services.',
  path: '/en',
})

export const revalidate = 3600

export default async function EnHomePage() {
  let caseStudy: any = null
  let testimonials: any[] = []
  try {
    caseStudy = await prisma.caseStudy.findFirst({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' }, include: { metrics: true, service: true } })
    testimonials = await prisma.testimonial.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
  } catch {}

  return (
    <>
      <HeroSection locale="en" />
      <LogoMarquee />
      <ProblemSolutionSection locale="en" />
      <ServicesSection locale="en" />
      <StatsSection locale="en" />
      <HowWeWorkSection locale="en" />
      <CaseStudyTeaser caseStudy={caseStudy} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection locale="en" />
    </>
  )
}
