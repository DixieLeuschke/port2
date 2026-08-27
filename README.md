# John Pavulon — portfolio landing

Single-page creative-direction portfolio (**Obsidian Gilt**). Built with Vite + React + TypeScript and plain CSS (modules + design tokens).

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

> pnpm is preferred by barth-web when available (`pnpm install` / `pnpm dev`). This environment used npm.

## Structure

```
src/
  components/     # Header, Hero, Work, Approach, Contact, Footer, Reveal
  data/content.ts # All placeholder copy + image URLs
  styles/         # tokens.css + global.css
PROJECT_BRIEF.md  # Discovery + concept decisions
DESIGN-SYSTEM.md  # Tokens and component notes
cursor-prompt.md  # Original Cursor implementation prompt
```

## Update content

Edit [`src/data/content.ts`](src/data/content.ts): brand name, hero copy, work items, email. Keep max **two** photographs.

## Deploy

Static SPA — recommend **Cloudflare Pages** or **Netlify** (simple static + preview deploys):

1. Push repo to GitHub
2. Connect project; build command `npm run build`; output `dist`
3. Add custom domain + SSL in the host panel

No env secrets required for the default mailto contact flow. If you later add Formspree/Resend, put keys in hosting env vars and document them in `.env.example`.

## SEO / domain ideas

- Meta title/description already in `index.html`
- Domain suggestions: `johnpavulon.studio`, `johnpavulon.com`, `pavulon.studio`
- Add a real OG image under `public/og.jpg` and wire `og:image` when you have brand photography

## Maintenance

- `npm outdated` periodically
- Replace Unsplash URLs with owned assets before production
- Confirm copy marked TODO in `content.ts` with the client
