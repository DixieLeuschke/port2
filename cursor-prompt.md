# Cursor prompt — luxury dark portfolio landing

Paste everything below the line into a new Cursor Agent chat (or `@cursor-prompt.md`).

---

Build a single-page portfolio / landing site in this empty workspace. Prefer a simple Vite + React + TypeScript stack with plain CSS (or CSS modules). No UI kit. Ship a polished first viewport and full page scroll. Desktop-first, responsive.

**Goal / vibe:** Restrained moderate luxury dark — layered blacks, soft gold/yellow accents, quiet gradients, editorial brand-first composition. Gallery calm, not a dashboard. Expensive and intentional.

## DESIGN SYSTEM (REQUIRED)

Use CSS variables. Exact tokens:

| Token | Hex / value | Role |
|-------|-------------|------|
| `--canvas` | `#0A0A0B` | Page background (never `#000`) |
| `--elevated` | `#121214` | Sticky header, subtle bands |
| `--surface` | `#1A1A1C` | Contact strip / featured row only when needed |
| `--border-gold` | `rgba(201, 162, 39, 0.22)` | Hairline gold rules |
| `--border-smoke` | `rgba(255, 255, 255, 0.06)` | Neutral dividers |
| `--gold` | `#C9A227` | Primary CTA, underlines, focus |
| `--gold-hover` | `#E8C547` | Hover / focus highlight (same family only) |
| `--text` | `#F4F0E6` | Brand + headlines |
| `--text-secondary` | `#A8A29E` | Body |
| `--text-muted` | `#78716C` | Meta, footer |

**Gradients (subtle only):**
1. Vertical: `--canvas` → `--elevated` behind hero
2. Soft radial gold wash: `--gold` at ~6% opacity near brand/CTA

No neon, no purple/indigo glow, no rainbow multi-stops.

**Typography:**
- Display / brand: load **Cabinet Grotesk** or **Satoshi** (600–700, tracking `-0.02em`)
- Body: same family, 400, line-height ~1.65, max-width ~65ch
- Meta (year/role): **Geist Mono** or **JetBrains Mono**, ~0.8125rem
- Ban: Inter, Georgia, Times, Garamond, system-ui as the hero face

**Components:**
- Primary button: `--gold` fill, `--canvas` text, 8px radius, no outer glow; active `scale(0.98)`
- Secondary: ghost, 1px `--gold` outline, `--text` label
- Prefer **no cards**. Use editorial rows, hairlines, whitespace. Never cards in the hero.
- Sticky header: `--elevated` + light backdrop blur

**Imagery (hard limit):**
- Max **2** photos total
- Image 1: elegant full-bleed / edge-to-edge hero atmosphere or portrait
- Image 2 (optional): one featured case still in Selected Work only
- No collage, no badges/chips/overlays on images, no stock clutter
- Use high-quality Unsplash/placeholder URLs with clear `alt` text, or local placeholders in `/public`

**Motion (restrained):**
- Soft fade / slide-up on section enter
- Gold underline grow on nav hover
- CTA press micro-scale
- No perpetual glow, particles, or noise overlays

## PAGE STRUCTURE

1. **Header** — Sticky; wordmark left (`--text`); 3–4 links (Work, Approach, About, Contact); far-right outline CTA “Start a project”
2. **Hero** — One composition: brand as strongest signal + one headline + one short supporting sentence + CTA group (primary + secondary). Dominant elegant photo as full-bleed/edge-to-edge plane; light canvas→transparent scrim for legibility only. No stats, promo chips, or cards on the image.
3. **Selected Work** — Title + one context line. 3–4 editorial rows (title, mono year/role, one-line outcome) separated by `--border-smoke`. Optional second photo in **one** featured asymmetric row (image left, text right on desktop). Other rows text-only.
4. **Approach / About** — Short craft paragraph; thin `--gold` hairline accent. No icon rows or pill clusters.
5. **Contact + Footer** — Narrow `--surface` strip with email + primary CTA; footer copyright + muted links. No social icon wall.

## ANTI-PATTERNS (must not ship)

- Purple / violet neon gradients
- Pure black `#000000`
- Inter as primary font
- More than two photographs
- Hero cards / inset media cards / floating image blocks
- Stat strips, pill clusters, badge overlays on media
- Glow-heavy “AI luxury” look

## ACCEPTANCE

- First viewport reads as one composition; brand survives the “remove the nav” test
- Tokens live in CSS variables; accent is one gold family only
- Lighthouse-friendly basics: semantic HTML, focus states, responsive layout
- `npm install && npm run dev` works from the repo root

Implement the full page now. Use plausible placeholder copy for a creative director / designer portfolio (English is fine unless Polish is already in the repo).
