import type { Access } from 'payload'

/** Any authenticated admin user may write. Lean model, no role matrix. */
export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

/** Public may read published docs; authed users see everything. */
export const publishedOrAuthed: Access = ({ req }) => {
  if (req.user) return true
  return {
    status: { equals: 'PUBLISHED' },
  }
}

/** Fully public read (e.g. media, taxonomy). */
export const anyone: Access = () => true
