import type { ProjectInput, ProjectsData, WorkItem } from "../../shared/project.ts"

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { error?: string }
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? "Żądanie nie powiodło się.")
  }
  return data
}

export async function fetchProjects(): Promise<ProjectsData> {
  const res = await fetch("/api/projects")
  return parseJson<ProjectsData>(res)
}

export async function fetchProject(slug: string): Promise<WorkItem> {
  const res = await fetch(`/api/projects/${encodeURIComponent(slug)}`)
  return parseJson<WorkItem>(res)
}

export async function fetchAuthStatus(): Promise<{ authenticated: boolean }> {
  const res = await fetch("/api/auth/status")
  return parseJson<{ authenticated: boolean }>(res)
}

export async function login(password: string): Promise<void> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
  await parseJson<{ ok: boolean }>(res)
}

export async function logout(): Promise<void> {
  const res = await fetch("/api/auth/logout", { method: "POST" })
  await parseJson<{ ok: boolean }>(res)
}

export async function createProject(
  input: ProjectInput,
  htmlFile: File,
): Promise<WorkItem> {
  const body = projectFormData(input, htmlFile)
  const res = await fetch("/api/projects", { method: "POST", body })
  return parseJson<WorkItem>(res)
}

export async function updateProject(
  slug: string,
  input: ProjectInput,
  htmlFile?: File | null,
): Promise<WorkItem> {
  const body = projectFormData(input, htmlFile ?? undefined)
  const res = await fetch(`/api/projects/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body,
  })
  return parseJson<WorkItem>(res)
}

export async function deleteProject(slug: string): Promise<void> {
  const res = await fetch(`/api/projects/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  })
  await parseJson<{ ok: boolean }>(res)
}

function projectFormData(input: ProjectInput, htmlFile?: File) {
  const form = new FormData()
  form.set("category", input.category)
  form.set("slug", input.slug)
  form.set("previewUrl", input.previewUrl)
  form.set("title", input.title)
  form.set("year", input.year)
  form.set("role", input.role)
  form.set("outcome", input.outcome)
  form.set("summary", input.summary)
  form.set("deliverables", input.deliverables.join("\n"))
  form.set("isPlaceholder", String(input.isPlaceholder !== false))
  if (htmlFile) {
    form.set("html", htmlFile)
  }
  return form
}
