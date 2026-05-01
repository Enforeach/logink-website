import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import './globals.css'

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
    <html lang="id">
      <body className="min-h-screen font-outfit antialiased">{children}</body>
    </html>
  )
}
