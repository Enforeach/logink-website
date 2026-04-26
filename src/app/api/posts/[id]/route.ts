import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { name: true } }, category: true },
    })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const { titleId, titleEn, slug, excerptId, excerptEn, bodyId, bodyEn, featuredImage, metaTitle, metaDescription, status, categoryId, readingTime } = body

    const existing = await prisma.post.findUnique({ where: { id }, select: { status: true } })
    const wasPublished = existing?.status === 'PUBLISHED'
    const isNowPublished = status === 'PUBLISHED'

    const post = await prisma.post.update({
      where: { id },
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
        status,
        categoryId: categoryId || null,
        readingTime,
        publishedAt: isNowPublished && !wasPublished ? new Date() : undefined,
      },
    })

    return NextResponse.json(post)
  } catch (err: any) {
    if (err?.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await prisma.post.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
