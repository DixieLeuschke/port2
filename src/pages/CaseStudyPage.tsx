import { Link, Navigate, useParams } from "react-router-dom"
import { categoryLabel, ui } from "../data/content"
import { useProject } from "../hooks/useProject"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { WorkPreview } from "../components/WorkPreview"
import styles from "./CaseStudyPage.module.css"

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const { item, loading, error } = useProject(slug)

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <p>Ładowanie case study…</p>
      </div>
    )
  }

  if (error || !item) {
    return <Navigate to="/#work" replace />
  }

  return (
    <>
      <a className="skip-link" href="#case-main">
        {ui.skipToContent}
      </a>
      <div id="top">
        <Header />
        <main id="case-main" className={styles.main}>
          <div className="container">
            <Link to="/#work" className={styles.back}>
              ← {ui.backToWork}
            </Link>

            <header className={styles.hero}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>
                  <span>{item.index}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{ui.caseStudyLabel}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{categoryLabel(item.category)}</span>
                  {item.isPlaceholder ? (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span>{ui.placeholderLabel}</span>
                    </>
                  ) : null}
                </p>
                <h1 className={styles.title}>{item.title}</h1>
                <p className={styles.summary}>{item.summary}</p>
                <dl className={styles.meta}>
                  <div>
                    <dt>Rok</dt>
                    <dd>{item.year}</dd>
                  </div>
                  <div>
                    <dt>Zakres</dt>
                    <dd>{item.role}</dd>
                  </div>
                  <div>
                    <dt>Rezultat</dt>
                    <dd>{item.outcome}</dd>
                  </div>
                </dl>
              </div>

              <div className={styles.heroFrame} aria-hidden="true">
                <div className={styles.frameChrome}>
                  <span />
                  <span />
                  <span />
                  <span className={styles.frameUrl}>{item.previewUrl}</span>
                </div>
                <div className={styles.frameViewport}>
                  <WorkPreview
                    src={item.previewSrc}
                    title={item.title}
                    frameWidth={item.frameWidth}
                    frameHeight={item.frameHeight}
                  />
                </div>
              </div>
            </header>

            <section className={styles.demo} aria-labelledby="demo-title">
              <div className={styles.demoHead}>
                <h2 id="demo-title" className={styles.sectionTitle}>
                  {ui.demoLabel}
                </h2>
                <a
                  href={item.demoSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.demoLink}
                >
                  {ui.openDemo}
                </a>
              </div>
              <WorkPreview
                src={item.previewSrc}
                title={item.title}
                frameWidth={item.frameWidth}
                frameHeight={item.frameHeight}
                interactive
              />
            </section>

            <section className={styles.section} aria-labelledby="deliverables-title">
              <h2 id="deliverables-title" className={styles.sectionTitle}>
                Zakres dostarczenia
              </h2>
              <ul className={styles.list}>
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </section>

            <aside className={styles.note}>
              <p>{ui.placeholderNote}</p>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
