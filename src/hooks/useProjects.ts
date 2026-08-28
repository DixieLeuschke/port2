import { useCallback, useEffect, useState } from "react"
import { fetchProjects } from "../api/projects"
import type { ProjectsData } from "../data/content"

type ProjectsState = {
  data: ProjectsData | null
  loading: boolean
  error: string | null
  reload: () => void
}

export function useProjects(): ProjectsState {
  const [data, setData] = useState<ProjectsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const reload = useCallback(() => {
    setTick((value) => value + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProjects()
      .then((result) => {
        if (!cancelled) {
          setData(result)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
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
  }, [tick])

  return { data, loading, error, reload }
}
