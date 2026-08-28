import type { WorkCategory } from "../shared/project.ts"

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function sanitizeSlug(raw: string): string | null {
  const slug = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return SLUG_PATTERN.test(slug) ? slug : null
}

export function demoPathsForSlug(slug: string) {
  const demoSrc = `/work/${slug}.html`
  return {
    demoSrc,
    previewSrc: `${demoSrc}?embed=1`,
    href: `/prace/${slug}`,
  }
}

const EMBED_SNIPPET = `<link rel="stylesheet" href="/work/embed.css" />
<script>
  if (location.search.includes("embed")) {
    document.documentElement.classList.add("is-embed");
  }
</script>`

export function injectEmbedAssets(html: string): string {
  if (html.includes("/work/embed.css")) {
    return html
  }

  const lower = html.toLowerCase()
  const bodyClose = lower.lastIndexOf("</body>")
  if (bodyClose === -1) {
    return `${html}\n${EMBED_SNIPPET}`
  }

  return `${html.slice(0, bodyClose)}${EMBED_SNIPPET}\n${html.slice(bodyClose)}`
}

export function isValidCategory(value: string): value is WorkCategory {
  return value === "mobile" || value === "landing" || value === "ai"
}

export function parseDeliverables(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map(String).map((s) => s.trim()).filter(Boolean)
  }
  if (typeof raw === "string") {
    return raw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}
