import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {

    const { id } = await params
    const media = await prisma.media.findUnique({ where: { id } })
    if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    try {
      await unlink(join(process.cwd(), 'public', media.url))
    } catch {}

    await prisma.media.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 })
  }
}
