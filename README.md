# John Pavulon — portfolio landing

Single-page creative-direction portfolio (**Obsidian Gilt**). Vite + React + TypeScript, Express API, panel admina projektów.

## Run locally

```bash
npm install
cp .env.example .env   # ustaw ADMIN_PASSWORD
npm run dev
```

`npm run dev` uruchamia jednocześnie:
- **Vite** (frontend) — domyślnie `http://localhost:5173`
- **Express API** — port `3001`, proxy `/api` i `/work` z Vite

Tylko backend (np. test API):

```bash
npm run dev:server
```

Build + produkcja lokalna:

```bash
npm run build
npm run start
```

Serwer produkcyjny serwuje `dist/`, `public/work/` oraz API pod `/api/*`.

## Panel admina

- URL: `/admin` (niewidoczny w publicznej nawigacji)
- Logowanie hasłem z `.env` → `ADMIN_PASSWORD`
- CRUD projektów + upload pliku `.html` (max 2 MB)
- Po zapisie HTML trafia do `public/work/{slug}.html`, metadane do `data/projects.json`

## Struktura

```
src/
  components/       # Header, Hero, Work, WorkCard, WorkPreview…
  pages/admin/      # Panel admina
  api/              # fetch wrappery API
  data/content.ts   # Statyczne copy (hero, nav, about…)
  hooks/            # useProjects, useProject, useAuth
server/             # Express: auth, CRUD, upload
data/projects.json  # Metadane projektów (źródło prawdy)
public/work/        # Pliki HTML demo + embed.css
shared/project.ts   # Wspólne typy frontend + backend
```

## Aktualizacja treści

- **Projekty / case studies** — panel `/admin` lub edycja `data/projects.json`
- **Copy strony** — [`src/data/content.ts`](src/data/content.ts): brand, hero, nav, about, contact

## Deploy na VPS

Wymagania: **Node 20+**, nginx (reverse proxy), opcjonalnie PM2 + Certbot (HTTPS).

1. Sklonuj repo na serwer
2. `npm install && npm run build`
3. Skopiuj `.env.example` → `.env` i ustaw:
   - `ADMIN_PASSWORD` — silne hasło panelu
   - `SESSION_SECRET` — losowy ciąg (min. 32 znaki)
   - `NODE_ENV=production`
   - `PORT=3001` (lub inny wewnętrzny port)
4. Uruchom: `npm run start` lub PM2:

```bash
pm2 start npm --name john-pavulon -- start
pm2 save
```

5. **nginx** — proxy na Node:

```nginx
server {
    listen 80;
    server_name twoja-domena.pl;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

6. HTTPS: `certbot --nginx -d twoja-domena.pl`

Pliki do backupu: `data/projects.json`, `public/work/*.html`, `.env`.

## SEO / domain

- Meta title/description w `index.html`
- Dodaj `public/og.jpg` i `og:image` gdy masz fotografię marki

## Maintenance

- `npm outdated` okresowo
- Zamień placeholder copy w `content.ts` przed produkcją
- Lighthouse / QA po wdrożeniu na VPS
