import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
}

export function Card({ className, hover = false, glow = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] transition-all duration-200',
        hover && 'hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-xl',
        glow && 'hover:shadow-brand-violet/20',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pt-6 pb-0', className)} {...props} />
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 py-6', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pt-0 pb-6', className)} {...props} />
}
