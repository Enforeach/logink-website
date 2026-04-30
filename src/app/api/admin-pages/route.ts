import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {
    const pages = await prisma.page.findMany({ orderBy: { updatedAt: 'desc' } })
    return NextResponse.json(pages)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {

    const { title, slug, metaTitle, metaDescription, status } = await req.json()

    const page = await prisma.page.create({
      data: { title, slug, metaTitle, metaDescription, status: status || 'DRAFT' },
    })
    return NextResponse.json(page, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
