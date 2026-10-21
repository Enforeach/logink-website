// One read-only object that exposes the keys of several live() objects (or plain ones) through getters, so a content
// export can be split across admin tabs while its callers keep `BLOG.lede[l]`. Getters read at use time, never at import.
import { defaultOf } from './store'

type U2I<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export function view<P extends object[]>(...parts: P): U2I<P[number]> {
  const o = {}
  for (const p of parts) {
    for (const k of Object.keys(defaultOf(p))) Object.defineProperty(o, k, { enumerable: true, get: () => (p as Record<string, unknown>)[k] })
  }
  return o as never
}

/** `{ id, en }` computed from the locale at use time: keeps `Record<Locale, X>` exports (STEPS, BUDGET…) working over live data. */
export const byLocale = <T,>(f: (l: 'id' | 'en') => T): Record<'id' | 'en', T> => ({ get id() { return f('id') }, get en() { return f('en') } })
