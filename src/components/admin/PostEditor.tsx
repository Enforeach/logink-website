'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/Button'
import { slugify, calculateReadingTime } from '@/lib/utils'

interface Category { id: string; nameId: string }
interface PostEditorProps {
  post?: {
    id: string
    titleId: string
    titleEn?: string | null
    slug: string
    excerptId?: string | null
    bodyId: string
    featuredImage?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    status: string
    categoryId?: string | null
  } | null
}

const STATUSES = ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const isEdit = !!post

  const [titleId, setTitleId] = useState(post?.titleId || '')
  const [titleEn, setTitleEn] = useState(post?.titleEn || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [excerptId, setExcerptId] = useState(post?.excerptId || '')
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '')
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '')
  const [status, setStatus] = useState(post?.status || 'DRAFT')
  const [categoryId, setCategoryId] = useState(post?.categoryId || '')
  const [categories, setCategories] = useState<Category[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    if (!slugTouched && titleId) setSlug(slugify(titleId))
  }, [titleId, slugTouched])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write your post content here…' }),
    ],
    content: post?.bodyId || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[320px] focus:outline-none px-5 py-4 text-sm text-[var(--text-primary)]',
      },
    },
  })

  const handleSave = useCallback(async (overrideStatus?: string) => {
    if (!titleId.trim() || !slug.trim()) { setError('Title and slug are required'); return }
    setError('')
    setSaving(true)

    const body = {
      titleId: titleId.trim(),
      titleEn: titleEn.trim() || null,
      slug: slug.trim(),
      excerptId: excerptId.trim() || null,
      bodyId: editor?.getHTML() || '',
      featuredImage: featuredImage.trim() || null,
      metaTitle: metaTitle.trim() || null,
      metaDescription: metaDescription.trim() || null,
      status: overrideStatus || status,
      categoryId: categoryId || null,
      readingTime: calculateReadingTime(editor?.getText() || ''),
    }

    const url = isEdit ? `/api/posts/${post.id}` : '/api/posts'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); return }
      router.push('/admin/posts')
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }, [titleId, titleEn, slug, excerptId, featuredImage, metaTitle, metaDescription, status, categoryId, editor, isEdit, post, router])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{isEdit ? 'Edit Post' : 'New Post'}</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="ghost" onClick={() => router.push('/admin/posts')} size="sm">Cancel</Button>
          <Button variant="ghost" onClick={() => handleSave('DRAFT')} loading={saving} size="sm">Save Draft</Button>
          <Button onClick={() => handleSave('PUBLISHED')} loading={saving} size="sm">Publish</Button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Post title (Bahasa Indonesia)"
              value={titleId}
              onChange={e => setTitleId(e.target.value)}
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-lg font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none"
            />
            <input
              type="text"
              placeholder="Post title (English) — optional"
              value={titleEn}
              onChange={e => setTitleEn(e.target.value)}
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">URL Slug</label>
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3">
              <span className="text-xs text-[var(--text-muted)]">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={e => { setSlug(e.target.value); setSlugTouched(true) }}
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] focus:outline-none"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Excerpt</label>
            <textarea
              placeholder="Short description for blog listing…"
              value={excerptId}
              onChange={e => setExcerptId(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none resize-none"
            />
          </div>

          {/* Body Editor */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Content</label>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 rounded-t-xl border border-b-0 border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2">
              {[
                { label: 'B', action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
                { label: 'I', action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
                { label: 'H2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive('heading', { level: 2 }) },
                { label: 'H3', action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive('heading', { level: 3 }) },
                { label: 'UL', action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive('bulletList') },
                { label: 'OL', action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive('orderedList') },
                { label: '""', action: () => editor?.chain().focus().toggleBlockquote().run(), active: editor?.isActive('blockquote') },
                { label: '⎯', action: () => editor?.chain().focus().setHorizontalRule().run(), active: false },
              ].map(btn => (
                <button
                  key={btn.label}
                  type="button"
                  onMouseDown={e => { e.preventDefault(); btn.action() }}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors ${btn.active ? 'bg-brand-violet text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="rounded-b-xl border border-[var(--border-default)] bg-[var(--bg-surface)] min-h-[320px]">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Publish</h3>
            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none"
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <Button fullWidth onClick={() => handleSave()} loading={saving} size="sm">
              {isEdit ? 'Update Post' : 'Save Post'}
            </Button>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Category</h3>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none"
            >
              <option value="">No category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.nameId}</option>)}
            </select>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Featured Image</h3>
            <input
              type="text"
              placeholder="Image URL or /uploads/..."
              value={featuredImage}
              onChange={e => setFeaturedImage(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            {featuredImage && (
              <img src={featuredImage} alt="" className="w-full rounded-lg object-cover aspect-video" />
            )}
          </div>

          {/* SEO */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">SEO</h3>
            <input
              type="text"
              placeholder="Meta title"
              value={metaTitle}
              onChange={e => setMetaTitle(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            <textarea
              placeholder="Meta description"
              value={metaDescription}
              onChange={e => setMetaDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
