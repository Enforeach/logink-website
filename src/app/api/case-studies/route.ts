import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

const FULL_INCLUDE = {
  metrics: { orderBy: { sortOrder: 'asc' as const } },
  testimonial: true,
  service: { select: { id: true, name: true, slug: true, color: true, icon: true } },
  industryRel: { select: { nameId: true, nameEn: true, slug: true, accentColor: true } },
  blocks: { orderBy: { sortOrder: 'asc' as const }, where: { isVisible: true } },
  caseStudyServices: {
    include: { service: { select: { id: true, name: true, slug: true, color: true, icon: true } } },
  },
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const industrySlug = searchParams.get('industry')
    const serviceSlug = searchParams.get('service')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const admin = searchParams.get('admin') === '1'

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (!admin && !status) where.status = 'PUBLISHED'
    if (industrySlug) where.industryRel = { slug: industrySlug }
    if (serviceSlug) {
      where.OR = [
        { service: { slug: serviceSlug } },
        { caseStudyServices: { some: { service: { slug: serviceSlug } } } },
      ]
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleId: { contains: search, mode: 'insensitive' } },
        { titleEn: { contains: search, mode: 'insensitive' } },
        { clientName: { contains: search, mode: 'insensitive' } },
      ]
    }

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { updatedAt: 'desc' }],
      take: limit,
      include: {
        metrics: { orderBy: { sortOrder: 'asc' }, take: 3 },
        service: { select: { id: true, name: true, slug: true, color: true } },
        industryRel: { select: { nameId: true, nameEn: true, slug: true, accentColor: true } },
        caseStudyServices: {
          include: { service: { select: { id: true, name: true, slug: true, color: true, icon: true } } },
        },
      },
    })

    return NextResponse.json(caseStudies)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {
    const body = await req.json()
    const {
      title, slug, clientName, clientLogo, industry,
      challenge, strategy, results, thumbnail,
      titleId, titleEn, subtitleId, subtitleEn, summaryId, summaryEn,
      slugEn, seoTitleId, seoTitleEn, seoDescId, seoDescEn,
      ogImage, featuredImage, durationLabel, clientWebsite, featured,
      industryId, serviceId, serviceIds,
      status, metrics, blocks,
    } = body

    const systemUser = await prisma.user.upsert({
      where: { email: 'system@logink.co' },
      update: {},
      create: { name: 'System', email: 'system@logink.co', role: 'ADMIN' },
      select: { id: true },
    })

    const caseStudy = await prisma.caseStudy.create({
      data: {
        title: title || titleId || '',
        slug,
        clientName,
        clientLogo: clientLogo || null,
        industry: industry || titleId || '',
        challenge: challenge || '',
        strategy: strategy || '',
        results: results || '',
        thumbnail: thumbnail || null,
        titleId: titleId || null,
        titleEn: titleEn || null,
        subtitleId: subtitleId || null,
        subtitleEn: subtitleEn || null,
        summaryId: summaryId || null,
        summaryEn: summaryEn || null,
        slugEn: slugEn || null,
        seoTitleId: seoTitleId || null,
        seoTitleEn: seoTitleEn || null,
        seoDescId: seoDescId || null,
        seoDescEn: seoDescEn || null,
        ogImage: ogImage || null,
        featuredImage: featuredImage || null,
        durationLabel: durationLabel || null,
        clientWebsite: clientWebsite || null,
        featured: featured ?? false,
        industryId: industryId || null,
        serviceId: serviceId || null,
        authorId: systemUser.id,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        metrics: metrics?.length
          ? { create: metrics.map((m: { metricLabel: string; beforeValue: string; afterValue: string }, i: number) => ({ metricLabel: m.metricLabel, beforeValue: m.beforeValue, afterValue: m.afterValue, sortOrder: i })) }
          : undefined,
        blocks: blocks?.length
          ? { create: blocks.map((b: { blockType: string; data: unknown; isVisible?: boolean }, i: number) => ({ blockType: b.blockType as import('@prisma/client').BlockType, data: b.data as import('@prisma/client').Prisma.InputJsonValue, sortOrder: i, isVisible: b.isVisible ?? true })) }
          : undefined,
        caseStudyServices: serviceIds?.length
          ? { create: serviceIds.map((sid: string) => ({ serviceId: sid })) }
          : undefined,
      },
      include: FULL_INCLUDE,
    })

    return NextResponse.json(caseStudy, { status: 201 })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e?.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    console.error(err)
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 })
  }
}
