import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const cs = await prisma.caseStudy.findUnique({ where: { id }, include: { metrics: { orderBy: { sortOrder: 'asc' } } } })
    if (!cs) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(cs)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const { title, slug, clientName, clientLogo, industry, challenge, strategy, results, thumbnail, status, metrics } = body

    await prisma.caseMetric.deleteMany({ where: { caseStudyId: id } })

    const existing = await prisma.caseStudy.findUnique({ where: { id }, select: { status: true } })
    const isNowPublished = status === 'PUBLISHED' && existing?.status !== 'PUBLISHED'

    const cs = await prisma.caseStudy.update({
      where: { id },
      data: {
        title, slug, clientName, clientLogo, industry, challenge, strategy, results, thumbnail,
        status,
        publishedAt: isNowPublished ? new Date() : undefined,
        metrics: metrics?.length
          ? { create: metrics.map((m: any, i: number) => ({ metricLabel: m.metricLabel, beforeValue: m.beforeValue, afterValue: m.afterValue, sortOrder: i })) }
          : undefined,
      },
      include: { metrics: true },
    })

    return NextResponse.json(cs)
  } catch (err: any) {
    if (err?.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await prisma.caseStudy.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 })
  }
}
