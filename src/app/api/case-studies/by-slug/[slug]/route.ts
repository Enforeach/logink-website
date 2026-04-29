import { NextRequest, NextResponse } from 'next/server'
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
  author: { select: { name: true, image: true } },
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const cs = await prisma.caseStudy.findFirst({
      where: {
        OR: [{ slug }, { slugEn: slug }],
        status: 'PUBLISHED',
      },
      include: FULL_INCLUDE,
    })
    if (!cs) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(cs)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
