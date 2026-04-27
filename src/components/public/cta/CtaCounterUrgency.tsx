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
          initial={{ y: -20, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: 20, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-extrabold block"
          style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`relative rounded-2xl p-8 text-center my-8 ${widget.cssClass || ''}`}
      style={{ background: '#1A1530', border: '1px solid rgba(255,247,237,0.08)' }}
      {...(widget.dataAttributes || {})}
    >
      {widget.dismissible && (
        <button onClick={dismiss} className="absolute top-3 right-3 h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-white/10 text-xs">✕</button>
      )}

      <p className="text-xs text-[#FFF7ED]/50 uppercase tracking-wider font-medium mb-4">
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
              <div className="rounded-xl px-4 py-4 w-[64px] text-center" style={{ background: '#0F0A1E', border: '1px solid rgba(255,247,237,0.08)' }}>
                <FlipDigit value={val} />
                <p className="text-[10px] text-[#FFF7ED]/40 uppercase mt-1">{label}</p>
              </div>
              {i < 3 && <span className="text-xl text-[#FFF7ED]/20 font-bold pb-4">:</span>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#FFF7ED]/40 mb-6">This offer has expired.</p>
      )}

      {widget.heading && <p className="text-lg font-semibold text-[#FFF7ED] mb-5">{widget.heading}</p>}

      {!timeLeft.expired && (
        <motion.a
          href={widget.buttonUrl}
          onClick={onTrackClick}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777)' }}
        >
          {widget.buttonText || 'Claim This Offer'}
        </motion.a>
      )}
    </motion.div>
  )
}
