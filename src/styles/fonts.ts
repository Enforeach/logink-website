// → src/styles/fonts.ts, imported by the frontend root layouts.
// Warm Canvas (owner 2026-10-04: "use our logink.co current design"): Bricolage Grotesque for display and
// headings, Outfit for body and UI, as on the live site (DESIGN.md). Martian Mono stays for the instruments only, lazy.
import { Bricolage_Grotesque, Outfit, Martian_Mono } from 'next/font/google'

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-outfit', // stacks live in tokens.css (--ff-*)
})

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-display',
})

export const martian = Martian_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false, // instruments only
  adjustFontFallback: false, // 'LK Mono C' / 'LK Mono A' in tokens.css
  variable: '--font-martian',
})

// NEVER use --font-sans as a variable name. Logo.tsx draws its wordmark with
// var(--font-sans, -apple-system, system-ui); defining it changes the wordmark.
