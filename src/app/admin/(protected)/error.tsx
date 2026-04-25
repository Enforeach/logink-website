'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Admin Error]', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-6">
      <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
        <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">Something went wrong</h2>
        <p className="text-sm text-[var(--text-muted)] max-w-sm">
          {error.message || 'An unexpected error occurred.'}
          {error.digest && <span className="block mt-1 text-xs opacity-60">Error ID: {error.digest}</span>}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-xl text-sm font-medium gradient-bg text-white"
        >
          Try again
        </button>
        <Link
          href="/admin"
          className="px-4 py-2 rounded-xl text-sm font-medium border border-[var(--border-default)] text-[var(--text-secondary)]"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}
