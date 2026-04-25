import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'violet' | 'pink' | 'amber' | 'gold' | 'green' | 'red'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]',
    violet: 'bg-brand-violet/10 text-brand-violet border border-brand-violet/20',
    pink: 'bg-brand-pink/10 text-brand-pink border border-brand-pink/20',
    amber: 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20',
    gold: 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20',
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    red: 'bg-red-500/10 text-red-400 border border-red-500/20',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs font-medium',
    md: 'px-3 py-1 text-sm font-medium',
  }

  return (
    <span className={cn('inline-flex items-center rounded-full tracking-wide', variants[variant], sizes[size], className)}>
      {children}
    </span>
  )
}
