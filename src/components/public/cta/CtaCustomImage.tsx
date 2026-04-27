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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
      className={`block relative rounded-2xl overflow-hidden group my-8 cursor-pointer ${widget.cssClass || ''}`}
      style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.2)' }}
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

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
          {widget.buttonText || 'Click to learn more'} →
        </span>
      </div>

      {/* Sponsored label */}
      {widget.sponsoredLabel && (
        <span className="absolute top-0 left-0 text-[10px] text-white/60 bg-black/40 backdrop-blur-sm rounded-br-lg px-2.5 py-1">
          Sponsored
        </span>
      )}
    </motion.a>
  )
}
