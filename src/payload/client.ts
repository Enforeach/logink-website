import 'server-only'
import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@/payload.config'

/** Cached Payload Local API client for use in server components / route handlers. */
export const getPayloadClient = cache(async () => getPayload({ config }))
