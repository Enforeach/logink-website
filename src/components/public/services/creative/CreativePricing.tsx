'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CREATIVE_DELIVERABLES, CREATIVE_ADDONS, CREATIVE_ENGAGEMENT_TYPES } from './data'

function Checkbox({
  checked,
  onChange,
  accentColor,
}: {
  checked: boolean
  onChange: () => void
  accentColor: string
}) {
  return (
    <button
      onClick={onChange}
      className="h-5 w-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all"
      style={
        checked
          ? { background: accentColor, borderColor: accentColor }
          : { borderColor: `${accentColor}60`, background: 'transparent' }
      }
    >
      <AnimatePresence>
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="h-3 w-3 text-white"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}

export function CreativePricing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [addons, setAddons] = useState<Record<string, boolean>>({})
  const [engagement, setEngagement] = useState<string>('')

  const toggle = (id: string) => setSelected(s => ({ ...s, [id]: !s[id] }))
  const toggleAddon = (id: string) => setAddons(s => ({ ...s, [id]: !s[id] }))

  const selectedDesign = CREATIVE_DELIVERABLES.design.items.filter(i => selected[i.id]).map(i => i.name.split(' (')[0])
  const selectedVideo = CREATIVE_DELIVERABLES.video.items.filter(i => selected[i.id]).map(i => i.name.split(' (')[0])
  const selectedCopy = CREATIVE_DELIVERABLES.copy.items.filter(i => selected[i.id]).map(i => i.name.split(' (')[0])
  const selectedAddons = CREATIVE_ADDONS.filter(a => addons[a.id]).map(a => a.name.split(' & ')[0])

  const hasAny = selectedDesign.length + selectedVideo.length + selectedCopy.length + selectedAddons.length > 0

  const whatsappMsg = encodeURIComponent(
    `Halo Logink! Saya tertarik dengan Creative Services:\n` +
    (selectedDesign.length ? `Design: ${selectedDesign.join(', ')}\n` : '') +
    (selectedVideo.length ? `Video: ${selectedVideo.join(', ')}\n` : '') +
    (selectedCopy.length ? `Copy: ${selectedCopy.join(', ')}\n` : '') +
    (selectedAddons.length ? `Add-ons: ${selectedAddons.join(', ')}\n` : '') +
    (engagement ? `Tipe: ${CREATIVE_ENGAGEMENT_TYPES.find(e => e.id === engagement)?.name}` : '')
  )

  const quoteParams = new URLSearchParams({
    service: 'creative-services',
    deliverables: [...selectedDesign, ...selectedVideo, ...selectedCopy].join(','),
    addons: selectedAddons.join(','),
    type: engagement,
  }).toString()

  const categories = [
    CREATIVE_DELIVERABLES.design,
    CREATIVE_DELIVERABLES.video,
    CREATIVE_DELIVERABLES.copy,
  ] as const

  return (
    <section
      ref={ref}
      className="py-24 px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 60%), #0F0A1E' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Setiap proyek unik. Begitu juga harganya.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm leading-relaxed">
            Pekerjaan kreatif tidak muat dalam kotak yang baku. Kasih tahu apa yang kamu butuhkan, dan kami bangun scope serta penawaran kustom dalam 24 jam.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-8 space-y-8">

          {/* Deliverable categories */}
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)] mb-6">Apa yang kamu butuhkan?</p>
            <div className="space-y-8">
              {categories.map((cat, ci) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: ci * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cat.accentColor }}>
                      {cat.category}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${cat.accentColor}30` }} />
                  </div>
                  <div className="space-y-2">
                    {cat.items.map(item => (
                      <label key={item.id} className="flex items-center gap-3 cursor-pointer group py-1.5">
                        <Checkbox
                          checked={!!selected[item.id]}
                          onChange={() => toggle(item.id)}
                          accentColor={cat.accentColor}
                        />
                        <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                          {item.name}
                        </span>
                        <span className="ml-auto text-[10px] text-[var(--text-muted)] hidden sm:block max-w-[180px] text-right leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">Add-on Tersedia</p>
            <div className="space-y-2">
              {CREATIVE_ADDONS.map(addon => (
                <label key={addon.id} className="flex items-start gap-3 cursor-pointer group py-1.5">
                  <Checkbox
                    checked={!!addons[addon.id]}
                    onChange={() => toggleAddon(addon.id)}
                    accentColor="#F59E0B"
                  />
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{addon.name}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">{addon.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Engagement type */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">Tipe Engagement</p>
            <div className="space-y-2">
              {CREATIVE_ENGAGEMENT_TYPES.map(type => (
                <label key={type.id} className="flex items-start gap-3 cursor-pointer group py-1.5">
                  <button
                    onClick={() => setEngagement(type.id)}
                    className="h-5 w-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all mt-0.5"
                    style={
                      engagement === type.id
                        ? { borderColor: '#F59E0B', background: '#F59E0B' }
                        : { borderColor: 'rgba(255,255,255,0.3)' }
                    }
                  >
                    <AnimatePresence>
                      {engagement === type.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="h-2 w-2 rounded-full bg-white"
                        />
                      )}
                    </AnimatePresence>
                  </button>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {type.name}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Summary card */}
          <AnimatePresence>
            {hasAny && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="rounded-xl bg-[var(--bg-elevated)] border border-white/10 p-6 space-y-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">📋</span>
                  <span className="text-sm font-bold text-[var(--text-primary)]">Brief kreatifmu</span>
                </div>

                <div className="space-y-1.5 text-sm">
                  {selectedDesign.length > 0 && (
                    <div><span className="text-amber-400 font-semibold">Design: </span>
                      <span className="text-[var(--text-secondary)]">{selectedDesign.join(', ')}</span></div>
                  )}
                  {selectedVideo.length > 0 && (
                    <div><span className="text-pink-400 font-semibold">Video: </span>
                      <span className="text-[var(--text-secondary)]">{selectedVideo.join(', ')}</span></div>
                  )}
                  {selectedCopy.length > 0 && (
                    <div><span className="text-violet-400 font-semibold">Copy: </span>
                      <span className="text-[var(--text-secondary)]">{selectedCopy.join(', ')}</span></div>
                  )}
                  {selectedAddons.length > 0 && (
                    <div><span className="text-[var(--text-muted)] font-semibold">Add-ons: </span>
                      <span className="text-[var(--text-secondary)]">{selectedAddons.join(', ')}</span></div>
                  )}
                  {engagement && (
                    <div className="pt-1 border-t border-white/10 text-[var(--text-muted)] text-xs">
                      Tipe: {CREATIVE_ENGAGEMENT_TYPES.find(e => e.id === engagement)?.name}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 flex-wrap pt-2">
                  <a
                    href={`/contact?${quoteParams}`}
                    className="gradient-bg px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:scale-[1.02] transition-all"
                  >
                    Dapatkan Penawaran Kustom →
                  </a>
                  <a
                    href={`https://wa.me/6281234567890?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{ background: '#25D366' }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L.057 23.986l6.304-1.651A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.273-1.535l-.378-.225-3.922 1.028 1.047-3.818-.246-.392A9.818 9.818 0 1112 21.818z"/>
                    </svg>
                    Chat di WhatsApp
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!hasAny && (
            <p className="text-center text-sm text-[var(--text-muted)] py-2">
              Pilih deliverable di atas untuk membangun brief kreatifmu
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
