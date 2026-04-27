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
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative overflow-hidden rounded-2xl p-10 md:p-12 my-8"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 50%, #D97706 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 15s ease infinite',
              boxShadow: '0 0 80px rgba(124,58,237,0.15), 0 4px 60px rgba(219,39,119,0.1)',
            }}
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: 'radial-gradient(circle, #FFF7ED 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            {/* Close button */}
            {widget.dismissible && (
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all text-sm"
              >
                ✕
              </button>
            )}

            <div className="relative z-10 max-w-2xl">
              {/* Tag pill */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-5 overflow-hidden relative"
              >
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-white border"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  {widget.emoji || '✦'} {widget.heading ? 'Special Offer' : 'Featured'}
                  <span
                    className="absolute inset-0 w-[30%]"
                    style={{ background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)', animation: 'shimmer 2s ease-in-out 0.5s' }}
                  />
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3"
              >
                {widget.heading}
              </motion.h3>

              {widget.subheading && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="text-white/70 text-base leading-relaxed mb-6 max-w-lg"
                >
                  {widget.subheading}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <motion.a
                  href={widget.buttonUrl}
                  onClick={onTrackClick}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#0F0A1E] font-semibold text-sm"
                  style={{ boxShadow: '0 0 0 rgba(255,255,255,0)' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(255,255,255,0.3)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(255,255,255,0)')}
                >
                  {widget.buttonText || 'Get Started'} <motion.span whileHover={{ x: 4 }} className="inline-block">→</motion.span>
                </motion.a>
                {widget.secondaryButtonUrl && (
                  <motion.a
                    href={widget.secondaryButtonUrl}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all"
                    style={{ border: '1.5px solid rgba(255,255,255,0.3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.6)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
                  >
                    {widget.secondaryButtonText}
                  </motion.a>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="mt-5 text-xs text-white/50"
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
