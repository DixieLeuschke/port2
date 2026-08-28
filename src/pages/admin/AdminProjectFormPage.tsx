import { useEffect, useMemo, useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { createProject, fetchProject, updateProject } from "../../api/projects"
import {
  WORK_CATEGORIES,
  categoryLabel,
  getFrameForCategory,
  type ProjectInput,
  type WorkCategory,
} from "../../data/content"
import { useAuth } from "../../hooks/useAuth"
import { WorkPreview } from "../../components/WorkPreview"
import styles from "./Admin.module.css"

const emptyForm: ProjectInput = {
  category: "mobile",
  slug: "",
  previewUrl: "",
  title: "",
  year: new Date().getFullYear().toString(),
  role: "",
  outcome: "",
  summary: "",
  deliverables: [],
  isPlaceholder: true,
}

export function AdminProjectFormPage() {
  const { authenticated } = useAuth()
  const { slug } = useParams<{ slug: string }>()
  const isEdit = Boolean(slug)
  const navigate = useNavigate()

  const [form, setForm] = useState<ProjectInput>(emptyForm)
  const [deliverablesText, setDeliverablesText] = useState("")
  const [htmlFile, setHtmlFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (!isEdit || !slug) return

    setLoading(true)
    fetchProject(slug)
      .then((item) => {
        setForm({
          category: item.category,
          slug: item.slug,
          previewUrl: item.previewUrl,
          title: item.title,
          year: item.year,
          role: item.role,
          outcome: item.outcome,
          summary: item.summary,
          deliverables: item.deliverables,
          isPlaceholder: item.isPlaceholder,
        })
        setDeliverablesText(item.deliverables.join("\n"))
        setPreviewUrl(item.previewSrc)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [isEdit, slug])

  useEffect(() => {
    if (!htmlFile) return
    const url = URL.createObjectURL(htmlFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [htmlFile])

  const frame = useMemo(() => getFrameForCategory(form.category), [form.category])

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />
  }

  if (loading) {
    return <p>Ładowanie projektu…</p>
  }

  const setCategory = (category: WorkCategory) => {
    setForm((current) => ({ ...current, category }))
  }

  const onFile = (file: File | null) => {
    if (!file) return
    if (!file.name.toLowerCase().endsWith(".html")) {
      setError("Dozwolone są tylko pliki .html")
      return
    }
    setHtmlFile(file)
    setError(null)
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)

    const input: ProjectInput = {
      ...form,
      deliverables: deliverablesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    }

    try {
      if (isEdit && slug) {
        if (!htmlFile) {
          await updateProject(slug, input)
        } else {
          await updateProject(slug, input, htmlFile)
        }
        setSuccess("Projekt zaktualizowany.")
        navigate("/admin")
      } else {
        if (!htmlFile) {
          setError("Dołącz plik HTML demo.")
          return
        }
        await createProject(input, htmlFile)
        setSuccess("Projekt dodany.")
        navigate("/admin")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Zapis nie powiódł się.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className={styles.grid2}>
      <form className={`${styles.panel} ${styles.form}`} onSubmit={onSubmit}>
        <div className={styles.field}>
          <label htmlFor="category">Kategoria</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setCategory(e.target.value as WorkCategory)}
          >
            {WORK_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {categoryLabel(category)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="title">Tytuł</label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="slug">Slug (URL)</label>
            <input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              required
            />
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="previewUrl">Adres w miniaturce</label>
            <input
              id="previewUrl"
              value={form.previewUrl}
              onChange={(e) => setForm({ ...form, previewUrl: e.target.value })}
              placeholder="finlux.app"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="year">Rok</label>
            <input
              id="year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="role">Zakres / rola</label>
          <input
            id="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="outcome">Rezultat (krótko)</label>
          <input
            id="outcome"
            value={form.outcome}
            onChange={(e) => setForm({ ...form, outcome: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="summary">Podsumowanie case study</label>
          <textarea
            id="summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="deliverables">Zakres dostarczenia (jedna linia = punkt)</label>
          <textarea
            id="deliverables"
            value={deliverablesText}
            onChange={(e) => setDeliverablesText(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="html">Plik HTML demo {isEdit ? "(opcjonalnie)" : ""}</label>
          <label
            className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""}`}
            htmlFor="html"
            onDragOver={(e) => {
              e.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragActive(false)
              onFile(e.dataTransfer.files?.[0] ?? null)
            }}
          >
            <p>{htmlFile ? htmlFile.name : "Przeciągnij plik .html lub kliknij, aby wybrać"}</p>
            <span>Max 2 MB · embed.css zostanie dodany automatycznie</span>
          </label>
          <input
            id="html"
            type="file"
            accept=".html,text/html"
            hidden
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            required={!isEdit}
          />
        </div>

        {error ? <p className={styles.error}>{error}</p> : null}
        {success ? <p className={styles.success}>{success}</p> : null}

        <div className={styles.actions}>
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? "Zapisywanie…" : isEdit ? "Zapisz zmiany" : "Dodaj projekt"}
          </button>
          <Link to="/admin" className="btn btn--ghost">
            Anuluj
          </Link>
        </div>
      </form>

      <aside className={styles.panel}>
        <p className={styles.eyebrow}>Podgląd</p>
        <h2 className={styles.brand}>Miniaturka</h2>
        {previewUrl ? (
          <div className={styles.previewBox}>
            <WorkPreview
              src={previewUrl}
              title={form.title || "Podgląd"}
              frameWidth={frame.frameWidth}
              frameHeight={frame.frameHeight}
            />
          </div>
        ) : (
          <div className={styles.previewBoxEmpty}>Brak podglądu — dodaj plik HTML.</div>
        )}
      </aside>
    </section>
  )
}
