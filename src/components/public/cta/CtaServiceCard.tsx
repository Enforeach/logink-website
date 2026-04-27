'use client'
import { motion } from 'framer-motion'
import { useCtaDismiss } from './useCtaDismiss'

interface Props {
  widget: {
    id: string
    heading?: string | null
    subheading?: string | null
    buttonText?: string | null
    buttonUrl: string
    emoji?: string | null
    dismissible: boolean
    dismissDuration: number
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
  }
  onTrackClick?: () => void
}

export function CtaServiceCard({ widget, onTrackClick }: Props) {
  const { dismissed, dismiss } = useCtaDismiss(widget.id, widget.dismissDuration)
  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className={`relative group rounded-2xl p-7 my-6 ${widget.cssClass || ''}`}
      style={{ background: '#1A1530', border: '1px solid rgba(255,247,237,0.08)' }}
      {...(widget.dataAttributes || {})}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ padding: '1px', background: 'linear-gradient(135deg, #7C3AED, #DB2777)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}
      />

      {widget.dismissible && (
        <button onClick={dismiss} className="absolute top-3 right-3 h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white/60 transition-all text-xs">✕</button>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="h-12 w-12 rounded-xl flex items-center justify-center text-xl mb-4"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(219,39,119,0.2))' }}
      >
        {widget.emoji || '📈'}
      </motion.div>

      <h3 className="text-xl font-bold text-[#FFF7ED] tracking-tight mb-2">{widget.heading}</h3>
      {widget.subheading && <p className="text-sm text-[#FFF7ED]/60 leading-relaxed mb-5">{widget.subheading}</p>}

      <motion.a
        href={widget.buttonUrl}
        onClick={onTrackClick}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm"
        style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777)' }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.3)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
      >
        {widget.buttonText || 'Get Started'} <motion.span whileHover={{ x: 4 }} className="inline-block">→</motion.span>
      </motion.a>
    </motion.div>
  )
}
