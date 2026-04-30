import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(categories)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {
    const { nameId, nameEn, slug, sortOrder } = await req.json()
    const category = await prisma.category.create({ data: { nameId, nameEn, slug, sortOrder: sortOrder ?? 0 } })
    return NextResponse.json(category, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
