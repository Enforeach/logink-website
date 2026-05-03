import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAuth } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import type { BlockType, Prisma } from '@prisma/client'

function revalidateCaseStudy(slugs: { slug?: string | null; slugEn?: string | null }[]) {
  revalidatePath('/portfolio')
  revalidatePath('/en/portfolio')
  revalidatePath('/')
  revalidatePath('/en')
  for (const s of slugs) {
    if (s.slug) revalidatePath(`/portfolio/${s.slug}`)
    if (s.slugEn) revalidatePath(`/en/portfolio/${s.slugEn}`)
  }
}

const FULL_INCLUDE = {
  metrics: { orderBy: { sortOrder: 'asc' as const } },
  testimonial: true,
  service: { select: { id: true, name: true, slug: true, color: true, icon: true } },
  industryRel: { select: { nameId: true, nameEn: true, slug: true, accentColor: true } },
  blocks: { orderBy: { sortOrder: 'asc' as const } },
  caseStudyServices: {
    include: { service: { select: { id: true, name: true, slug: true, color: true, icon: true } } },
  },
  author: { select: { name: true, image: true } },
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const cs = await prisma.caseStudy.findUnique({ where: { id }, include: FULL_INCLUDE })
    if (!cs) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(cs)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {
    const { id } = await params
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

    const existing = await prisma.caseStudy.findUnique({ where: { id }, select: { status: true, slug: true, slugEn: true } })
    const isNowPublished = status === 'PUBLISHED' && existing?.status !== 'PUBLISHED'

    // Replace metrics
    await prisma.caseMetric.deleteMany({ where: { caseStudyId: id } })

    // Replace blocks
    if (blocks !== undefined) {
      await prisma.caseStudyBlock.deleteMany({ where: { caseStudyId: id } })
    }

    // Replace M2M services
    if (serviceIds !== undefined) {
      await prisma.caseStudyService.deleteMany({ where: { caseStudyId: id } })
    }

    const cs = await prisma.caseStudy.update({
      where: { id },
      data: {
        title: title || titleId || undefined,
        slug,
        clientName,
        clientLogo: clientLogo ?? null,
        industry: industry || undefined,
        challenge: challenge ?? undefined,
        strategy: strategy ?? undefined,
        results: results ?? undefined,
        thumbnail: thumbnail ?? null,
        titleId: titleId ?? null,
        titleEn: titleEn ?? null,
        subtitleId: subtitleId ?? null,
        subtitleEn: subtitleEn ?? null,
        summaryId: summaryId ?? null,
        summaryEn: summaryEn ?? null,
        slugEn: slugEn ?? null,
        seoTitleId: seoTitleId ?? null,
        seoTitleEn: seoTitleEn ?? null,
        seoDescId: seoDescId ?? null,
        seoDescEn: seoDescEn ?? null,
        ogImage: ogImage ?? null,
        featuredImage: featuredImage ?? null,
        durationLabel: durationLabel ?? null,
        clientWebsite: clientWebsite ?? null,
        featured: featured ?? undefined,
        industryId: industryId ?? null,
        serviceId: serviceId ?? null,
        status,
        publishedAt: isNowPublished ? new Date() : undefined,
        metrics: metrics?.length
          ? { create: metrics.map((m: { metricLabel: string; beforeValue: string; afterValue: string }, i: number) => ({ metricLabel: m.metricLabel, beforeValue: m.beforeValue, afterValue: m.afterValue, sortOrder: i })) }
          : undefined,
        blocks: blocks?.length
          ? { create: blocks.map((b: { blockType: string; data: unknown; isVisible?: boolean }, i: number) => ({ blockType: b.blockType as BlockType, data: b.data as Prisma.InputJsonValue, sortOrder: i, isVisible: b.isVisible ?? true })) }
          : undefined,
        caseStudyServices: serviceIds?.length
          ? { create: serviceIds.map((sid: string) => ({ serviceId: sid })) }
          : undefined,
      },
      include: FULL_INCLUDE,
    })

    revalidateCaseStudy([
      { slug: existing?.slug, slugEn: existing?.slugEn },
      { slug: cs.slug, slugEn: cs.slugEn },
    ])

    return NextResponse.json(cs)
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e?.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    console.error(err)
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {
    const { id } = await params
    const existing = await prisma.caseStudy.findUnique({ where: { id }, select: { slug: true, slugEn: true } })
    await prisma.caseStudy.delete({ where: { id } })
    if (existing) revalidateCaseStudy([{ slug: existing.slug, slugEn: existing.slugEn }])
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 })
  }
}
