'use client'
import { useState } from 'react'

/** The one interactive share control (the others are plain links). */
export function CopyLink({ url, label, done }: { url: string; label: string; done: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button type="button" className="chip chip-choice" aria-live="polite"
      onClick={async () => { try { await navigator.clipboard.writeText(url); setOk(true); setTimeout(() => setOk(false), 2000) } catch {} }}>
      {ok ? done : label}
    </button>
  )
}
