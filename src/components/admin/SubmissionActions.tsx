'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export function SubmissionActions({ id, isRead }: { id: string; isRead: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    setLoading(true)
    try {
      await fetch(`/api/submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !isRead }),
      })
      router.refresh()
    } catch {} finally { setLoading(false) }
  }

  return (
    <div className="flex gap-3">
      <Button variant={isRead ? 'ghost' : 'primary'} onClick={toggle} loading={loading} size="sm">
        {isRead ? 'Mark as Unread' : 'Mark as Read'}
      </Button>
      <Button variant="ghost" href="/admin/submissions" size="sm">← Back to Submissions</Button>
    </div>
  )
}
