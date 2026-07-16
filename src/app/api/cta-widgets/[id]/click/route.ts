import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/payload/client'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findByID({ collection: 'cta-widgets', id, depth: 0 })
    await payload.update({
      collection: 'cta-widgets',
      id,
      data: { clickCount: ((doc as { clickCount?: number }).clickCount ?? 0) + 1 } as never,
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
