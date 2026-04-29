export const BRAND = {
  dark: '#0F0A1E',
  darkSurface: '#1A1530',
  warm: '#FFF7ED',
  cream: '#FFF9F2',
  creamSurface: '#F8F6F2',
  violet: '#7C3AED',
  pink: '#DB2777',
  amber: '#D97706',
  gold: '#F59E0B',
  services: {
    seo: '#7C3AED',
    social: '#DB2777',
    ads: '#D97706',
    creative: '#F59E0B',
    web: '#A78BFA',
  },
  gradient: 'linear-gradient(135deg, #7C3AED, #DB2777)',
} as const

export const SITE = {
  name: 'Logink',
  tagline: 'Connected Creativity',
  description: '360° Digital Marketing Agency — Jakarta, Indonesia',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://logink.co',
  email: 'hello@logink.co',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890',
  instagram: 'https://instagram.com/logink.co',
  address: 'Jakarta, Indonesia',
} as const

export const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
] as const

export const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890'}?text=Hi%20Logink%2C%20I%27m%20interested%20in%20your%20services`
