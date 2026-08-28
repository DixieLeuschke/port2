import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import styles from "./Admin.module.css"

export function AdminLoginPage() {
  const { authenticated, signIn } = useAuth()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (authenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await signIn(password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logowanie nie powiodło się.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.admin}>
      <div className={styles.shell}>
        <div className={styles.panel} style={{ maxWidth: "28rem" }}>
          <p className={styles.eyebrow}>Admin</p>
          <h1 className={styles.brand}>Logowanie</h1>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label htmlFor="admin-password">Hasło</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error ? <p className={styles.error}>{error}</p> : null}
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? "Logowanie…" : "Zaloguj"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
