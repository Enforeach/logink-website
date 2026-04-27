'use client'
import { useState, useEffect } from 'react'

export function useCtaDismiss(widgetId: string, dismissDuration = 7) {
  const key = `cta_${widgetId}_dismissed`
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      const val = localStorage.getItem(key)
      if (val) {
        const expiry = parseInt(val, 10)
        if (Date.now() < expiry) setDismissed(true)
        else localStorage.removeItem(key)
      }
    } catch {}
  }, [key])

  const dismiss = () => {
    try {
      const expiry = Date.now() + dismissDuration * 24 * 60 * 60 * 1000
      localStorage.setItem(key, String(expiry))
    } catch {}
    setDismissed(true)
  }

  return { dismissed, dismiss }
}
