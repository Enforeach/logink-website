
You are part of a team rebuilding the public frontend of logink.co in its repo /Users/mm/logink/logink_website/logink-website (Next.js 16.2.6 App Router, React 19.2, Payload CMS 3.85 at /admin, Tailwind 3.4; pnpm). Branch redesign/sehari-semalam is checked out. Do NOT switch branches, commit, push or deploy. The owner said: build locally, no approvals needed. Make sensible calls yourself using the documented defaults and record them.
Next 16 differs from your training data: check node_modules/next/dist/docs before using an unfamiliar API (see /Users/mm/logink/logink_website/logink-website/AGENTS.md).

SOURCES OF TRUTH, in precedence order:
1. /Users/mm/logink/logink_website/logink-website/docs/redesign/build/11-positioning-360.md: the owner's latest amendment. 360° = every digital channel run as one connected campaign. Logink sells TWO modes: individual services and 360° campaigns. Its 'For build agents' checklist is binding.
2. /Users/mm/logink/logink_website/logink-website/docs/redesign/BUILD.md and every part in /Users/mm/logink/logink_website/logink-website/docs/redesign/build/ (architecture, components, content, assets, work breakdown with file ownership, gates/budgets, owner defaults, critic resolutions, foundation status, motion mounting).
3. /Users/mm/logink/logink_website/logink-website/DESIGN.md (v2 guideline).
4. docs/redesign/direction-final.md (copy of the direction; reference only).
Read 1–3 before writing code. The foundation (layouts, tokens, fonts, registry src/lib/services.ts, seo, chrome, primitives, motion system, /kit page) already exists: USE it, don't re-create it. If you need a change in a foundation file you don't own, make the smallest change and list it in your return.

HARD RULES
- Every existing public URL keeps working (same path, same ID/EN pair).
- SSR-complete content: no text at opacity 0 at rest; FAQ answers mounted; real numbers; exactly one visible keyword H1 per page, matching the registry string.
- Phones download 0 KB of motion JS. WhatsApp #25D366 is always reachable, with per-page prefill.
- No fabricated clients, testimonials, logos, team facts, prices or results. Proof slots collapse to offer facts or 'Cara kami mengukur' when data is missing.
- Mocks are labelled 'Ilustrasi · data contoh' with data-nosnippet on an inner div; mock buttons are spans.
- Logo.tsx is never edited and --font-sans is never defined. /admin keeps working.
- Copy: Indonesian on ID routes, English on EN routes, never mixed. Reuse the vetted copy in the per-service content files. Write the new copy the amendment specifies. No em dashes in body copy (datelines are the one exception).
- Imagery is ALREADY installed: use src/lib/assets.ts (media(), mediaFile(), SVC_STILL; data in src/content/media.json, files in public/media/*), which carries captions and ID/EN alt. Never copy assets. Every generated photo/film shows its honesty caption. Never draw code-generated fakes of photos or film.

WORKING RULES
- A shared 'next dev' runs on http://localhost:3000 (log /tmp/logink-dev.log). Don't start another dev server and don't run 'next build' unless your task says so. If :3000 fails twice 10 s apart and 'lsof -i :3000 -sTCP:LISTEN' is empty, restart it: cd /Users/mm/logink/logink_website/logink-website && nohup pnpm dev > /tmp/logink-dev.log 2>&1 &
- Other agents edit other files at the same time. Own only the files your work package names. When type-checking (pnpm exec tsc --noEmit -p . 2>&1 | grep -E '<your paths>'), fix only your errors.
- BROWSERS CANNOT LAUNCH in this session (Chromium/WebKit fail with a Mach bootstrap error because the Claude Code process lost its GUI session). Do NOT try Playwright or the mcp__playwright__ tools; visual QA happens later. Verify with: curl each URL (200), and a small Node script that fetches the HTML and checks exactly one <h1> whose text equals the registry string, the key section texts present in the SSR HTML, no inline opacity:0 or visibility:hidden on text, the JSON-LD parses, and links resolve (200/308). Also run pnpm exec tsc --noEmit filtered to your files, and eslint on your files.
- WRITE IN CHUNKS: the harness kills any agent that produces no output for 3 minutes, and a single huge Write/Edit counts as silence. Keep every tool call under about 10 KB / 250 lines. Split big components into several files, or append with further Edit calls.
- No single shell command may run longer than about 2.5 minutes.
