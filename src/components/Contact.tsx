import { brand, contact } from "../data/content"
import { Reveal } from "./Reveal"
import styles from "./Contact.module.css"

const mailtoHref = `mailto:${brand.email}?subject=${encodeURIComponent("Zapytanie o projekt")}`

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <div className={styles.strip}>
            <div>
              <h2 id="contact-title" className={styles.title}>
                {contact.title}
              </h2>
              <p className={styles.body}>{contact.body}</p>
              <a className={styles.email} href={mailtoHref}>
                {brand.email}
              </a>
            </div>
            <a className="btn btn--primary" href={mailtoHref}>
              {contact.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
