export const BRAND = {
  // "Warm Canvas" 2026 rebrand, accents come from the logo ribbon
  cream: '#FDF8F3',
  surface: '#FFFFFF',
  ink: '#231A26',
  magenta: '#A8138F',
  crimson: '#D81C5C',
  coral: '#EE3D5E',
  orange: '#F88438',
  purple: '#A855F7',
  gold: '#F5A623',
  services: {
    seo: '#A855F7',
    social: '#D81C5C',
    ads: '#F88438',
    creative: '#F5A623',
    web: '#C084FC',
  },
  gradient: 'linear-gradient(100deg, #A8138F 0%, #D81C5C 35%, #EE3D5E 65%, #F88438 100%)',
  gradientCta: 'linear-gradient(100deg, #D81C5C, #F88438)',
} as const

export const SITE = {
  name: 'Logink',
  tagline: 'Connected Creativity',
  description: '360° Digital Marketing Agency, Jakarta, Indonesia',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://logink.co',
  email: 'hello@logink.co',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628139453933',
  instagram: 'https://instagram.com/logink.co',
  address: 'Jakarta, Indonesia',
} as const

export const NAV_LINKS = [
  { href: '/layanan', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const

export const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628139453933'}?text=Hi%20Logink%2C%20I%27m%20interested%20in%20your%20services`
