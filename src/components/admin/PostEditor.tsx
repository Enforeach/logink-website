'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/Button'
import { slugify, calculateReadingTime } from '@/lib/utils'
import { InternalLinkPicker } from './InternalLinkPicker'

interface Category { id: string; nameId: string }
interface Tag { id: string; name: string; slug: string }

interface PostEditorProps {
  post?: {
    id: string
    titleId: string
    titleEn?: string | null
    slug: string
    excerptId?: string | null
    excerptEn?: string | null
    bodyId: string
    featuredImage?: string | null
    featuredImageAlt?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
    focusKeyword?: string | null
    status: string
    categoryId?: string | null
    tags?: { tag: { id: string; name: string; slug: string } }[]
  } | null
}

const STATUSES = ['DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']

function SerpPreview({ title, slug, description }: { title: string; slug: string; description: string }) {
  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-white dark:bg-[#0F0A1E] p-3 text-xs mt-2">
      <div className="text-[#1a0dab] dark:text-blue-400 font-medium truncate">{title || 'Page Title'}</div>
      <div className="text-[#006621] dark:text-green-400 text-[11px] mt-0.5">logink.id › blog › {slug || 'post-slug'}</div>
      <div className="text-[#545454] dark:text-[var(--text-muted)] mt-0.5 leading-relaxed line-clamp-2">{description || 'Meta description will appear here…'}</div>
    </div>
  )
}

function ToolbarBtn({ label, active, onClick, title }: { label: string; active?: boolean; onClick: () => void; title?: string }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick() }}
      className={`px-2 py-1 rounded text-xs font-mono transition-colors ${active ? 'bg-brand-violet text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'}`}
    >
      {label}
    </button>
  )
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const isEdit = !!post

  const [titleId, setTitleId] = useState(post?.titleId || '')
  const [titleEn, setTitleEn] = useState(post?.titleEn || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [excerptId, setExcerptId] = useState(post?.excerptId || '')
  const [excerptEn, setExcerptEn] = useState(post?.excerptEn || '')
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '')
  const [featuredImageAlt, setFeaturedImageAlt] = useState(post?.featuredImageAlt || '')
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '')
  const [ogImage, setOgImage] = useState(post?.ogImage || '')
  const [focusKeyword, setFocusKeyword] = useState(post?.focusKeyword || '')
  const [status, setStatus] = useState(post?.status || 'DRAFT')
  const [categoryId, setCategoryId] = useState(post?.categoryId || '')
  const [categories, setCategories] = useState<Category[]>([])
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(post?.tags?.map(t => t.tag.id) || [])
  const [tagInput, setTagInput] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showInternalLinkPicker, setShowInternalLinkPicker] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [linkNofollow, setLinkNofollow] = useState(false)
  const [linkNewTab, setLinkNewTab] = useState(true)
  const [activePanel, setActivePanel] = useState<'publish' | 'seo' | 'featured' | 'tags'>('publish')

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
    fetch('/api/tags').then(r => r.json()).then(setAllTags).catch(() => {})
  }, [])

  useEffect(() => {
    if (!slugTouched && titleId) setSlug(slugify(titleId))
  }, [titleId, slugTouched])

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage,
      TiptapLink.configure({ openOnClick: false }),
      Underline,
      Placeholder.configure({ placeholder: 'Write your post content here…' }),
    ],
    content: post?.bodyId || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[420px] focus:outline-none px-5 py-4 text-sm text-[var(--text-primary)]',
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      const words = text.trim() ? text.trim().split(/\s+/).length : 0
      setWordCount(words)
      setReadingTime(Math.max(1, Math.ceil(words / 200)))
    },
  })

  // SEO checklist
  const bodyHtml = editor?.getHTML() || ''
  const bodyText = editor?.getText() || ''
  const kw = focusKeyword.toLowerCase().trim()
  const seoChecks = kw ? [
    { label: 'Keyword in title', pass: titleId.toLowerCase().includes(kw) },
    { label: 'Keyword in meta description', pass: metaDescription.toLowerCase().includes(kw) },
    { label: 'Keyword in first paragraph', pass: bodyText.slice(0, 400).toLowerCase().includes(kw) },
    { label: 'Keyword in an H2', pass: bodyHtml.toLowerCase().includes(`<h2`) && bodyHtml.toLowerCase().includes(kw) },
    { label: 'Meta title 50–60 chars', pass: metaTitle.length >= 50 && metaTitle.length <= 60 },
    { label: 'Meta description 150–155 chars', pass: metaDescription.length >= 150 && metaDescription.length <= 155 },
    { label: 'Post has at least 300 words', pass: wordCount >= 300 },
    { label: 'Slug contains keyword', pass: slug.toLowerCase().includes(kw.replace(/\s+/g, '-')) },
    { label: 'Featured image set', pass: !!featuredImage },
    { label: 'Featured image has alt text', pass: !!featuredImageAlt },
  ] : []
  const seoScore = seoChecks.length ? Math.round((seoChecks.filter(c => c.pass).length / seoChecks.length) * 100) : null

  const handleSave = useCallback(async (overrideStatus?: string) => {
    if (!titleId.trim() || !slug.trim()) { setError('Title and slug are required'); return }
    setError('')
    setSaving(true)

    const body = {
      titleId: titleId.trim(),
      titleEn: titleEn.trim() || null,
      slug: slug.trim(),
      excerptId: excerptId.trim() || null,
      excerptEn: excerptEn.trim() || null,
      bodyId: editor?.getHTML() || '',
      featuredImage: featuredImage.trim() || null,
      featuredImageAlt: featuredImageAlt.trim() || null,
      metaTitle: metaTitle.trim() || null,
      metaDescription: metaDescription.trim() || null,
      ogImage: ogImage.trim() || null,
      focusKeyword: focusKeyword.trim() || null,
      status: overrideStatus || status,
      categoryId: categoryId || null,
      readingTime,
      wordCount,
      tagIds: selectedTagIds,
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
  }, [titleId, titleEn, slug, excerptId, excerptEn, featuredImage, featuredImageAlt, metaTitle, metaDescription, ogImage, focusKeyword, status, categoryId, editor, isEdit, post, router, readingTime, wordCount, selectedTagIds])

  const insertLink = () => {
    if (!linkUrl) return
    editor?.chain().focus().extendMarkRange('link').setLink({
      href: linkUrl,
      target: linkNewTab ? '_blank' : null,
      rel: [linkNofollow ? 'nofollow' : '', linkNewTab ? 'noopener noreferrer' : ''].filter(Boolean).join(' ') || null,
    }).run()
    if (linkText) editor?.chain().focus().insertContent(linkText).run()
    setShowLinkModal(false)
    setLinkUrl(''); setLinkText(''); setLinkNofollow(false); setLinkNewTab(true)
  }

  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev => prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId])
  }

  const filteredTags = allTags.filter(t => t.name.toLowerCase().includes(tagInput.toLowerCase()))

  const inputCls = 'w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none'

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button onClick={() => router.push('/admin/posts')} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1">
          ← Back to Posts
        </button>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => handleSave('DRAFT')} loading={saving} size="sm">Save Draft</Button>
          <Button onClick={() => handleSave('PUBLISHED')} loading={saving} size="sm">Publish</Button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main editor */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Post title (Bahasa Indonesia)"
            value={titleId}
            onChange={e => setTitleId(e.target.value)}
            className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-2xl font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none"
          />
          <input
            type="text"
            placeholder="Post title (English) — optional"
            value={titleEn}
            onChange={e => setTitleEn(e.target.value)}
            className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none"
          />

          {/* Slug */}
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-2.5">
            <span className="text-xs text-[var(--text-muted)] shrink-0">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={e => { setSlug(e.target.value); setSlugTouched(true) }}
              className="flex-1 bg-transparent text-sm text-[var(--text-primary)] focus:outline-none"
            />
          </div>

          {/* Excerpt */}
          <textarea
            placeholder="Short excerpt (Bahasa Indonesia)…"
            value={excerptId}
            onChange={e => setExcerptId(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none resize-none"
          />

          {/* Editor */}
          <div>
            {/* Toolbar Row 1 */}
            <div className="flex flex-wrap gap-1 rounded-t-xl border border-b-0 border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2">
              <ToolbarBtn label="B" title="Bold (Ctrl+B)" active={editor?.isActive('bold')} onClick={() => editor?.chain().focus().toggleBold().run()} />
              <ToolbarBtn label="I" title="Italic (Ctrl+I)" active={editor?.isActive('italic')} onClick={() => editor?.chain().focus().toggleItalic().run()} />
              <ToolbarBtn label="U" title="Underline (Ctrl+U)" active={editor?.isActive('underline')} onClick={() => editor?.chain().focus().toggleUnderline().run()} />
              <ToolbarBtn label="S" title="Strikethrough" active={editor?.isActive('strike')} onClick={() => editor?.chain().focus().toggleStrike().run()} />
              <span className="w-px h-6 bg-[var(--border-default)] mx-1 self-center" />
              <ToolbarBtn label="H2" active={editor?.isActive('heading', { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} />
              <ToolbarBtn label="H3" active={editor?.isActive('heading', { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} />
              <ToolbarBtn label="H4" active={editor?.isActive('heading', { level: 4 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()} />
              <span className="w-px h-6 bg-[var(--border-default)] mx-1 self-center" />
              <ToolbarBtn label="UL" active={editor?.isActive('bulletList')} onClick={() => editor?.chain().focus().toggleBulletList().run()} />
              <ToolbarBtn label="OL" active={editor?.isActive('orderedList')} onClick={() => editor?.chain().focus().toggleOrderedList().run()} />
              <span className="w-px h-6 bg-[var(--border-default)] mx-1 self-center" />
              <ToolbarBtn label='""' title="Blockquote" active={editor?.isActive('blockquote')} onClick={() => editor?.chain().focus().toggleBlockquote().run()} />
              <ToolbarBtn label="</>" title="Code block" active={editor?.isActive('codeBlock')} onClick={() => editor?.chain().focus().toggleCodeBlock().run()} />
              <span className="w-px h-6 bg-[var(--border-default)] mx-1 self-center" />
              <ToolbarBtn label="⎯" title="Horizontal rule" active={false} onClick={() => editor?.chain().focus().setHorizontalRule().run()} />
              <ToolbarBtn label="↩" title="Undo" active={false} onClick={() => editor?.chain().focus().undo().run()} />
              <ToolbarBtn label="↪" title="Redo" active={false} onClick={() => editor?.chain().focus().redo().run()} />
            </div>

            {/* Toolbar Row 2 */}
            <div className="flex flex-wrap gap-1 border border-b-0 border-[var(--border-default)] border-t-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5">
              <button
                type="button"
                onMouseDown={e => { e.preventDefault(); setShowLinkModal(true) }}
                className="px-2 py-1 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
                title="Insert link"
              >
                🔗 Link
              </button>
              <button
                type="button"
                onMouseDown={e => { e.preventDefault(); setShowInternalLinkPicker(true) }}
                className="px-2 py-1 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
                title="Insert internal link"
              >
                🔎 Internal
              </button>
              <button
                type="button"
                onMouseDown={e => {
                  e.preventDefault()
                  const url = prompt('Image URL:')
                  if (url) editor?.chain().focus().setImage({ src: url }).run()
                }}
                className="px-2 py-1 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
                title="Insert image"
              >
                🖼 Image
              </button>
            </div>

            <div className="rounded-b-xl border border-[var(--border-default)] bg-[var(--bg-surface)] min-h-[420px]">
              <EditorContent editor={editor} />
            </div>

            {/* Word count bar */}
            <div className="flex items-center gap-4 px-3 py-2 text-xs text-[var(--text-muted)] border border-t-0 border-[var(--border-default)] rounded-b-none rounded-b-xl bg-[var(--bg-elevated)]">
              <span>Words: <strong className="text-[var(--text-primary)]">{wordCount.toLocaleString()}</strong></span>
              <span>Reading time: <strong className="text-[var(--text-primary)]">~{readingTime} min</strong></span>
              {seoScore !== null && (
                <span>SEO: <strong className={seoScore >= 80 ? 'text-green-400' : seoScore >= 50 ? 'text-amber-400' : 'text-red-400'}>
                  {seoScore >= 80 ? 'Good' : seoScore >= 50 ? 'Needs improvement' : 'Poor'} ({seoScore}%)
                </strong></span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Panel tabs */}
          <div className="flex rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
            {(['publish', 'seo', 'featured', 'tags'] as const).map(p => (
              <button
                key={p}
                onClick={() => setActivePanel(p)}
                className={`flex-1 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${activePanel === p ? 'bg-brand-violet/10 text-brand-violet' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Publish panel */}
          {activePanel === 'publish' && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Publish</h3>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className={inputCls}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Category</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className={inputCls}>
                  <option value="">No category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.nameId}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Excerpt (English, optional)</label>
                <textarea value={excerptEn} onChange={e => setExcerptEn(e.target.value)} rows={2} placeholder="English excerpt…" className={inputCls + ' resize-none'} />
              </div>
              <Button fullWidth onClick={() => handleSave()} loading={saving} size="sm">
                {isEdit ? 'Update Post' : 'Save Post'}
              </Button>
            </div>
          )}

          {/* SEO panel */}
          {activePanel === 'seo' && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">SEO</h3>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Focus Keyword</label>
                <input type="text" placeholder="e.g. SEO Jakarta" value={focusKeyword} onChange={e => setFocusKeyword(e.target.value)} className={inputCls} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[var(--text-secondary)]">Meta Title</label>
                  <span className={`text-[10px] ${metaTitle.length > 60 ? 'text-red-400' : metaTitle.length >= 50 ? 'text-green-400' : 'text-[var(--text-muted)]'}`}>
                    {metaTitle.length}/60
                  </span>
                </div>
                <input type="text" placeholder="Meta title (50-60 chars)" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className={inputCls} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[var(--text-secondary)]">Meta Description</label>
                  <span className={`text-[10px] ${metaDescription.length > 155 ? 'text-red-400' : metaDescription.length >= 150 ? 'text-green-400' : 'text-[var(--text-muted)]'}`}>
                    {metaDescription.length}/155
                  </span>
                </div>
                <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows={3} placeholder="Meta description (150-155 chars)" className={inputCls + ' resize-none'} />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">OG Image URL (optional)</label>
                <input type="text" placeholder="/uploads/blog/og.webp" value={ogImage} onChange={e => setOgImage(e.target.value)} className={inputCls} />
              </div>

              {/* SERP preview */}
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">SERP Preview</label>
                <SerpPreview
                  title={metaTitle || titleId}
                  slug={slug}
                  description={metaDescription || excerptId}
                />
              </div>

              {/* SEO checklist */}
              {seoChecks.length > 0 && (
                <div>
                  <label className="text-xs text-[var(--text-secondary)] mb-2 block">SEO Checklist</label>
                  <div className="space-y-1">
                    {seoChecks.map(check => (
                      <div key={check.label} className="flex items-center gap-2 text-xs">
                        <span className={check.pass ? 'text-green-400' : 'text-red-400'}>{check.pass ? '✓' : '✗'}</span>
                        <span className={check.pass ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}>{check.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Featured image panel */}
          {activePanel === 'featured' && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Featured Image</h3>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Image URL or /uploads/…</label>
                <input type="text" placeholder="/uploads/blog/hero.webp" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} className={inputCls} />
              </div>
              {featuredImage && <img src={featuredImage} alt="" className="w-full rounded-lg object-cover aspect-video" />}
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Alt Text <span className="text-red-400">*</span></label>
                <input type="text" placeholder="Describe the image for SEO…" value={featuredImageAlt} onChange={e => setFeaturedImageAlt(e.target.value)} className={inputCls} />
                {featuredImage && !featuredImageAlt && (
                  <p className="text-[10px] text-amber-400 mt-1">⚠ Alt text is required for SEO</p>
                )}
              </div>
            </div>
          )}

          {/* Tags panel */}
          {activePanel === 'tags' && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Tags</h3>
              <input
                type="text"
                placeholder="Search tags…"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                className={inputCls}
              />
              {selectedTagIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedTagIds.map(id => {
                    const tag = allTags.find(t => t.id === id)
                    return tag ? (
                      <span key={id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-brand-violet/10 text-brand-violet border border-brand-violet/20">
                        #{tag.name}
                        <button onClick={() => toggleTag(id)} className="hover:text-white">✕</button>
                      </span>
                    ) : null
                  })}
                </div>
              )}
              <div className="max-h-40 overflow-y-auto space-y-0.5">
                {filteredTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${selectedTagIds.includes(tag.id) ? 'bg-brand-violet/10 text-brand-violet' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'}`}
                  >
                    #{tag.name}
                  </button>
                ))}
                {filteredTags.length === 0 && <p className="text-xs text-[var(--text-muted)] py-2 text-center">No tags found.</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Link modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowLinkModal(false)}>
          <div className="w-full max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Insert Link</h3>
              <button onClick={() => setShowLinkModal(false)} className="text-[var(--text-muted)] text-lg">✕</button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="URL (https://...)" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} className={inputCls} />
              <input type="text" placeholder="Link text (optional)" value={linkText} onChange={e => setLinkText(e.target.value)} className={inputCls} />
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
                  <input type="checkbox" checked={linkNewTab} onChange={e => setLinkNewTab(e.target.checked)} />
                  Open in new tab
                </label>
                <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
                  <input type="checkbox" checked={linkNofollow} onChange={e => setLinkNofollow(e.target.checked)} />
                  nofollow (outbound/untrusted links)
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <Button variant="ghost" onClick={() => setShowLinkModal(false)} size="sm">Cancel</Button>
                <Button onClick={insertLink} size="sm">Insert</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internal link picker */}
      {showInternalLinkPicker && (
        <InternalLinkPicker
          onInsert={(url, text) => {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            editor?.chain().focus().insertContent(text).run()
            setShowInternalLinkPicker(false)
          }}
          onClose={() => setShowInternalLinkPicker(false)}
        />
      )}
    </div>
  )
}
