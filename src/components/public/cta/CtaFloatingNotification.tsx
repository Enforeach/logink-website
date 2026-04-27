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
          <div className="h-[2px] rounded-t-2xl" style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777)' }} />
          <div className="rounded-b-2xl p-5 shadow-2xl" style={{ background: '#1A1530', border: '1px solid rgba(255,247,237,0.1)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
            {widget.dismissible && (
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/15 hover:text-white/70 transition-all text-xs"
              >
                ✕
              </button>
            )}
            <div className="pr-8">
              <p className="text-base font-bold text-[#FFF7ED] mb-1">
                {widget.emoji} {widget.heading}
              </p>
              {widget.subheading && <p className="text-xs text-[#FFF7ED]/60 leading-relaxed mb-4">{widget.subheading}</p>}
              <motion.a
                href={widget.buttonUrl}
                onClick={onTrackClick}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                {widget.buttonText || 'Learn more'}
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
