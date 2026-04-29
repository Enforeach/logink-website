import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const body = await req.json()
    const {
      titleId, titleEn, slug, slugEn, excerptId, excerptEn, bodyId, bodyEn,
      featuredImage, featuredImageAlt, metaTitle, metaDescription, metaTitleEn, metaDescriptionEn, ogImage,
      focusKeyword, status, categoryId, readingTime, wordCount, tagIds,
    } = body

    const authorId = (await prisma.user.upsert({
      where: { email: 'system@logink.co' },
      update: {},
      create: { name: 'System', email: 'system@logink.co', role: 'ADMIN' },
      select: { id: true },
    })).id

    const post = await prisma.post.create({
      data: {
        titleId,
        titleEn,
        slug,
        slugEn,
        excerptId,
        excerptEn,
        bodyId: bodyId || '',
        bodyEn,
        featuredImage,
        featuredImageAlt,
        metaTitle,
        metaDescription,
        metaTitleEn,
        metaDescriptionEn,
        ogImage,
        focusKeyword,
        status: status || 'DRAFT',
        authorId,
        categoryId: categoryId || null,
        readingTime,
        wordCount,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        tags: tagIds?.length ? {
          create: tagIds.map((tagId: string) => ({ tagId })),
        } : undefined,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    console.error(err)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
