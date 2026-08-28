import fs from "node:fs/promises"
import path from "node:path"
import {
  getFrameForCategory,
  WORK_CATEGORIES,
  WORK_ROW_META,
  type ProjectInput,
  type ProjectsData,
  type WorkItem,
  type WorkRow,
} from "../shared/project.ts"
import { PROJECTS_FILE, WORK_DIR } from "./paths.ts"
import { demoPathsForSlug } from "./utils.ts"

function buildItem(input: ProjectInput, index: string): WorkItem {
  const frame = getFrameForCategory(input.category)
  const paths = demoPathsForSlug(input.slug)

  return {
    index,
    category: input.category,
    slug: input.slug,
    href: paths.href,
    previewUrl: input.previewUrl,
    previewSrc: paths.previewSrc,
    demoSrc: paths.demoSrc,
    frameWidth: frame.frameWidth,
    frameHeight: frame.frameHeight,
    title: input.title,
    year: input.year,
    role: input.role,
    outcome: input.outcome,
    summary: input.summary,
    deliverables: input.deliverables,
    isPlaceholder: input.isPlaceholder ?? false,
  }
}

function reindexRows(rows: WorkRow[]): WorkRow[] {
  let counter = 1

  return rows.map((row) => ({
    ...row,
    items: row.items.map((item) => ({
      ...item,
      index: String(counter++).padStart(2, "0"),
    })),
  }))
}

function emptyRows(): WorkRow[] {
  return WORK_CATEGORIES.map((id) => ({
    id,
    label: WORK_ROW_META[id].label,
    lede: WORK_ROW_META[id].lede,
    items: [],
  }))
}

export async function readProjects(): Promise<ProjectsData> {
  try {
    const raw = await fs.readFile(PROJECTS_FILE, "utf8")
    const parsed = JSON.parse(raw) as ProjectsData
    if (!parsed.rows?.length) {
      return { rows: reindexRows(emptyRows()) }
    }
    return { rows: reindexRows(parsed.rows) }
  } catch {
    return { rows: reindexRows(emptyRows()) }
  }
}

async function writeProjects(data: ProjectsData): Promise<void> {
  await fs.mkdir(path.dirname(PROJECTS_FILE), { recursive: true })
  const normalized = { rows: reindexRows(data.rows) }
  await fs.writeFile(PROJECTS_FILE, `${JSON.stringify(normalized, null, 2)}\n`, "utf8")
}

export function flattenProjects(data: ProjectsData): WorkItem[] {
  return data.rows.flatMap((row) => row.items)
}

export function findProject(data: ProjectsData, slug: string): WorkItem | undefined {
  return flattenProjects(data).find((item) => item.slug === slug)
}

export async function createProject(input: ProjectInput): Promise<WorkItem> {
  const data = await readProjects()
  if (findProject(data, input.slug)) {
    throw new Error("Projekt o tym slugu już istnieje.")
  }

  const row = data.rows.find((r) => r.id === input.category)
  if (!row) {
    throw new Error("Nieprawidłowa kategoria.")
  }

  row.items.push(buildItem(input, "00"))
  await writeProjects(data)

  const created = findProject(await readProjects(), input.slug)
  if (!created) {
    throw new Error("Nie udało się utworzyć projektu.")
  }
  return created
}

export async function updateProject(
  slug: string,
  input: ProjectInput,
): Promise<WorkItem> {
  const data = await readProjects()
  let existing: WorkItem | undefined
  let sourceRow: WorkRow | undefined

  for (const row of data.rows) {
    const item = row.items.find((i) => i.slug === slug)
    if (item) {
      existing = item
      sourceRow = row
      break
    }
  }

  if (!existing || !sourceRow) {
    throw new Error("Projekt nie istnieje.")
  }

  if (input.slug !== slug && findProject(data, input.slug)) {
    throw new Error("Nowy slug jest już zajęty.")
  }

  sourceRow.items = sourceRow.items.filter((i) => i.slug !== slug)

  if (input.category !== sourceRow.id) {
    const targetRow = data.rows.find((r) => r.id === input.category)
    if (!targetRow) {
      throw new Error("Nieprawidłowa kategoria.")
    }
    targetRow.items.push(buildItem(input, existing.index))
  } else {
    sourceRow.items.push(buildItem(input, existing.index))
  }

  if (input.slug !== slug) {
    const oldPath = path.join(WORK_DIR, `${slug}.html`)
    const newPath = path.join(WORK_DIR, `${input.slug}.html`)
    try {
      await fs.rename(oldPath, newPath)
    } catch {
      // brak pliku HTML — OK przy samej edycji metadanych
    }
  }

  await writeProjects(data)
  const updated = findProject(await readProjects(), input.slug)
  if (!updated) {
    throw new Error("Nie udało się zaktualizować projektu.")
  }
  return updated
}

export async function deleteProject(slug: string, removeHtml = true): Promise<void> {
  const data = await readProjects()
  let found = false

  for (const row of data.rows) {
    const before = row.items.length
    row.items = row.items.filter((i) => i.slug !== slug)
    if (row.items.length < before) {
      found = true
    }
  }

  if (!found) {
    throw new Error("Projekt nie istnieje.")
  }

  await writeProjects(data)

  if (removeHtml) {
    try {
      await fs.unlink(path.join(WORK_DIR, `${slug}.html`))
    } catch {
      // plik mógł nie istnieć
    }
  }
}

export async function saveProjectHtml(slug: string, html: string): Promise<void> {
  await fs.mkdir(WORK_DIR, { recursive: true })
  await fs.writeFile(path.join(WORK_DIR, `${slug}.html`), html, "utf8")
}
