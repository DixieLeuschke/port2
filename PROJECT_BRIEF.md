# PROJECT BRIEF — Luxury dark portfolio landing

## Discovery (z `cursor-prompt.md` — bez dodatkowych pytań)

| Pole | Decyzja |
|------|--------|
| Typ | Portfolio kreatywne + landing usługowy (creative director / designer) |
| Target | Potencjalni klienci B2B / brand leads szukający kierunku i craftu |
| Cel konwersji | Kontakt / „Start a project” |
| Treść | Statyczna (bez CMS) |
| Brand | **John Pavulon** — creative direction & brand systems |
| Język UI | **Polski** |
| Materiały | Brak logo/guidelines — identyfikacja z promptu (layered black + gold) |

## Koncepcja: **Obsidian Gilt**

Restrained gallery luxury: wielopoziomowa czerń jak obsidian, złoto tylko jako hairline i CTA — nigdy neon. Kompozycja editorial, brand-first, maks. dwa obrazy. Rytm: dużo powietrza, asymetria w work row, nie siatka kart.

**Paleta:** Canvas `#0A0A0B`, Elevated `#121214`, Surface `#1A1A1C`, Gold `#C9A227` / Hover `#E8C547`, Ivory `#F4F0E6`, Mist `#A8A29E`, Ash `#78716C`.

**Typografia:** Satoshi (display + body) — geometryczna, spokojna, premium bez serifowego „luxury cliché”. JetBrains Mono dla meta (rok/rola).

**Stack:** Vite + React + TypeScript + plain CSS modules/tokens — zgodne z `cursor-prompt.md`; lekki SPA bez CMS, fokus na craft UI i motion CSS.

## IA / mapa sekcji (editorial compact)

1. **Header** — sticky nav + mobile drawer
2. **Hero** — brand-first, ~56svh, 1 zdjęcie tła
3. **Wybrane prace** — editorial index z numerami 01–03, etykieta „Przykład”
4. **Podejście** — 3 kroki: Pozycjonowanie → System → Powierzchnie
5. **O mnie** — 2 kolumny, copy 1. osoby + meta strip
6. **Kontakt + Footer** — jeden intent CTA: „Rozpocznij projekt”

**CTA hierarchy:** Primary = „Rozpocznij projekt” (header, hero, contact); Secondary = „Zobacz prace” (hero only).

## Hero — wybór wariantu (A/B)

- **A (wdrażany):** Full-bleed atmosphere photo, brand + copy left, soft scrim — zgodne z cursor-prompt.
- **B (odłożony):** Typographic-first, image only in lower third strip — dostępny jeśli A okaże się zbyt „photo-heavy”.

## Anti-generic signature

Hairline gold rules + editorial work list (nie masonry) + Satoshi tracking-tight brand mark jako dominant first-viewport signal.
