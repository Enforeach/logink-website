// Admin dashboard intro for non-coders (docs/cms/PLAN.md principle 6): how editing works + one click to every page.
const PAGES: [string, string][] = [
  ['Home', '/admin/globals/home-page'], ['Services hub', '/admin/globals/hub-page'], ['Service pages (7)', '/admin/collections/service-pages'],
  ['About', '/admin/globals/about-page'], ['Contact', '/admin/globals/contact-page'], ['Blog page', '/admin/globals/blog-page'],
  ['Portfolio page', '/admin/globals/portfolio-page'], ['Legal pages', '/admin/collections/legal-pages'], ['404 page', '/admin/globals/not-found-page'],
  ['Articles', '/admin/collections/posts'], ['Site settings', '/admin/globals/site-settings'], ['Labels & buttons', '/admin/globals/ui-labels'],
]

export function Welcome() {
  return (
    <div style={{ padding: '20px 24px', marginBottom: 24, borderRadius: 8, background: 'var(--theme-elevation-50)', lineHeight: 1.6 }}>
      <h2 style={{ margin: '0 0 8px' }}>Editing logink.co</h2>
      <ol style={{ margin: '0 0 16px', paddingLeft: 20 }}>
        <li>Every page of the site is below: open one and change the text. <b>Articles</b> are the blog posts.</li>
        <li>Switch <b>Bahasa Indonesia / English</b> with the locale picker at the top right. Each language is edited separately.</li>
        <li><b>Save draft</b> keeps your changes private. <b>Preview</b> shows the draft on the real page (only to you). <b>Publish</b> puts it live within a minute.</li>
        <li>An empty field shows the original text, so the page never breaks. <b>Versions</b> lets you restore any earlier version.</li>
        <li>Each page has an <b>SEO</b> tab: Google title, description, share image and a preview of the search result.</li>
      </ol>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {PAGES.map(([label, href]) => (
          <a key={href} href={href} style={{ padding: '6px 12px', borderRadius: 999, background: 'var(--theme-elevation-150)', color: 'var(--theme-text)', textDecoration: 'none', fontWeight: 600 }}>
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
