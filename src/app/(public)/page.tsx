import { Metadata } from 'next'
import { buildMetadata, organizationSchema, localBusinessSchema } from '@/lib/seo'
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
})

export const revalidate = 3600

async function getData() {
  try {
    const [services, featuredCaseStudy, testimonials] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: {
          pricingTiers: { orderBy: { sortOrder: 'asc' }, take: 1 },
        },
      }),
      prisma.caseStudy.findFirst({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        include: {
          metrics: { orderBy: { sortOrder: 'asc' }, take: 3 },
          service: { select: { name: true, color: true } },
        },
      }),
      prisma.testimonial.findMany({
        where: { isHighlighted: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
    ])
    return { services, featuredCaseStudy, testimonials }
  } catch {
    return { services: [], featuredCaseStudy: null, testimonials: [] }
  }
}

export default async function HomePage() {
  const { services, featuredCaseStudy, testimonials } = await getData()

  const orgSchema = organizationSchema()
  const bizSchema = localBusinessSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, bizSchema]) }}
      />

      <HeroSection locale="id" />
      <LogoMarquee />
      <ProblemSolutionSection locale="id" />
      <ServicesSection services={services as any} locale="id" />
      <HowWeWorkSection locale="id" />
      <StatsSection locale="id" />
      <CaseStudyTeaser caseStudy={featuredCaseStudy as any} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection locale="id" />
    </>
  )
}
