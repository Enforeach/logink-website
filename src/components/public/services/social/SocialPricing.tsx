'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { SOCIAL_ADDONS } from './data'

const PLATFORM_COLORS: Record<string, string> = {
  Instagram: '#E4405F',
  TikTok: '#FE2C55',
  Facebook: '#1877F2',
}

interface OrgState {
  selected: boolean
  instagram: boolean
  tiktok: boolean
  facebook: boolean
  postsPerMonth: number | 'custom'
}

interface TikTokState {
  selected: boolean
  videosPerMonth: number | 'custom'
}

interface LinkedInState {
  selected: boolean
  postsPerMonth: number | 'custom'
  profilesManaged: number | 'custom'
}

interface AddonsState {
  influencerMarketing: boolean
  socialMediaAudit: boolean
}

function SegmentedControl({
  options,
  value,
  onChange,
  accentColor,
}: {
  options: (number | string)[]
  value: number | string
  onChange: (v: number | string) => void
  accentColor: string
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={String(opt)}
            onClick={() => onChange(opt)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
            style={{
              background: active ? accentColor : 'var(--bg-elevated)',
              color: active ? '#fff' : 'var(--text-secondary)',
              border: `1px solid ${active ? accentColor : 'var(--border-default)'}`,
            }}
          >
            {typeof opt === 'number' ? opt : opt}
          </button>
        )
      })}
    </div>
  )
}

function CustomCheckbox({ checked, onChange, accentColor }: { checked: boolean; onChange: () => void; accentColor: string }) {
  return (
    <button
      onClick={onChange}
      className="flex-shrink-0 h-5 w-5 rounded flex items-center justify-center transition-all duration-200"
      style={{
        border: checked ? `2px solid ${accentColor}` : '2px solid var(--border-default)',
        background: checked ? accentColor : 'transparent',
      }}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check size={11} strokeWidth={3} className="text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

const ORGANIC_ACCENT = '#DB2777'
const TIKTOK_ACCENT = '#FE2C55'
const LINKEDIN_ACCENT = '#0A66C2'

export function SocialPricing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  const [org, setOrg] = useState<OrgState>({
    selected: false,
    instagram: true,
    tiktok: true,
    facebook: false,
    postsPerMonth: 12,
  })
  const [tiktok, setTikTok] = useState<TikTokState>({ selected: false, videosPerMonth: 8 })
  const [linkedin, setLinkedIn] = useState<LinkedInState>({
    selected: false,
    postsPerMonth: 8,
    profilesManaged: 1,
  })
  const [addons, setAddons] = useState<AddonsState>({
    influencerMarketing: false,
    socialMediaAudit: false,
  })

  const anySelected = org.selected || tiktok.selected || linkedin.selected

  const selectedPlatforms = [
    org.instagram && 'Instagram',
    org.tiktok && 'TikTok',
    org.facebook && 'Facebook',
  ].filter(Boolean)

  const moduleIds = [
    org.selected && 'organic-social',
    tiktok.selected && 'tiktok-strategy',
    linkedin.selected && 'linkedin-b2b',
  ]
    .filter(Boolean)
    .join(',')

  const waMessage = encodeURIComponent(
    `Hi Logink, I'm interested in Social Media Management: ${[
      org.selected && `Organic Social (${selectedPlatforms.join(' + ')}, ${org.postsPerMonth} posts/mo)`,
      tiktok.selected && `TikTok Strategy (${tiktok.videosPerMonth} videos/mo)`,
      linkedin.selected && `LinkedIn Management (${linkedin.postsPerMonth} posts/mo, ${linkedin.profilesManaged} profiles)`,
    ]
      .filter(Boolean)
      .join(', ')}. Can you send me a custom quote?`
  )

  return (
    <section id="pricing" className="py-20 px-4" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(219,39,119,0.04) 0%, #0F0A1E 60%)' }}>
      <div className="max-w-3xl mx-auto" ref={sectionRef}>
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-3">Pricing</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Bangun paket social media-mu sendiri.
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-xl">
            Setiap brand berbeda. Pilih modul yang kamu butuhkan, kasih tahu volume-nya, dan kami kirim proposal kustom dalam 24 jam.
          </p>
        </div>

        <div className="space-y-3">
          {/* ── Card 1: Organic Social ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="rounded-xl border border-[var(--border-default)] overflow-hidden transition-all duration-200"
            style={{
              background: org.selected ? `rgba(219,39,119,0.04)` : 'var(--bg-surface)',
              borderLeft: org.selected ? `3px solid ${ORGANIC_ACCENT}` : undefined,
            }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <CustomCheckbox
                  checked={org.selected}
                  onChange={() => setOrg((s) => ({ ...s, selected: !s.selected }))}
                  accentColor={ORGANIC_ACCENT}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-[var(--text-primary)]">Organic Social Management</h3>
                    <div className="flex gap-1.5">
                      {['Instagram', 'TikTok', 'Facebook'].map((p) => (
                        <span
                          key={p}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{ background: `${PLATFORM_COLORS[p]}20`, color: PLATFORM_COLORS[p] }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Perencanaan konten, desain, posting, dan community management di Instagram, TikTok, dan Facebook.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Rencana Konten', 'Desain Visual', 'Caption', 'Community Mgmt', 'Laporan Bulanan'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] border border-[var(--border-default)] text-[var(--text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expanded config */}
              <AnimatePresence>
                {org.selected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="mt-5 pt-5 border-t border-[var(--border-default)] pl-9 space-y-4">
                      {/* Platform toggles */}
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Platform aktif</div>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            { key: 'instagram', label: 'Instagram', color: PLATFORM_COLORS.Instagram },
                            { key: 'tiktok', label: 'TikTok', color: PLATFORM_COLORS.TikTok },
                            { key: 'facebook', label: 'Facebook', color: PLATFORM_COLORS.Facebook },
                          ].map(({ key, label, color }) => {
                            const active = org[key as 'instagram' | 'tiktok' | 'facebook']
                            return (
                              <button
                                key={key}
                                onClick={() => setOrg((s) => ({ ...s, [key]: !s[key as 'instagram' | 'tiktok' | 'facebook'] }))}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                                style={{
                                  background: active ? `${color}20` : 'var(--bg-elevated)',
                                  color: active ? color : 'var(--text-muted)',
                                  border: `1px solid ${active ? color : 'var(--border-default)'}`,
                                }}
                              >
                                {label}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Posts/month */}
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Post per bulan (per platform)</div>
                        <SegmentedControl
                          options={[8, 12, 16, 20, 'Custom']}
                          value={org.postsPerMonth}
                          onChange={(v) => setOrg((s) => ({ ...s, postsPerMonth: v as OrgState['postsPerMonth'] }))}
                          accentColor={ORGANIC_ACCENT}
                        />
                        <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
                          Rekomendasi: 12–20 post per platform untuk visibilitas yang konsisten
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Card 2: TikTok ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-xl border border-[var(--border-default)] overflow-hidden transition-all duration-200"
            style={{
              background: tiktok.selected ? 'rgba(254,44,85,0.04)' : 'var(--bg-surface)',
              borderLeft: tiktok.selected ? `3px solid ${TIKTOK_ACCENT}` : undefined,
            }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <CustomCheckbox
                  checked={tiktok.selected}
                  onChange={() => setTikTok((s) => ({ ...s, selected: !s.selected }))}
                  accentColor={TIKTOK_ACCENT}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-[var(--text-primary)]">TikTok Strategy & Production</h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: `${TIKTOK_ACCENT}20`, color: TIKTOK_ACCENT }}
                    >
                      TikTok
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Pembuatan konten TikTok khusus dengan riset tren lokal, produksi video, dan optimasi algoritma.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Riset Tren', 'Produksi Video', 'Optimasi Hook', 'Strategi Hashtag', 'Analytics'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] border border-[var(--border-default)] text-[var(--text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {tiktok.selected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="mt-5 pt-5 border-t border-[var(--border-default)] pl-9 space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Video per bulan</div>
                        <SegmentedControl
                          options={[4, 8, 12, 'Custom']}
                          value={tiktok.videosPerMonth}
                          onChange={(v) => setTikTok((s) => ({ ...s, videosPerMonth: v as TikTokState['videosPerMonth'] }))}
                          accentColor={TIKTOK_ACCENT}
                        />
                        <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
                          Sudah termasuk konsep, skrip, syuting (Jakarta), editing, dan optimasi
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Card 3: LinkedIn ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="rounded-xl border border-[var(--border-default)] overflow-hidden transition-all duration-200"
            style={{
              background: linkedin.selected ? 'rgba(10,102,194,0.04)' : 'var(--bg-surface)',
              borderLeft: linkedin.selected ? `3px solid ${LINKEDIN_ACCENT}` : undefined,
            }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <CustomCheckbox
                  checked={linkedin.selected}
                  onChange={() => setLinkedIn((s) => ({ ...s, selected: !s.selected }))}
                  accentColor={LINKEDIN_ACCENT}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-[var(--text-primary)]">LinkedIn Management (B2B)</h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: `${LINKEDIN_ACCENT}20`, color: LINKEDIN_ACCENT }}
                    >
                      LinkedIn
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Optimasi halaman perusahaan, konten thought leadership, dan strategi koneksi untuk brand B2B.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Optimasi Halaman', 'Thought Leadership', 'Strategi Engagement', 'Analytics'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] border border-[var(--border-default)] text-[var(--text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {linkedin.selected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="mt-5 pt-5 border-t border-[var(--border-default)] pl-9 space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Post per bulan</div>
                        <SegmentedControl
                          options={[4, 8, 12, 'Custom']}
                          value={linkedin.postsPerMonth}
                          onChange={(v) => setLinkedIn((s) => ({ ...s, postsPerMonth: v as LinkedInState['postsPerMonth'] }))}
                          accentColor={LINKEDIN_ACCENT}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Profil yang dikelola</div>
                        <SegmentedControl
                          options={[1, 2, 3, 'Custom']}
                          value={linkedin.profilesManaged}
                          onChange={(v) => setLinkedIn((s) => ({ ...s, profilesManaged: v as LinkedInState['profilesManaged'] }))}
                          accentColor={LINKEDIN_ACCENT}
                        />
                        <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
                          Halaman perusahaan + profil eksekutif — masing-masing dapat konten yang disesuaikan
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Add-ons ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] p-5"
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Add-on Tersedia
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOCIAL_ADDONS.map((addon) => {
                const key = addon.id === 'influencer-marketing' ? 'influencerMarketing' : 'socialMediaAudit'
                const checked = addons[key as keyof AddonsState]
                return (
                  <button
                    key={addon.id}
                    onClick={() => setAddons((s) => ({ ...s, [key]: !s[key as keyof AddonsState] }))}
                    className="flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150"
                    style={{
                      borderColor: checked ? '#DB2777' : 'var(--border-default)',
                      background: checked ? 'rgba(219,39,119,0.04)' : 'var(--bg-elevated)',
                    }}
                  >
                    <div
                      className="flex-shrink-0 h-4 w-4 rounded flex items-center justify-center mt-0.5"
                      style={{
                        border: checked ? '2px solid #DB2777' : '2px solid var(--border-default)',
                        background: checked ? '#DB2777' : 'transparent',
                      }}
                    >
                      {checked && <Check size={9} strokeWidth={3} className="text-white" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">{addon.name}</div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{addon.description}</p>
                      <span className="mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-default)]">
                        {addon.badge}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Summary card ── */}
        <AnimatePresence>
          {anySelected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="mt-5 rounded-xl border p-6"
              style={{
                background: 'var(--bg-elevated)',
                borderImage: 'linear-gradient(135deg,#DB2777,#7C3AED) 1',
                border: '1px solid',
                borderColor: 'rgba(219,39,119,0.3)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-[var(--text-primary)]">📋 Ringkasan paketmu</span>
              </div>

              <ul className="space-y-2 mb-4">
                {org.selected && (
                  <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={14} className="text-pink-400 flex-shrink-0" />
                    Organic Social ({selectedPlatforms.length > 0 ? selectedPlatforms.join(' + ') : 'belum ada platform dipilih'},{' '}
                    {org.postsPerMonth} post/bln per platform)
                  </li>
                )}
                {tiktok.selected && (
                  <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={14} className="text-pink-400 flex-shrink-0" />
                    TikTok Strategy ({tiktok.videosPerMonth} video/bln)
                  </li>
                )}
                {linkedin.selected && (
                  <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={14} className="text-pink-400 flex-shrink-0" />
                    LinkedIn Management ({linkedin.postsPerMonth} post/bln, {linkedin.profilesManaged} profil)
                  </li>
                )}
                {addons.influencerMarketing && (
                  <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={14} className="text-pink-400 flex-shrink-0" />
                    + Influencer Marketing / KOL-KOC
                  </li>
                )}
                {addons.socialMediaAudit && (
                  <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={14} className="text-pink-400 flex-shrink-0" />
                    + Social Media Audit (one-time)
                  </li>
                )}
              </ul>

              <div className="text-xs text-[var(--text-muted)] mb-5 leading-relaxed">
                <span className="font-semibold text-[var(--text-secondary)]">Harga: Kustom</span> — berdasarkan pilihan di atas.
                Kami akan review kebutuhanmu dan kirim proposal lengkap dalam 24 jam. Tanpa komitmen.
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/contact?service=social-media-management&modules=${moduleIds}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:scale-[1.02] transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg,#DB2777,#7C3AED)' }}
                >
                  Dapatkan Penawaran Kustom →
                </Link>
                <a
                  href={`https://wa.me/628119401714?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white hover:scale-[1.02] transition-all duration-200"
                  style={{ background: '#25D366' }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat di WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!anySelected && (
          <div className="mt-5 rounded-xl border border-dashed border-[var(--border-default)] p-5 text-center">
            <p className="text-sm text-[var(--text-muted)]">Pilih minimal satu modul di atas untuk membangun paketmu.</p>
          </div>
        )}
      </div>
    </section>
  )
}
