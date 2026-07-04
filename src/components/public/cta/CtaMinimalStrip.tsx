'use client'
import { motion } from 'framer-motion'

interface Props {
  widget: {
    id: string
    heading?: string | null
    buttonText?: string | null
    buttonUrl: string
    emoji?: string | null
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
  }
  onTrackClick?: () => void
}

export function CtaMinimalStrip({ widget, onTrackClick }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-wrap items-center justify-between gap-4 py-5 my-8 border-y border-[var(--border-default)] bg-brand-cream ${widget.cssClass || ''}`}
      {...(widget.dataAttributes || {})}
    >
      <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
        {widget.emoji && <span>{widget.emoji}</span>}
        {widget.heading && <span className="font-medium text-[var(--text-primary)]">{widget.heading}</span>}
      </span>
      <motion.a
        href={widget.buttonUrl}
        onClick={onTrackClick}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
      >
        {widget.buttonText || 'Learn more'}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </motion.a>
    </motion.div>
  )
}
