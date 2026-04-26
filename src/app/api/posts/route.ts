import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        author: { select: { name: true } },
        category: { select: { nameId: true } },
      },
    })
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { titleId, titleEn, slug, excerptId, excerptEn, bodyId, bodyEn, featuredImage, metaTitle, metaDescription, status, categoryId, readingTime } = body

    const post = await prisma.post.create({
      data: {
        titleId,
        titleEn,
        slug,
        excerptId,
        excerptEn,
        bodyId: bodyId || '',
        bodyEn,
        featuredImage,
        metaTitle,
        metaDescription,
        status: status || 'DRAFT',
        authorId: session.user.id,
        categoryId: categoryId || null,
        readingTime,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
