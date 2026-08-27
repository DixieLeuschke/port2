import { about, approach } from "../data/content"
import { Reveal } from "./Reveal"
import styles from "./Approach.module.css"

export function Approach() {
  return (
    <>
      <section id="approach" className={styles.section} aria-labelledby="approach-title">
        <div className="container">
          <Reveal>
            <h2 id="approach-title" className={styles.title}>
              {approach.title}
            </h2>
            <ol className={styles.steps}>
              {approach.steps.map((step, i) => (
                <li key={step.label} className={styles.step}>
                  <span className={styles.stepIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.stepLabel}>{step.label}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section id="about" className={styles.about} aria-labelledby="about-title">
        <div className={`container ${styles.aboutGrid}`}>
          <Reveal>
            <div className={styles.aboutMain}>
              <div className={styles.rule} aria-hidden="true" />
              <h2 id="about-title" className={styles.title}>
                {about.title}
              </h2>
              <p className={styles.body}>{about.body}</p>
            </div>
            <aside className={styles.aboutMeta} aria-label="Informacje">
              <ul className={styles.metaList}>
                {about.meta.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  )
}
