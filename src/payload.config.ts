import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Industries } from './collections/Industries'
import { CaseStudies } from './collections/CaseStudies'
import { Testimonials } from './collections/Testimonials'
import { CtaWidgets } from './collections/CtaWidgets'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { ClientLogos } from './collections/ClientLogos'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · Logink CMS',
      robots: 'noindex, nofollow',
    },
  },
  editor: lexicalEditor(),
  collections: [
    Posts,
    Categories,
    Tags,
    CaseStudies,
    Industries,
    Services,
    Testimonials,
    CtaWidgets,
    ClientLogos,
    Media,
    ContactSubmissions,
    Users,
  ],
  globals: [SiteSettings],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Coexists with the existing Prisma tables (distinct lowercase table names).
    // Schema is applied via explicit migrations, never auto-push, to protect prod.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  secret: process.env.PAYLOAD_SECRET || process.env.AUTH_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  graphQL: { disable: true },
  sharp,
  plugins: [
    vercelBlobStorage({
      // Serve media directly from the Blob CDN (public marketing site) instead of
      // proxying through /api/media/file, so URLs don't depend on serverURL/deploy.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
