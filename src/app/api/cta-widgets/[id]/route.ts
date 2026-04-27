import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const widget = await prisma.ctaWidget.findUnique({ where: { id } })
    if (!widget) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(widget)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch widget' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    const widget = await prisma.ctaWidget.update({ where: { id }, data: body })
    return NextResponse.json(widget)
  } catch {
    return NextResponse.json({ error: 'Failed to update widget' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.ctaWidget.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete widget' }, { status: 500 })
  }
}
