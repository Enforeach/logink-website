import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { withPayload } from '@payloadcms/next/withPayload'
// Relative import: Next registers an SWC require hook for config imports; services.ts has no '@/' imports.
import { REDIRECTS } from './src/lib/services'

const nextConfig: NextConfig = {
  // 27 x 308 from the registry (BUILD §1.10); includes the 6 entries that lived here before.
  async redirects() {
    return REDIRECTS
  },
  async headers() {
    return [
      // public/media/<key>-<sha8>/: the folder name changes whenever the bytes change
      { source: '/media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/og/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'], // WebP masters, AVIF to capable browsers (owner default 11)
    qualities: [60, 75], // required in Next 16; 60 = hover float and thumbs
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [{ protocol: 'https', hostname: 'rqtwb25xeycekd8y.public.blob.vercel-storage.com' }],
  },
  experimental: {
    globalNotFound: true,
    viewTransition: true,
    inlineCss: true,
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },
}

export default withPayload(
  withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig),
  { devBundleServerPackages: false },
)
