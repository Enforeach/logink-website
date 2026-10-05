// Self-check for the body helpers in cta.ts: pnpm exec tsx src/lib/cta.check.ts
import assert from 'node:assert/strict'
import { demoteH1, splitAfterParagraphs, paragraphCount, extractSources, hasSourcesHeading } from './cta'

const html = '<p>a</p><ul><li><p>in list</p></li></ul><p>b</p><blockquote><p>q</p></blockquote><p>c</p>'
assert.equal(paragraphCount(html), 3)
assert.deepEqual(splitAfterParagraphs(html, [{ after: 2, item: 'X' }]), ['<p>a</p><ul><li><p>in list</p></li></ul><p>b</p>', 'X', '<blockquote><p>q</p></blockquote><p>c</p>'])
assert.deepEqual(splitAfterParagraphs(html, [{ after: 99, item: 'Z' }, { after: 1, item: 'Y' }]).filter((x) => x === 'Y' || x === 'Z'), ['Y', 'Z'])
assert.equal(splitAfterParagraphs(html, [{ after: 99, item: 'Z' }]).at(-1), 'Z')
// a Lexical body in one outer wrapper: its paragraphs are top level; two sibling divs are not unwrapped
const wrapped = '<div class="payload-richtext"><p>a</p><div><p>x</p></div><p>b</p><p>c</p></div>'
assert.equal(paragraphCount(wrapped), 3)
assert.deepEqual(splitAfterParagraphs(wrapped, [{ after: 1, item: 'W' }]), ['<p>a</p>', 'W', '<div><p>x</p></div><p>b</p><p>c</p>'])
assert.equal(paragraphCount('<div><p>a</p></div><div><p>b</p></div>'), 0)
assert.equal(demoteH1('<h1 class="x">T</h1><h2>u</h2>'), '<h2 class="x">T</h2><h2>u</h2>')
const src = extractSources('<a href="https://developers.google.com/x">Google docs</a> <a href="https://logink.co/a">own</a> <a href="https://developers.google.com/x">dup</a> <a href="https://www.rfc-editor.org/r">https://www.rfc-editor.org/r</a>')
assert.deepEqual(src.map((s) => [s.label, s.host]), [['Google docs', 'developers.google.com'], ['rfc-editor.org', 'rfc-editor.org']])
assert.ok(hasSourcesHeading('<h2 id="s">Sumber (Tier 1)</h2>'))

console.log('cta.check ok')
