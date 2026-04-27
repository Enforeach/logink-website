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
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      className={`relative pl-6 my-8 rounded-xl py-5 pr-6 ${widget.cssClass || ''}`}
      style={{ background: 'linear-gradient(to right, rgba(124,58,237,0.05), transparent)' }}
      {...(widget.dataAttributes || {})}
    >
      {/* Animated left border */}
      <motion.div
        className="absolute left-0 top-0 w-[3px] rounded-l-xl"
        style={{ background: 'linear-gradient(to bottom, #7C3AED, #DB2777)' }}
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
        className="inline-flex items-center gap-1 text-sm font-medium pl-6"
        style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {widget.buttonText || 'Learn more'} →
      </motion.a>
    </motion.div>
  )
}
