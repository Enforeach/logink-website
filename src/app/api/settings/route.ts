import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {
    const settings = await prisma.siteSetting.findMany()
    const map: Record<string, any> = {}
    for (const s of settings) map[s.key] = s.value
    return NextResponse.json(map)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const authResult = await requireAuth()
  if (!authResult.authorized) return authResult.response
  try {

    const body = await req.json() as Record<string, any>

    await Promise.all(
      Object.entries(body).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    )

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
