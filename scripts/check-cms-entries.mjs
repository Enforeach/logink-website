// docs/cms/PLAN.md principle 2: every route entry awaits loadCms() first, or it renders the TypeScript defaults
// instead of the CMS. Run: node scripts/check-cms-entries.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ENTRY = new Set(['page.tsx', 'not-found.tsx', 'global-not-found.tsx', 'route.ts'])
const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]))
const bad = []
for (const f of walk('src/app')) {
  if (!ENTRY.has(f.split('/').pop()) || f.includes('(payload)') || f.includes('/api/')) continue
  const s = readFileSync(f, 'utf8')
  if (/export const metadata = \w+\(/.test(s)) bad.push(`${f}: static metadata from a function (use generateMetadata + await loadCms())`)
  for (const m of s.matchAll(/export (?:default )?(?:async )?function (\w+)\([^)]*\)[^{\n]*\{\s*([^\n]*)/g)) {
    if (m[1] === 'generateStaticParams') continue
    if (!m[2].startsWith('await loadCms()')) bad.push(`${f}: ${m[1]}() must start with await loadCms()`)
  }
}
console.log(bad.length ? bad.join('\n') : 'check-cms-entries ok')
process.exit(bad.length ? 1 : 0)
