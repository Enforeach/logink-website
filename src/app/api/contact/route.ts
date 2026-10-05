import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayloadClient } from '@/payload/client'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  services: z.array(z.string()).optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10),
  source: z.string().optional().default('contact_form'),
})

// ponytail: in-memory per-instance Map; a Vercel WAF rate-limit rule is the upgrade
const LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] >= WINDOW_MS) hits.delete(k)
  return recent.length > LIMIT
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'local'
    if (limited(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    const body = await req.json()
    // Honeypot (BUILD §3.9): bots fill the hidden `website` field; answer as if saved, save nothing.
    if (body && typeof body === 'object' && typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true })
    }
    const data = schema.parse(body)
    const payload = await getPayloadClient()

    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        services: data.services || [],
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        message: data.message,
        source: data.source,
      } as never,
      overrideAccess: true,
    })

    return NextResponse.json({ success: true, id: submission.id })
  } catch (err) {
    if (err instanceof z.ZodError || err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Validation failed', details: err instanceof z.ZodError ? err.issues : [] }, { status: 400 })
    }
    console.error('Contact submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
