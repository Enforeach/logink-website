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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className={`grid grid-cols-1 md:grid-cols-[200px_1fr] rounded-2xl overflow-hidden my-8 ${isRight ? 'md:grid-cols-[1fr_200px]' : ''} ${widget.cssClass || ''}`}
      style={{ background: '#1A1530', border: '1px solid rgba(255,247,237,0.08)' }}
      {...(widget.dataAttributes || {})}
    >
      {/* Image */}
      <div className={`overflow-hidden relative ${isRight ? 'order-2 md:order-2' : ''}`}>
        {widget.backgroundImage ? (
          <motion.div className="h-full min-h-[150px] relative" whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
            <Image src={widget.backgroundImage} alt={widget.heading || ''} fill className="object-cover" />
          </motion.div>
        ) : (
          <div className="h-full min-h-[150px]" style={{ background: 'linear-gradient(135deg, #7C3AED, #DB2777)' }} />
        )}
      </div>

      {/* Text */}
      <div className={`p-7 ${isRight ? 'order-1 md:order-1' : ''} relative`}>
        {widget.dismissible && (
          <button onClick={dismiss} className="absolute top-3 right-3 h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-white/10 text-xs">✕</button>
        )}
        <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-xl font-bold text-[#FFF7ED] mb-2"
        >
          {widget.emoji && <span className="mr-2">{widget.emoji}</span>}{widget.heading}
        </motion.h3>
        {widget.subheading && (
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="text-sm text-[#FFF7ED]/60 leading-relaxed mb-5"
          >
            {widget.subheading}
          </motion.p>
        )}
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <motion.a href={widget.buttonUrl} onClick={onTrackClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777)' }}
          >
            {widget.buttonText || 'Get Started'} →
          </motion.a>
          {widget.secondaryButtonUrl && (
            <motion.a href={widget.secondaryButtonUrl} whileHover={{ scale: 1.01 }}
              className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-[#FFF7ED]/70 font-semibold text-sm"
              style={{ border: '1px solid rgba(255,247,237,0.15)' }}
            >
              {widget.secondaryButtonText}
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
