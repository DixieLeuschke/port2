import { brand, hero } from "../data/content"
import styles from "./Hero.module.css"

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-brand">
      <div className={styles.media}>
        <img
          src={hero.image.src}
          alt={hero.image.alt}
          className={styles.image}
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className={styles.treatment} aria-hidden="true" />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.wash} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>{brand.role}</p>
        <h1 id="hero-brand" className={styles.brand}>
          {brand.name}
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
