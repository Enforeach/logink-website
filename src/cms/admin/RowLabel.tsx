'use client'
// Array rows in the admin show their own text ("03 · Growth") instead of "Row 03".
import { useRowLabel } from '@payloadcms/ui'

const KEYS = ['title', 'name', 'heading', 'label', 'q', 'text', 'value', 'caption', 'rowKey']

export function RowLabel() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const n = String((rowNumber ?? 0) + 1).padStart(2, '0')
  const cells = Array.isArray(data?.cells) ? (data.cells as { text?: string }[]).map((c) => c?.text).filter(Boolean).join(' | ') : ''
  const k = KEYS.find((x) => typeof data?.[x] === 'string' && data[x])
  const text = cells || (k ? String(data[k]) : '')
  return <span>{text ? `${n} · ${text.length > 80 ? `${text.slice(0, 80)}…` : text}` : `Item ${n}`}</span>
}
