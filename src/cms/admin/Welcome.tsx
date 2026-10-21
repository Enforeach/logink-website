// Admin dashboard intro for non-coders (docs/cms/PLAN.md principle 6).
export function Welcome() {
  return (
    <div style={{ padding: '20px 24px', marginBottom: 24, borderRadius: 8, background: 'var(--theme-elevation-50)', lineHeight: 1.6 }}>
      <h2 style={{ margin: '0 0 8px' }}>Editing logink.co</h2>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        <li><b>Pages</b>, <b>Services</b> and <b>Legal</b> hold every page of the site; <b>Blog</b> holds the articles.</li>
        <li>Switch <b>Bahasa Indonesia / English</b> with the locale picker at the top of a document. Each language is edited separately.</li>
        <li><b>Save draft</b> keeps your changes private. <b>Preview</b> shows the draft on the real page (only to you). <b>Publish</b> puts it live within a minute.</li>
        <li>An empty field shows the original text, so the page never breaks. <b>Versions</b> lets you restore any earlier version.</li>
        <li>Each page has an <b>SEO</b> tab: Google title, description, share image and a preview of the search result.</li>
      </ol>
    </div>
  )
}
