import "dotenv/config"
import express from "express"
import session from "express-session"
import multer from "multer"
import path from "node:path"
import fs from "node:fs"
import { authStatus, requireAuth } from "./auth.ts"
import {
  createProject,
  deleteProject,
  findProject,
  flattenProjects,
  readProjects,
  saveProjectHtml,
  updateProject,
} from "./projectsStore.ts"
import { DIST_DIR, PUBLIC_DIR, ROOT_DIR } from "./paths.ts"
import {
  injectEmbedAssets,
  isValidCategory,
  parseDeliverables,
  sanitizeSlug,
} from "./utils.ts"
import type { ProjectInput } from "../shared/project.ts"

const app = express()
const PORT = Number(process.env.PORT ?? 3001)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme"
const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-me"
const isProd = process.env.NODE_ENV === "production"

const loginAttempts = new Map<string, { count: number; resetAt: number }>()
const MAX_LOGIN_ATTEMPTS = 8
const LOGIN_WINDOW_MS = 15 * 60 * 1000

app.set("trust proxy", 1)
app.use(express.json({ limit: "256kb" }))

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
)

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    const ok =
      file.mimetype === "text/html" ||
      file.originalname.toLowerCase().endsWith(".html")
    if (ok) {
      cb(null, true)
      return
    }
    cb(new Error("Dozwolone są tylko pliki .html"))
  },
})

function clientKey(req: express.Request) {
  return req.ip ?? "unknown"
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const entry = loginAttempts.get(key)
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_LOGIN_ATTEMPTS) {
    return false
  }
  entry.count += 1
  return true
}

function parseProjectBody(body: Record<string, unknown>): ProjectInput {
  const slug = sanitizeSlug(String(body.slug ?? ""))
  if (!slug) {
    throw new Error("Nieprawidłowy slug.")
  }

  const category = String(body.category ?? "")
  if (!isValidCategory(category)) {
    throw new Error("Nieprawidłowa kategoria.")
  }

  const title = String(body.title ?? "").trim()
  const previewUrl = String(body.previewUrl ?? "").trim()
  const year = String(body.year ?? "").trim()
  const role = String(body.role ?? "").trim()
  const outcome = String(body.outcome ?? "").trim()
  const summary = String(body.summary ?? "").trim()

  if (!title || !previewUrl || !year || !role || !outcome || !summary) {
    throw new Error("Uzupełnij wszystkie wymagane pola.")
  }

  return {
    category,
    slug,
    previewUrl,
    title,
    year,
    role,
    outcome,
    summary,
    deliverables: parseDeliverables(body.deliverables),
    isPlaceholder: body.isPlaceholder !== false,
  }
}

app.get("/api/auth/status", authStatus)

app.post("/api/auth/login", (req, res) => {
  const key = clientKey(req)
  if (!checkRateLimit(key)) {
    res.status(429).json({ error: "Zbyt wiele prób logowania. Spróbuj później." })
    return
  }

  const password = String(req.body?.password ?? "")
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Nieprawidłowe hasło." })
    return
  }

  req.session.isAdmin = true
  res.json({ ok: true })
})

app.post("/api/auth/logout", requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true })
  })
})

app.get("/api/projects", async (_req, res) => {
  try {
    const data = await readProjects()
    res.json(data)
  } catch {
    res.status(500).json({ error: "Nie udało się odczytać projektów." })
  }
})

function paramString(value: string | string[]): string {
  return Array.isArray(value) ? (value[0] ?? "") : value
}

app.get("/api/projects/:slug", async (req, res) => {
  try {
    const data = await readProjects()
    const item = findProject(data, paramString(req.params.slug))
    if (!item) {
      res.status(404).json({ error: "Projekt nie istnieje." })
      return
    }
    res.json(item)
  } catch {
    res.status(500).json({ error: "Nie udało się odczytać projektu." })
  }
})

app.post("/api/projects", requireAuth, upload.single("html"), async (req, res) => {
  try {
    const input = parseProjectBody(req.body as Record<string, unknown>)

    if (!req.file) {
      res.status(400).json({ error: "Dołącz plik HTML demo." })
      return
    }

    const html = injectEmbedAssets(req.file.buffer.toString("utf8"))
    await saveProjectHtml(input.slug, html)
    const item = await createProject(input)
    res.status(201).json(item)
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Nie udało się utworzyć projektu.",
    })
  }
})

app.put("/api/projects/:slug", requireAuth, upload.single("html"), async (req, res) => {
  try {
    const slug = paramString(req.params.slug)
    const input = parseProjectBody(req.body as Record<string, unknown>)
    const data = await readProjects()
    if (!findProject(data, slug)) {
      res.status(404).json({ error: "Projekt nie istnieje." })
      return
    }

    if (req.file) {
      const html = injectEmbedAssets(req.file.buffer.toString("utf8"))
      await saveProjectHtml(input.slug, html)
    }

    const item = await updateProject(slug, input)
    res.json(item)
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Nie udało się zaktualizować projektu.",
    })
  }
})

app.delete("/api/projects/:slug", requireAuth, async (req, res) => {
  try {
    await deleteProject(paramString(req.params.slug), true)
    res.json({ ok: true })
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : "Nie udało się usunąć projektu.",
    })
  }
})

app.post("/api/upload", requireAuth, upload.single("html"), async (req, res) => {
  try {
    const slug = sanitizeSlug(String(req.body?.slug ?? ""))
    if (!slug) {
      res.status(400).json({ error: "Nieprawidłowy slug." })
      return
    }
    if (!req.file) {
      res.status(400).json({ error: "Brak pliku HTML." })
      return
    }

    const html = injectEmbedAssets(req.file.buffer.toString("utf8"))
    await saveProjectHtml(slug, html)
    res.json({ ok: true, demoSrc: `/work/${slug}.html` })
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Upload nie powiódł się.",
    })
  }
})

app.get("/api/health", async (_req, res) => {
  try {
    const data = await readProjects()
    res.json({ ok: true, projects: flattenProjects(data).length })
  } catch {
    res.status(500).json({ ok: false })
  }
})

app.use("/work", express.static(path.join(PUBLIC_DIR, "work")))
app.use(express.static(PUBLIC_DIR))

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))

  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(DIST_DIR, "index.html"))
  })
}

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: "Plik jest zbyt duży (max 2 MB)." })
      return
    }
    res.status(500).json({ error: err.message || "Błąd serwera." })
  },
)

app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}`)
  console.log(`Root: ${ROOT_DIR}`)
})
