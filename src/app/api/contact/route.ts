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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
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
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 })
    }
    console.error('Contact submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
