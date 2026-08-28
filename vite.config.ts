import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ["**/bart.html"],
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
