import { work, workSection, ui } from "../data/content"
import { Reveal } from "./Reveal"
import styles from "./Work.module.css"

export function Work() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <Reveal>
          <div className={styles.intro}>
            <h2 id="work-title" className={styles.title}>
              {workSection.title}
            </h2>
            <p className={styles.lede}>{workSection.lede}</p>
          </div>
        </Reveal>

        <ul className={styles.list}>
          {work.map((item, i) => (
            <li key={item.index} className={styles.row}>
              <Reveal delayMs={i * 50}>
                <article
                  className={`${styles.item} ${i === 0 ? styles.itemFeatured : ""}`}
                >
                  <span className={styles.index} aria-hidden="true">
                    {item.index}
                  </span>
                  <div className={styles.main}>
                    <div className={styles.titleRow}>
                      <h3 className={styles.projectTitle}>{item.title}</h3>
                      {item.isPlaceholder ? (
                        <span className={styles.placeholder}>{ui.placeholderLabel}</span>
                      ) : null}
                    </div>
                    <p className={styles.outcome}>{item.outcome}</p>
                  </div>
                  <p className={styles.meta}>
                    <span>{item.year}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{item.role}</span>
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
