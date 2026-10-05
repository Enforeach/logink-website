# 1 · Architecture (B): next.config, middleware, repo-level changes

Part of `docs/redesign/BUILD.md`. Precedence: BUILD parts > `DESIGN.md` > blueprint > final.md.

## 1.5 next.config.ts (Core)

```ts
import { REDIRECTS } from './src/lib/services'   // relative import: Next registers an SWC require hook for config imports
                                                  // (next/dist/build/next-config-ts). No '@/' alias inside services.ts.
const nextConfig: NextConfig = {
  async redirects() { return REDIRECTS },         // replaces today's 6 entries (all 6 are included)
  async headers() { return [
    { source: '/media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '/og/:path*',    headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] },
  ] },
  images: {
    formats: ['image/avif', 'image/webp'],        // owner default 11: WebP masters, AVIF to capable browsers
    qualities: [60, 75],                          // required in Next 16; 60 = hover float and thumbs
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [{ protocol: 'https', hostname: 'rqtwb25xeycekd8y.public.blob.vercel-storage.com' }],
  },
  experimental: {
    globalNotFound: true, viewTransition: true, inlineCss: true,
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },
}
export default withPayload(withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig), { devBundleServerPackages: false })
```
- `remotePatterns`: after the change, Core opens `/blog`, one post, `/portfolio` and one case in dev. If any image errors with "hostname is not configured", Core adds that exact host (never `'**'`).
- `/media/*` files live in sha8-named folders, so `immutable` is safe (§4.3). Check the range support once: `curl -sI -r 0-1 http://localhost:3000/media/<buka dir>/film.webm` must return 206.
- The www → apex 308 is a Vercel domain setting (owner action, not code).
- next.config changes restart the shared dev server automatically. If `:3000` does not answer twice 10 s apart, follow the restart rule in the task header.

## 1.6 Middleware

`src/middleware.ts` is **deleted**. It only set an `x-locale` response header, and nothing reads it (`rg x-locale src` finds only the middleware). `<html lang>` now comes from the two roots, and Next 16 deprecates `middleware`. With no proxy, no request for media, OG images, fonts or video passes through one. If a proxy is ever needed, it is `src/proxy.ts` with this matcher, which excludes every asset type:

```ts
export const config = { matcher: ['/((?!api|admin|_next/static|_next/image|media|og|images|uploads|favicon.ico|icon.svg|robots.txt|sitemap.xml|llms.txt|.*\\.(?:webm|mp4|vtt|avif|webp|jpg|jpeg|png|gif|svg|ico|woff2|xml|txt|json)$).*)'] }
```

## 1.7 Other repo-level changes (Core unless noted)

- `public/llms.txt` is deleted, because a static file and a route at the same path conflict. `/llms.txt` (route, `revalidate = 3600`) is generated from the registry: ENTITY, the 7 services with price text, key pages ID+EN, and the contact line. It now includes Local SEO and the AI page.
- `public/robots.txt` keeps the same rules (every bot allowed under `*`, `/admin/` and `/api/` disallowed, the Sitemap line). Add the aeo-geo comment block naming the AI crawlers; they stay allowed.
- Delete `public/{file,globe,next,vercel,window}.svg` (Next starter leftovers; `rg` finds no users).
- `.gitignore`: replace the line `scripts/` with `scripts/*`, `!scripts/qa/`, `!scripts/check-tokens.mjs`, `!scripts/install-media.mjs`, `!scripts/fixtures/`. Nothing is committed on this branch now.
- `package.json`: add the gate scripts from §6.1. No new dependencies.
- `src/payload/queries.ts`, `src/collections/**` and `src/payload/revalidate.ts` are **not edited**. Every query the new pages need already exists (§3.5). Category counts come from `getBlogList(locale, slug)`. The sitemap has `revalidate = 3600`, so it picks up new posts within the hour.
- `src/lib/utils.ts` stays (Logo.tsx imports `cn`). `src/components/ui/Logo.tsx` is never edited.
- Legacy deletion: each package deletes the legacy files it replaces (listed in §5). QA deletes the remaining orphans in W4 (§5.11).
