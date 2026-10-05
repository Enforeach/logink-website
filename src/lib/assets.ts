// Media lookup (BUILD §4.3). Components learn what exists ONLY through media.json, written by
// scripts/install-media.mjs at install time. No filesystem access at request time (Vercel functions
// cannot see public/). A null result means: render the documented no-asset fallback (§4.4).
import data from '@/content/media.json'
import og from '@/content/og.json'
import type { L, SvcKey } from '@/lib/services'

export type MediaKey = 'buka' | 'atap' | 'ig' | 'motion360' | 'hero' | 'film-seo' | 'film-localseo' | 'film-social' | 'film-geo' | 'film-ads' | 'film-web' | 'film-creative' | 'jam-0700-seo' | 'jam-0830-local' | 'jam-1240-sosial'
  | 'jam-1510-kreatif' | 'jam-1630-website' | 'jam-1805-seo-ai' | 'jam-2030-iklan'
export type MediaFile = { src: string; w: number; h: number; bytes: number; alt?: L }
export type MediaEntry = {
  dir: string
  rendered: boolean
  alt: L
  caption: L | null
  frames?: { dir: string; count: number; width: number; height: number }
  files: Record<string, MediaFile>
}

const assets = (data as { assets: Partial<Record<MediaKey, MediaEntry>> }).assets

export const media = (k: MediaKey): MediaEntry | null => assets[k] ?? null
export const mediaFile = (k: MediaKey, f: string): MediaFile | null => assets[k]?.files[f] ?? null

export const SVC_STILL: Record<SvcKey, MediaKey> = {
  seo: 'jam-0700-seo', localseo: 'jam-0830-local', social: 'jam-1240-sosial', creative: 'jam-1510-kreatif',
  website: 'jam-1630-website', ai: 'jam-1805-seo-ai', ads: 'jam-2030-iklan',
}

/** Service hero films (owner motion, full 16:9 frame and length): replace the still in the hero when installed. */
export const SVC_FILM: Partial<Record<SvcKey, MediaKey>> = { seo: 'film-seo', localseo: 'film-localseo', social: 'film-social', ai: 'film-geo', ads: 'film-ads', website: 'film-web', creative: 'film-creative' }

export const ogUrl = (key: string) => ((og as string[]).includes(key) ? `/og/${key}.jpg` : '/images/og-default.jpg')
