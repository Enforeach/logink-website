import type { Locale } from '@/lib/services'
import { T } from './strings'

export function Badge({ kind, locale: l }: { kind: 'populer' | 'contoh'; locale: Locale }) {
  return kind === 'populer' ? <span className="badge-populer">{T.populer[l]}</span> : <span className="chip">{T.contoh[l]}</span>
}
