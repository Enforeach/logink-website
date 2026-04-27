'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const CtaHeroBanner = dynamic(() => import('./CtaHeroBanner').then(m => ({ default: m.CtaHeroBanner })))
const CtaServiceCard = dynamic(() => import('./CtaServiceCard').then(m => ({ default: m.CtaServiceCard })))
const CtaInlineCallout = dynamic(() => import('./CtaInlineCallout').then(m => ({ default: m.CtaInlineCallout })))
const CtaCustomImage = dynamic(() => import('./CtaCustomImage').then(m => ({ default: m.CtaCustomImage })))
const CtaMinimalStrip = dynamic(() => import('./CtaMinimalStrip').then(m => ({ default: m.CtaMinimalStrip })))
const CtaFloatingNotification = dynamic(() => import('./CtaFloatingNotification').then(m => ({ default: m.CtaFloatingNotification })))
const CtaSplitVisual = dynamic(() => import('./CtaSplitVisual').then(m => ({ default: m.CtaSplitVisual })))
const CtaCounterUrgency = dynamic(() => import('./CtaCounterUrgency').then(m => ({ default: m.CtaCounterUrgency })))

export interface CtaWidgetData {
  id: string
  templateType: string
  heading?: string | null
  subheading?: string | null
  buttonText?: string | null
  buttonUrl: string
  secondaryButtonText?: string | null
  secondaryButtonUrl?: string | null
  backgroundImage?: string | null
  backgroundColor?: string | null
  textColor?: string | null
  cssClass?: string | null
  gaEventCategory?: string | null
  gaEventLabel?: string | null
  dataAttributes?: Record<string, string> | null
  placement?: string | null
  emoji?: string | null
  sponsoredLabel: boolean
  dismissible: boolean
  dismissDuration: number
  displayTrigger?: string | null
  displayDelay?: number | null
  scrollDepthThreshold?: number | null
  countdownLabel?: string | null
  imagePosition?: string | null
  endDate?: string | Date | null
}

export function CtaRenderer({ widget }: { widget: CtaWidgetData }) {
  // Track impression
  useEffect(() => {
    fetch(`/api/cta-widgets/${widget.id}/impression`, { method: 'POST' }).catch(() => {})
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'cta_impression', {
        event_label: widget.gaEventLabel || widget.id,
        cta_id: widget.id,
        cta_placement: widget.placement,
        cta_template: widget.templateType,
      })
    }
  }, [widget.id, widget.gaEventLabel, widget.placement, widget.templateType])

  const trackClick = () => {
    fetch(`/api/cta-widgets/${widget.id}/click`, { method: 'POST' }).catch(() => {})
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', widget.gaEventCategory || 'cta_click', {
        event_label: widget.gaEventLabel || widget.id,
        event_category: 'CTA',
        cta_id: widget.id,
        cta_placement: widget.placement,
        cta_template: widget.templateType,
      })
    }
  }

  const props = { widget, onTrackClick: trackClick }

  switch (widget.templateType) {
    case 'HERO_BANNER': return <CtaHeroBanner {...props} />
    case 'SERVICE_CARD': return <CtaServiceCard {...props} />
    case 'INLINE_CALLOUT': return <CtaInlineCallout {...props} />
    case 'CUSTOM_IMAGE': return <CtaCustomImage {...props} />
    case 'MINIMAL_STRIP': return <CtaMinimalStrip {...props} />
    case 'FLOATING_NOTIFICATION': return <CtaFloatingNotification {...props} />
    case 'SPLIT_VISUAL': return <CtaSplitVisual {...props} />
    case 'COUNTER_URGENCY': return <CtaCounterUrgency {...props} />
    default: return null
  }
}
