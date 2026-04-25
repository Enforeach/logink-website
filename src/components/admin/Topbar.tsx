'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

interface TopbarProps {
  unreadCount?: number
}

export function Topbar({ unreadCount = 0 }: TopbarProps) {
  const { data: session } = useSession()

  return (
    <header className="h-14 border-b border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-between px-4 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-brand-violet transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link href="/admin/submissions" className="relative h-9 w-9 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full gradient-bg text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* User menu */}
        <div className="flex items-center gap-2 pl-3 border-l border-[var(--border-default)]">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-[var(--text-primary)]">{session?.user?.name || 'Admin'}</div>
            <div className="text-[10px] text-[var(--text-muted)] capitalize">{session?.user?.role?.toLowerCase() || 'editor'}</div>
          </div>
          {session?.user?.image ? (
            <Image src={session.user.image} alt="Avatar" width={32} height={32} className="rounded-full border border-[var(--border-default)]" />
          ) : (
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
              {session?.user?.name?.[0] || 'A'}
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Sign out"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
