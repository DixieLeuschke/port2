# Design System — Obsidian Gilt

## Concept
Moderate luxury dark: layered blacks, single soft-gold accent, editorial whitespace. Brand-first hero; no card grids in the first viewport.

## Color tokens (`src/styles/tokens.css`)

| Token | Value | Role |
|-------|-------|------|
| `--canvas` | `#0A0A0B` | Page background |
| `--elevated` | `#121214` | Sticky header / bands |
| `--surface` | `#1A1A1C` | Contact strip |
| `--border-gold` | `rgba(201,162,39,0.22)` | Accent hairlines |
| `--border-smoke` | `rgba(255,255,255,0.06)` | Dividers |
| `--gold` | `#C9A227` | Primary CTA / focus |
| `--gold-hover` | `#E8C547` | Hover |
| `--text` | `#F4F0E6` | Brand + headings |
| `--text-secondary` | `#A8A29E` | Body |
| `--text-muted` | `#78716C` | Meta / footer |

## Typography
- **Satoshi** — display + body (Fontshare). Geometric, calm luxury without serif cliché.
- **JetBrains Mono** — year / role meta only.
- Scale via clamp; display brand uses `--text-brand`.

## Spacing & radius
- 8px rhythm (`--space-1` … `--space-10`)
- Section gap: `--section-gap` (clamp)
- Radius: `8px` only (`--radius`)

## Motion
- Ease: `cubic-bezier(0.22, 1, 0.36, 1)`
- Reveal: opacity + translateY via `.reveal` / IntersectionObserver
- Nav underline grow; CTA `scale(0.98)` on active
- Honors `prefers-reduced-motion`

## Imagery budget
Max **2** photos: hero full-bleed + one featured work still.

## Components
- `Header` — sticky, blur, ghost CTA
- `Hero` — brand-dominant, full-bleed image
- `Work` — editorial rows; one featured asymmetric row
- `Approach` — gold hairline + copy
- `Contact` — surface strip + mailto CTA
- `Footer` — minimal links
- `Reveal` — scroll entrance wrapper

Edit copy in `src/data/content.ts` (język: polski).
