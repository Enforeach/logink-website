'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCtaDismiss } from './useCtaDismiss'

interface Props {
  widget: {
    id: string
    heading?: string | null
    subheading?: string | null
    buttonText?: string | null
    buttonUrl: string
    countdownLabel?: string | null
    endDate?: string | Date | null
    emoji?: string | null
    dismissible: boolean
    dismissDuration: number
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
  }
  onTrackClick?: () => void
}

function FlipDigit({ value }: { value: number }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-display text-2xl font-bold text-brand-crimson block tabular-nums"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export function CtaCounterUrgency({ widget, onTrackClick }: Props) {
  const { dismissed, dismiss } = useCtaDismiss(widget.id, widget.dismissDuration)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false })

  useEffect(() => {
    const target = widget.endDate ? new Date(widget.endDate).getTime() : Date.now() + 7 * 24 * 60 * 60 * 1000
    const calc = () => {
      const diff = target - Date.now()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: false,
      })
    }
    calc()
    const t = setInterval(calc, 1000)
    return () => clearInterval(t)
  }, [widget.endDate])

  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl bg-white border border-[var(--border-default)] shadow-card p-8 text-center my-8 ${widget.cssClass || ''}`}
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

      <p className="eyebrow mb-4">
        {widget.emoji} {widget.countdownLabel || 'Offer ends in:'}
      </p>

      {!timeLeft.expired ? (
        <div className="flex items-center justify-center gap-2 mb-6">
          {[
            { val: timeLeft.days, label: 'days' },
            { val: timeLeft.hours, label: 'hrs' },
            { val: timeLeft.minutes, label: 'min' },
            { val: timeLeft.seconds, label: 'sec' },
          ].map(({ val, label }, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="rounded-xl px-4 py-4 w-[64px] text-center bg-brand-rose border border-[var(--border-default)]">
                <FlipDigit value={val} />
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">{label}</p>
              </div>
              {i < 3 && <span className="text-xl text-[var(--text-muted)] font-bold pb-4">:</span>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--text-muted)] mb-6">This offer has expired.</p>
      )}

      {widget.heading && <p className="font-display text-lg font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-5">{widget.heading}</p>}

      {!timeLeft.expired && (
        <motion.a
          href={widget.buttonUrl}
          onClick={onTrackClick}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50"
        >
          {widget.buttonText || 'Claim This Offer'}
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </motion.a>
      )}
    </motion.div>
  )
}
