'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  id: string
  apiPath: string
  label?: string
  confirmMessage?: string
}

export function DeleteButton({ id, apiPath, label = 'Delete', confirmMessage }: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    const msg = confirmMessage ?? 'Are you sure you want to delete this item? This action cannot be undone.'
    if (!window.confirm(msg)) return
    setLoading(true)
    try {
      const res = await fetch(`${apiPath}/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error ?? 'Delete failed.')
        return
      }
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {loading ? '...' : label}
    </button>
  )
}
