import { useMemo, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { deleteProject } from "../../api/projects"
import { WORK_CATEGORIES, categoryLabel } from "../../data/content"
import { useAuth } from "../../hooks/useAuth"
import { useProjects } from "../../hooks/useProjects"
import styles from "./Admin.module.css"

export function AdminDashboardPage() {
  const { authenticated } = useAuth()
  const { data, loading, error, reload } = useProjects()
  const [filter, setFilter] = useState<(typeof WORK_CATEGORIES)[number] | "all">(
    "all",
  )
  const [message, setMessage] = useState<string | null>(null)
  const [busySlug, setBusySlug] = useState<string | null>(null)

  const items = useMemo(() => {
    const all = data?.rows.flatMap((row) => row.items) ?? []
    if (filter === "all") return all
    return all.filter((item) => item.category === filter)
  }, [data, filter])

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />
  }

  const onDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Usunąć projekt „${title}”?`)) return
    setBusySlug(slug)
    setMessage(null)
    try {
      await deleteProject(slug)
      setMessage(`Usunięto: ${title}`)
      reload()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Usuwanie nie powiodło się.")
    } finally {
      setBusySlug(null)
    }
  }

  return (
    <section className={styles.panel}>
      <div className={styles.actions} style={{ marginBottom: "var(--space-5)" }}>
        <button
          type="button"
          className={`btn btn--ghost ${filter === "all" ? "" : ""}`}
          onClick={() => setFilter("all")}
        >
          Wszystkie
        </button>
        {WORK_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className="btn btn--ghost"
            onClick={() => setFilter(category)}
          >
            {categoryLabel(category)}
          </button>
        ))}
      </div>

      {loading ? <p>Ładowanie listy…</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      {message ? <p className={styles.success}>{message}</p> : null}

      {!loading && !error ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tytuł</th>
              <th>Kategoria</th>
              <th>Slug</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.slug}>
                <td>{item.index}</td>
                <td>{item.title}</td>
                <td>{categoryLabel(item.category)}</td>
                <td>{item.slug}</td>
                <td>
                  <div className={styles.tableActions}>
                    <Link to={`/admin/projects/${item.slug}`} className={styles.linkButton}>
                      Edytuj
                    </Link>
                    <Link to={item.href} className={styles.linkButton}>
                      Podgląd
                    </Link>
                    <button
                      type="button"
                      className={`${styles.linkButton} ${styles.linkButtonDanger}`}
                      disabled={busySlug === item.slug}
                      onClick={() => void onDelete(item.slug, item.title)}
                    >
                      Usuń
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </section>
  )
}
