import { Approach } from "./components/Approach"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Work } from "./components/Work"
import { ui } from "./data/content"

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        {ui.skipToContent}
      </a>
      <div id="top">
        <Header />
        <main id="main">
          <Hero />
          <Work />
          <Approach />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
