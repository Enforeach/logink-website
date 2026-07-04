'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCtaDismiss } from './useCtaDismiss'

interface Props {
  widget: {
    id: string
    heading?: string | null
    subheading?: string | null
    buttonText?: string | null
    buttonUrl: string
    secondaryButtonText?: string | null
    secondaryButtonUrl?: string | null
    backgroundImage?: string | null
    imagePosition?: string | null
    emoji?: string | null
    dismissible: boolean
    dismissDuration: number
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
  }
  onTrackClick?: () => void
}

export function CtaSplitVisual({ widget, onTrackClick }: Props) {
  const { dismissed, dismiss } = useCtaDismiss(widget.id, widget.dismissDuration)
  if (dismissed) return null

  const isRight = widget.imagePosition === 'right'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className={`grid grid-cols-1 md:grid-cols-[200px_1fr] rounded-2xl overflow-hidden my-8 bg-white border border-[var(--border-default)] shadow-card ${isRight ? 'md:grid-cols-[1fr_200px]' : ''} ${widget.cssClass || ''}`}
      {...(widget.dataAttributes || {})}
    >
      {/* Image */}
      <div className={`relative overflow-hidden md:m-3 md:rounded-xl ${isRight ? 'order-2 md:order-2' : ''}`}>
        {widget.backgroundImage ? (
          <motion.div className="h-full min-h-[150px] relative" whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
            <Image src={widget.backgroundImage} alt={widget.heading || ''} fill className="object-cover" />
          </motion.div>
        ) : (
          <div className="h-full min-h-[150px] gradient-brand-bg" />
        )}
      </div>

      {/* Text */}
      <div className={`p-7 ${isRight ? 'order-1 md:order-1' : ''} relative`}>
        {widget.dismissible && (
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-3 right-3 h-6 w-6 rounded-full bg-brand-ink/5 flex items-center justify-center text-[var(--text-muted)] hover:bg-brand-ink/10 hover:text-[var(--text-primary)] transition-all text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
          >
            ✕
          </button>
        )}
        <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="font-display text-xl font-bold text-[var(--text-primary)] tracking-[-0.02em] mb-2"
        >
          {widget.emoji && <span className="mr-2">{widget.emoji}</span>}{widget.heading}
        </motion.h3>
        {widget.subheading && (
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }}
            className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5"
          >
            {widget.subheading}
          </motion.p>
        )}
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          <motion.a href={widget.buttonUrl} onClick={onTrackClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
          >
            {widget.buttonText || 'Get Started'}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
          {widget.secondaryButtonUrl && (
            <motion.a href={widget.secondaryButtonUrl} whileHover={{ scale: 1.01 }}
              className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full text-[var(--text-primary)] font-semibold text-sm border border-[var(--border-hover)] hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
            >
              {widget.secondaryButtonText}
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
