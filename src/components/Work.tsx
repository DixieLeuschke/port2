import { workSection } from "../data/content"
import { useProjects } from "../hooks/useProjects"
import { Reveal } from "./Reveal"
import { WorkCard } from "./WorkCard"
import styles from "./Work.module.css"

export function Work() {
  const { data, loading, error } = useProjects()

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <Reveal>
          <div className={styles.intro}>
            <div className={styles.introAuroras} aria-hidden="true">
              <div className={styles.introAurora} />
              <div className={`${styles.introAurora} ${styles.introAuroraViolet}`} />
            </div>
            <h2 id="work-title" className={styles.title}>
              {workSection.title}
            </h2>
            <p className={styles.lede}>{workSection.lede}</p>
          </div>
        </Reveal>

        {loading ? <p className={styles.state}>Ładowanie prac…</p> : null}
        {error ? <p className={styles.stateError}>{error}</p> : null}

        {data ? (
          <div className={styles.rows}>
            {data.rows.map((row, rowIndex) => (
              <section
                key={row.id}
                className={`${styles.row} ${styles[`row--${row.id}`]}`}
                aria-labelledby={`work-row-${row.id}`}
              >
                <Reveal delayMs={rowIndex * 40}>
                  <div className={styles.rowHead}>
                    <h3 id={`work-row-${row.id}`} className={styles.rowTitle}>
                      {row.label}
                    </h3>
                    <p className={styles.rowLede}>{row.lede}</p>
                  </div>
                </Reveal>

                {row.items.length ? (
                  <ul className={styles.grid}>
                    {row.items.map((item, i) => (
                      <li key={item.slug} className={styles.cell}>
                        <Reveal delayMs={rowIndex * 40 + i * 60}>
                          <WorkCard item={item} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.emptyRow}>Brak projektów w tej kategorii.</p>
                )}
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
