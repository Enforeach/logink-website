import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const widgets = await prisma.ctaWidget.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(widgets)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch CTA widgets' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const widget = await prisma.ctaWidget.create({ data: body })
    return NextResponse.json(widget, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to create widget' }, { status: 500 })
  }
}
