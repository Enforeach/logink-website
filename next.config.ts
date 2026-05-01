import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/services', destination: '/layanan', permanent: true },
      { source: '/services/seo-content-marketing', destination: '/layanan/jasa-seo-profesional', permanent: true },
      { source: '/services/social-media-management', destination: '/layanan/sosial-media-manajemen', permanent: true },
      { source: '/services/paid-advertising', destination: '/layanan/paid-ads', permanent: true },
      { source: '/services/website-landing-page', destination: '/layanan/website-development', permanent: true },
      { source: '/services/creative-services', destination: '/layanan/kreatif', permanent: true },
    ]
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'recharts'],
  },
}

export default nextConfig
