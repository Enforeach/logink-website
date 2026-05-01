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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 py-6 ${widget.cssClass || ''}`}
      {...(widget.dataAttributes || {})}
    >
      <motion.div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,247,237,0.1), transparent)' }}
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
      />
      <span className="text-xs text-[var(--text-muted)] whitespace-nowrap flex items-center gap-2">
        {widget.emoji && <span>{widget.emoji}</span>}
        {widget.heading && <span>{widget.heading}</span>}
        {widget.heading && widget.buttonText && <span> · </span>}
        <motion.a
          href={widget.buttonUrl}
          onClick={onTrackClick}
          whileHover={{ x: 1 }}
          className="font-semibold"
          style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {widget.buttonText || 'Learn more'} →
        </motion.a>
      </span>
      <motion.div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,247,237,0.1), transparent)' }}
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
      />
    </motion.div>
  )
}
