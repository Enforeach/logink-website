import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { SITE } from '@/lib/constants'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Logink - 360° Digital Marketing Agency Jakarta',
    template: '%s | Logink',
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    siteName: 'Logink',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className="min-h-screen font-outfit antialiased">{children}</body>
    </html>
  )
}
