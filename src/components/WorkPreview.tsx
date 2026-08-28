import { useEffect, useRef, useState } from "react"
import styles from "./WorkPreview.module.css"

type WorkPreviewProps = {
  src: string
  title: string
  frameWidth: number
  frameHeight: number
  interactive?: boolean
}

export function WorkPreview({
  src,
  title,
  frameWidth,
  frameHeight,
  interactive = false,
}: WorkPreviewProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const updateScale = () => {
      const width = host.clientWidth
      const height = host.clientHeight
      const fitScale = Math.min(width / frameWidth, height / frameHeight)
      const nextScale = fitScale > 0 ? fitScale * 0.985 : 0.4
      setScale(nextScale)
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(host)
    return () => observer.disconnect()
  }, [frameWidth, frameHeight])

  return (
    <div
      ref={hostRef}
      className={`${styles.preview} ${interactive ? styles.interactive : ""}`}
      aria-hidden={interactive ? undefined : true}
    >
      <iframe
        className={styles.frame}
        src={src}
        title={title}
        tabIndex={interactive ? 0 : -1}
        loading="lazy"
        scrolling="no"
        style={{
          width: frameWidth,
          height: frameHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    </div>
  )
}
