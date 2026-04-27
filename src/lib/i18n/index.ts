import { id } from './id'
import { en } from './en'

export type Locale = 'id' | 'en'
export const DEFAULT_LOCALE: Locale = 'id'
export const SUPPORTED_LOCALES: Locale[] = ['id', 'en']

const translations = { id, en } as const

export function t(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) {
      // Fallback to Indonesian
      value = translations['id']
      for (const fk of keys) value = value?.[fk]
      break
    }
  }
  return typeof value === 'string' ? value : key
}

export function localePath(path: string, locale: Locale): string {
  if (locale === 'id') return path
  return `/en${path === '/' ? '' : path}`
}
