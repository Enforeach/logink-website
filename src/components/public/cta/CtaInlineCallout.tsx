'use client'
import { motion } from 'framer-motion'

interface Props {
  widget: {
    id: string
    heading?: string | null
    subheading?: string | null
    buttonText?: string | null
    buttonUrl: string
    emoji?: string | null
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
  }
  onTrackClick?: () => void
}

export function CtaInlineCallout({ widget, onTrackClick }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden pl-6 my-8 rounded-xl py-5 pr-6 bg-brand-peach border border-[var(--border-default)] ${widget.cssClass || ''}`}
      {...(widget.dataAttributes || {})}
    >
      {/* Animated gradient left edge */}
      <motion.div
        className="absolute left-0 top-0 w-[3px] rounded-l-xl gradient-bg"
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-hidden="true"
      />

      <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
        {widget.emoji || '💡'} {widget.heading}
      </p>
      {widget.subheading && (
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3 pl-6">{widget.subheading}</p>
      )}
      <motion.a
        href={widget.buttonUrl}
        onClick={onTrackClick}
        whileHover={{ x: 2 }}
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-crimson hover:text-brand-orange transition-colors pl-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50 rounded-sm"
      >
        {widget.buttonText || 'Learn more'} →
      </motion.a>
    </motion.div>
  )
}
