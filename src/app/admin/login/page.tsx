'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await signIn('resend', { email, redirect: false, callbackUrl: '/admin' })
      if (res?.error) setError('Login failed. Please check your email.')
      else setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-extrabold text-lg">L</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Logink CMS</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Sign in to your account</p>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
          {sent ? (
            <div className="text-center py-4">
              <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-bold text-[var(--text-primary)] mb-2">Check your email</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                A magic link has been sent to <strong>{email}</strong>. Click the link to sign in.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="admin@logink.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                required
              />
              <Button type="submit" loading={loading} fullWidth>
                Send Magic Link
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
