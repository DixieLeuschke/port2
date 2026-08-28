import { hero } from "../data/content"
import styles from "./Hero.module.css"

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-brand">
      <div className={styles.media}>
        <img
          src={hero.image.src}
          alt={hero.image.alt}
          className={styles.image}
          width={1024}
          height={434}
          fetchPriority="high"
        />
        <div className={styles.treatment} aria-hidden="true" />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.wash} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <h1 id="hero-brand" className={styles.brand}>
          <span className={styles.brandGiven}>John</span>
          <span className={styles.brandFamily}>Pavulon</span>
          <span className={styles.brandRule} aria-hidden="true" />
        </h1>
        <p className={styles.headline}>{hero.headline}</p>
        <p className={styles.support}>{hero.support}</p>
        <div className={styles.actions}>
          <a href={hero.primaryCta.href} className="btn btn--primary">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="btn btn--ghost">
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  )
}
