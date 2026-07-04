'use client'
import { motion, AnimatePresence } from 'framer-motion'
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
    emoji?: string | null
    dismissible: boolean
    dismissDuration: number
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
    gaEventCategory?: string | null
    gaEventLabel?: string | null
  }
  onTrackClick?: () => void
}

export function CtaHeroBanner({ widget, onTrackClick }: Props) {
  const { dismissed, dismiss } = useCtaDismiss(widget.id, widget.dismissDuration)

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          exit={{ scale: 0.95, opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
          transition={{ duration: 0.3 }}
          className={`cta-widget ${widget.cssClass || ''}`}
          {...(widget.dataAttributes || {})}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl gradient-brand-bg p-10 md:p-12 my-8 shadow-cta"
          >
            {/* Soft drifting orb + dot texture */}
            <div className="orb h-64 w-64 -top-20 -right-16 bg-white/25" aria-hidden="true" />
            <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true"
              style={{ backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            {/* Close button */}
            {widget.dismissible && (
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="absolute top-3 right-3 z-20 h-7 w-7 rounded-full bg-white/15 flex items-center justify-center text-white/70 hover:bg-white/25 hover:text-white transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                ✕
              </button>
            )}

            <div className="relative z-10 max-w-2xl">
              {/* Tag pill */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-5"
              >
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] text-white bg-white/15 border border-white/25">
                  {widget.emoji || '✦'} {widget.heading ? 'Special Offer' : 'Featured'}
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl md:text-3xl font-bold text-white tracking-[-0.03em] leading-[1.1] mb-3"
              >
                {widget.heading}
              </motion.h3>

              {widget.subheading && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white/85 text-base leading-relaxed mb-6 max-w-lg"
                >
                  {widget.subheading}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3"
              >
                <motion.a
                  href={widget.buttonUrl}
                  onClick={onTrackClick}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-ink font-semibold text-sm shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {widget.buttonText || 'Get Started'}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </motion.a>
                {widget.secondaryButtonUrl && (
                  <motion.a
                    href={widget.secondaryButtonUrl}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm border border-white/40 hover:bg-white/10 hover:border-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {widget.secondaryButtonText}
                  </motion.a>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="mt-5 text-xs text-white/70"
              >
                ✓ No commitment · ✓ 48hr delivery · ✓ Free consultation
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
