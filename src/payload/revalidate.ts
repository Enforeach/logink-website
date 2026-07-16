import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

type Doc = Record<string, unknown>
type DynamicPaths = (doc: Doc, previousDoc?: Doc) => string[]

/**
 * Revalidate paths after a mutation so edits appear immediately instead of only
 * after the ISR window. `paths` are always revalidated (list/index pages);
 * `dynamicPaths` derives per-document paths (e.g. a post's own detail URL, and
 * its previous URL when the slug changed) so that unpublishing/deleting a doc or
 * renaming its slug purges the exact page — otherwise a drafted post lingers in
 * cache and stays publicly reachable until ISR expires.
 *
 * `next/cache` is imported LAZILY inside the hook: this config is also loaded by
 * the Payload CLI (migrations / generate:types) in a plain Node context where
 * `next/cache` doesn't resolve. A static import would break every CLI command.
 */
export function makeRevalidateHooks(paths: string[], dynamicPaths?: DynamicPaths): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} {
  const run = async (extra: string[] = []) => {
    try {
      const { revalidatePath } = await import('next/cache')
      const all = new Set([...paths, ...extra].filter(Boolean))
      for (const p of all) revalidatePath(p)
    } catch {
      // revalidate throws outside a request scope (migration/seed/CLI); ignore.
    }
  }
  return {
    afterChange: ({ doc, previousDoc }) => {
      void run(dynamicPaths ? dynamicPaths(doc as Doc, previousDoc as Doc | undefined) : [])
      return doc
    },
    afterDelete: ({ doc }) => {
      void run(dynamicPaths ? dynamicPaths(doc as Doc) : [])
      return doc
    },
  }
}
