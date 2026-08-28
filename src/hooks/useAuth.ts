import { useCallback, useEffect, useState } from "react"
import { fetchAuthStatus, login, logout } from "../api/projects"

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const status = await fetchAuthStatus()
      setAuthenticated(status.authenticated)
      setError(null)
    } catch (err) {
      setAuthenticated(false)
      setError(err instanceof Error ? err.message : "Błąd autoryzacji.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const signIn = async (password: string) => {
    await login(password)
    setAuthenticated(true)
    setError(null)
  }

  const signOut = async () => {
    await logout()
    setAuthenticated(false)
  }

  return { authenticated, loading, error, signIn, signOut, refresh }
}
