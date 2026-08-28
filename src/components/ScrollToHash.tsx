import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" })
      return
    }

    const id = hash.replace("#", "")
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [pathname, hash])

  return null
}
