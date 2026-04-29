import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { metrics: true },
    })
    return NextResponse.json(caseStudies)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {

    const body = await req.json()
    const { title, slug, clientName, clientLogo, industry, challenge, strategy, results, thumbnail, status, metrics } = body

    const caseStudy = await prisma.caseStudy.create({
      data: {
        title,
        slug,
        clientName,
        clientLogo,
        industry,
        challenge,
        strategy,
        results,
        thumbnail,
        status: status || 'DRAFT',
        authorId: (await prisma.user.upsert({
          where: { email: 'system@logink.co' },
          update: {},
          create: { name: 'System', email: 'system@logink.co', role: 'ADMIN' },
          select: { id: true },
        })).id,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        metrics: metrics?.length
          ? { create: metrics.map((m: any, i: number) => ({ metricLabel: m.metricLabel, beforeValue: m.beforeValue, afterValue: m.afterValue, sortOrder: i })) }
          : undefined,
      },
      include: { metrics: true },
    })

    return NextResponse.json(caseStudy, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 })
  }
}
