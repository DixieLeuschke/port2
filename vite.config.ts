import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** Root HTML mocks (bart.html, m3.html, …) — Windows EBUSY if Vite watches them. */
const rootHtmlWatchIgnores = readdirSync(projectRoot)
  .filter((name) => name.endsWith(".html") && name !== "index.html")
  .map((name) => join(projectRoot, name))

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: rootHtmlWatchIgnores,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/work": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
})
