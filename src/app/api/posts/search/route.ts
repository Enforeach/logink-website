import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        titleId: { contains: q, mode: 'insensitive' },
      },
      select: { id: true, titleId: true, slug: true, category: { select: { nameId: true } }, publishedAt: true },
      take: 10,
      orderBy: { publishedAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json([])
  }
}
