'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCtaDismiss } from './useCtaDismiss'

interface Props {
  widget: {
    id: string
    heading?: string | null
    subheading?: string | null
    buttonText?: string | null
    buttonUrl: string
    emoji?: string | null
    displayTrigger?: string | null
    displayDelay?: number | null
    scrollDepthThreshold?: number | null
    dismissible: boolean
    dismissDuration: number
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
  }
  onTrackClick?: () => void
}

export function CtaFloatingNotification({ widget, onTrackClick }: Props) {
  const { dismissed, dismiss } = useCtaDismiss(widget.id, widget.dismissDuration)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const trigger = widget.displayTrigger || 'delay'

    if (trigger === 'delay') {
      const timer = setTimeout(() => setIsVisible(true), (widget.displayDelay ?? 5) * 1000)
      return () => clearTimeout(timer)
    }

    if (trigger === 'scroll_depth') {
      const handleScroll = () => {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
        if (scrollPercent > (widget.scrollDepthThreshold ?? 0.4)) setIsVisible(true)
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }

    if (trigger === 'exit_intent') {
      const handleMouseLeave = (e: MouseEvent) => { if (e.clientY < 10) setIsVisible(true) }
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [dismissed, widget.displayTrigger, widget.displayDelay, widget.scrollDepthThreshold])

  return (
    <AnimatePresence>
      {isVisible && !dismissed && (
        <motion.div
          className={`fixed bottom-24 right-6 z-50 max-w-[320px] ${widget.cssClass || ''}`}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          {...(widget.dataAttributes || {})}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white border border-[var(--border-default)] shadow-card p-5 pl-6">
            {/* Gradient accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 gradient-bg" aria-hidden="true" />

            {widget.dismissible && (
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="absolute top-4 right-4 h-6 w-6 rounded-full bg-brand-ink/5 flex items-center justify-center text-[var(--text-muted)] hover:bg-brand-ink/10 hover:text-[var(--text-primary)] transition-all text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
              >
                ✕
              </button>
            )}
            <div className="pr-8">
              <p className="font-display text-base font-bold text-[var(--text-primary)] tracking-[-0.02em] mb-1">
                {widget.emoji} {widget.heading}
              </p>
              {widget.subheading && <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{widget.subheading}</p>}
              <motion.a
                href={widget.buttonUrl}
                onClick={onTrackClick}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
              >
                {widget.buttonText || 'Learn more'}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
