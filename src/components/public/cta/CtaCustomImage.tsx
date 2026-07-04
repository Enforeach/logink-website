'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Props {
  widget: {
    id: string
    backgroundImage?: string | null
    buttonUrl: string
    buttonText?: string | null
    sponsoredLabel: boolean
    cssClass?: string | null
    dataAttributes?: Record<string, string> | null
    placement?: string | null
  }
  onTrackClick?: () => void
}

export function CtaCustomImage({ widget, onTrackClick }: Props) {
  if (!widget.backgroundImage) return null
  const isPriority = widget.placement === 'ABOVE_FOLD'

  return (
    <motion.a
      href={widget.buttonUrl}
      onClick={onTrackClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
      className={`block relative rounded-2xl overflow-hidden group my-8 cursor-pointer border border-[var(--border-default)] shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50 ${widget.cssClass || ''}`}
      {...(widget.dataAttributes || {})}
    >
      <div className="relative aspect-[16/5] w-full">
        <Image
          src={widget.backgroundImage}
          alt={widget.buttonText || 'Promotional banner'}
          fill
          className="object-cover"
          priority={isPriority}
          sizes="(max-width: 640px) 640px, 1200px"
        />
      </div>

      {/* Hover overlay — soft ink scrim so the pill reads on any image */}
      <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/20 transition-colors duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-brand-ink text-sm font-semibold px-5 py-2.5 rounded-full shadow-card">
          {widget.buttonText || 'Click to learn more'} →
        </span>
      </div>

      {/* Sponsored label */}
      {widget.sponsoredLabel && (
        <span className="absolute top-3 left-3 text-[10px] font-medium text-[var(--text-secondary)] bg-white/85 backdrop-blur-sm rounded-full px-2.5 py-1">
          Sponsored
        </span>
      )}
    </motion.a>
  )
}
