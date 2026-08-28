import { Link } from "react-router-dom"
import type { WorkItem } from "../data/content"
import { ui } from "../data/content"
import { WorkPreview } from "./WorkPreview"
import styles from "./WorkCard.module.css"

type WorkCardProps = {
  item: WorkItem
}

export function WorkCard({ item }: WorkCardProps) {
  return (
    <Link to={item.href} className={styles.card}>
      <article className={styles.window}>
        <div className={styles.chrome}>
          <div className={styles.dots} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className={styles.url}>{item.previewUrl}</span>
        </div>
        <div className={styles.viewport}>
          <WorkPreview
            src={item.previewSrc}
            title={item.title}
            frameWidth={item.frameWidth}
            frameHeight={item.frameHeight}
          />
          <span className={styles.overlay}>
            <span className={styles.viewLabel}>{ui.viewCaseStudy}</span>
          </span>
        </div>
      </article>

      <div className={styles.meta}>
        <div className={styles.metaTop}>
          <span className={styles.index} aria-hidden="true">
            {item.index}
          </span>
          <h3 className={styles.projectTitle}>{item.title}</h3>
          {item.isPlaceholder ? (
            <span className={styles.placeholder}>{ui.placeholderLabel}</span>
          ) : null}
        </div>
        <p className={styles.outcome}>{item.outcome}</p>
        <p className={styles.details}>
          <span>{item.year}</span>
          <span aria-hidden="true"> · </span>
          <span>{item.role}</span>
        </p>
      </div>
    </Link>
  )
}
