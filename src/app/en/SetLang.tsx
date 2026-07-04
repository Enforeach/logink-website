'use client'

import { useEffect } from 'react'

// Root layout owns <html lang="id">; nested segments can't change it server-side,
// so correct it after hydration (pre-hydration edits trip React's attribute diff).
export function SetLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return null
}
