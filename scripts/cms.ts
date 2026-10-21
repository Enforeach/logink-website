// CMS tools (docs/cms/PLAN.md). Run through the Payload CLI wrapper:
//   scripts/payload.sh run scripts/cms.ts seed [--force] [--only <slug>]   seed the database in DATABASE_URL
//   scripts/payload.sh run scripts/cms.ts roundtrip [<slug>]               throwaway DB: push schema, seed, read back
// roundtrip proves the schema, the seeder and the merge agree: every live() default must come back from the CMS
// unchanged, and it lists the paths still served from code (fields with `skip`, or missing from the schema).
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'

const [cmd, ...rest] = process.argv.slice(2)
const flag = (n: string) => rest.includes(n)
const arg = (n: string) => (rest.includes(n) ? rest[rest.indexOf(n) + 1] : undefined)

if (cmd === 'roundtrip') {
  const db = `logink_rt_${(process.env.CMS_RT_NAME ?? 'main').replace(/\W/g, '_')}`
  const base = (process.env.DATABASE_URL ?? 'postgres://postgres@localhost:5434/x').replace(/\/[^/?]+(\?.*)?$/, '')
  if (!/localhost|127\.0\.0\.1/.test(base)) throw new Error('roundtrip only runs against a local Postgres')
  const pg = new URL(base)
  execSync(`dropdb --if-exists -h ${pg.hostname} -p ${pg.port || 5432} -U ${pg.username || 'postgres'} ${db} && createdb -h ${pg.hostname} -p ${pg.port || 5432} -U ${pg.username || 'postgres'} ${db}`, { stdio: 'inherit' })
  process.env.DATABASE_URL = `${base}/${db}`
  process.env.PAYLOAD_PUSH = 'true'
}

const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')
const { seed } = await import('../src/cms/seed')
const { registry, nodes } = await import('../src/cms/store')
const { merge } = await import('../src/cms/merge')
const { CMS_GLOBALS, CMS_KEYED } = await import('../src/cms/docs')

const payload = await getPayload({ config })
try {
  if (cmd === 'seed') {
    if (!/localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL ?? '') && !flag('--remote')) throw new Error('not a local DB: add --remote to seed it on purpose')
    console.log((await seed(payload, { force: flag('--force'), only: arg('--only') })).join('\n'))
  } else if (cmd === 'roundtrip') {
    const only = rest[0]
    console.log((await seed(payload, { only })).join('\n'))
    const q = { fallbackLocale: false as const, depth: 1, overrideAccess: true }
    const snap = { globals: {} as Record<string, Record<string, Record<string, unknown>>>, docs: {} as Record<string, Record<string, Record<string, Record<string, unknown>>>>, draft: false }
    for (const l of ['id', 'en'] as const) {
      for (const slug of CMS_GLOBALS) (snap.globals[slug] ??= {})[l] = (await payload.findGlobal({ slug: slug as never, locale: l, ...q })) as never
      for (const slug of CMS_KEYED) {
        const { docs } = await payload.find({ collection: slug as never, locale: l, pagination: false, ...q })
        for (const d of docs as Record<string, unknown>[]) ((snap.docs[slug] ??= {})[String(d.key)] ??= {})[l] = d
      }
    }
    const json = (v: unknown) => JSON.parse(JSON.stringify(v ?? null))
    let fail = 0
    for (const e of registry) {
      if (only && e.slug !== only) continue
      const name = `${e.slug}${e.key ? `/${e.key}` : ''} · ${e.field}`
      const trace = { cms: 0, fallback: [] as string[] }
      const [a, b] = nodes(snap as never, e)
      const got = merge(e.def, a, b, trace)
      try {
        assert.deepEqual(json(got), json(e.def))
        console.log(`ok   ${name}: ${trace.cms} values from the CMS${trace.fallback.length ? `, ${trace.fallback.length} from code: ${trace.fallback.slice(0, 12).join(' ')}${trace.fallback.length > 12 ? ' …' : ''}` : ''}`)
      } catch (err) {
        fail++
        console.log(`FAIL ${name}\n${String((err as Error).message).split('\n').slice(0, 30).join('\n')}`)
      }
    }
    console.log(fail ? `roundtrip: ${fail} failing` : 'roundtrip ok')
    process.exitCode = fail ? 1 : 0
  } else {
    console.log('usage: scripts/payload.sh run scripts/cms.ts seed|roundtrip')
  }
} finally {
  await payload.destroy()
}
