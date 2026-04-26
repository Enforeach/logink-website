import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const submission = await prisma.contactSubmission.findUnique({ where: { id } })
    if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(submission)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const { isRead } = await req.json()
    const submission = await prisma.contactSubmission.update({ where: { id }, data: { isRead } })
    return NextResponse.json(submission)
  } catch {
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
  }
}
