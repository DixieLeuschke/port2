import { useEffect, useState } from "react"
import { fetchProject } from "../api/projects"
import type { WorkItem } from "../data/content"

export function useProject(slug: string | undefined) {
  const [item, setItem] = useState<WorkItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError("Brak identyfikatora projektu.")
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProject(slug)
      .then((result) => {
        if (!cancelled) {
          setItem(result)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          setItem(null)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { item, loading, error }
}
