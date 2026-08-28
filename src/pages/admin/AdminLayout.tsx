import { Navigate, Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import styles from "./Admin.module.css"

export function AdminLayout() {
  const { authenticated, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className={styles.admin}>
        <div className={styles.shell}>
          <p>Ładowanie panelu…</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className={styles.admin}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Obsidian Gilt</p>
            <h1 className={styles.brand}>Panel projektów</h1>
          </div>
          <div className={styles.actions}>
            <Link to="/admin/projects/new" className="btn btn--primary">
              Dodaj projekt
            </Link>
            <Link to="/" className="btn btn--ghost">
              Strona
            </Link>
            <button type="button" className="btn btn--ghost" onClick={() => void signOut()}>
              Wyloguj
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  )
}
