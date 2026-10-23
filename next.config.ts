import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { withPayload } from '@payloadcms/next/withPayload'

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
    inlineCss: true,
  },
}

export default withPayload(
  withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig),
  { devBundleServerPackages: false },
)
