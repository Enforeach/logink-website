import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * Revalidate the given static paths after a mutation. Wired into content
 * collections so edits appear immediately instead of only after the ISR window
 * — repairing the thin/broken revalidation of the old CMS.
 *
 * `next/cache` is imported LAZILY inside the hook: this config is also loaded by
 * the Payload CLI (migrations / generate:types) in a plain Node context where
 * `next/cache` doesn't resolve. A static import would break every CLI command.
 * The second `_tags` param is kept for call-site compatibility (path-level
 * revalidation already covers every affected page).
 */
export function makeRevalidateHooks(paths: string[], _tags: string[] = []): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} {
  const run = async () => {
    try {
      const { revalidatePath } = await import('next/cache')
      for (const p of paths) revalidatePath(p)
    } catch {
      // revalidate throws outside a request scope (migration/seed/CLI) — ignore.
    }
  }
  return {
    afterChange: ({ doc }) => {
      void run()
      return doc
    },
    afterDelete: ({ doc }) => {
      void run()
      return doc
    },
  }
}
