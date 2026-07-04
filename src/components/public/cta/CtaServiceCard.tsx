'use client'
import { motion } from 'framer-motion'
import { useCtaDismiss } from './useCtaDismiss'

interface Props {
  widget: {
    id: string
    heading?: string | null
    subheading?: string | null
    buttonText?: string | null
    buttonUrl: string
    emoji?: string | null
    dismissible: boolean
    dismissDuration: number
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
  }
  onTrackClick?: () => void
}

export function CtaServiceCard({ widget, onTrackClick }: Props) {
  const { dismissed, dismiss } = useCtaDismiss(widget.id, widget.dismissDuration)
  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`relative group rounded-2xl p-7 my-6 bg-white border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-card transition-shadow ${widget.cssClass || ''}`}
      {...(widget.dataAttributes || {})}
    >
      {widget.dismissible && (
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-3 right-3 h-6 w-6 rounded-full bg-brand-ink/5 flex items-center justify-center text-[var(--text-muted)] hover:bg-brand-ink/10 hover:text-[var(--text-primary)] transition-all text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
        >
          ✕
        </button>
      )}

      {/* Accent squircle icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
        className="h-12 w-12 rounded-2xl flex items-center justify-center text-xl mb-4 bg-brand-crimson/10 border border-brand-crimson/15"
      >
        {widget.emoji || '📈'}
      </motion.div>

      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] tracking-[-0.02em] mb-2">{widget.heading}</h3>
      {widget.subheading && <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{widget.subheading}</p>}

      <motion.a
        href={widget.buttonUrl}
        onClick={onTrackClick}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="group/btn flex items-center justify-center gap-2 w-full py-3 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
      >
        {widget.buttonText || 'Get Started'}
        <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
      </motion.a>
    </motion.div>
  )
}
