/** Treść strony — TODO: treść do potwierdzenia z klientem */

export type {
  ProjectInput,
  ProjectsData,
  WorkCategory,
  WorkItem,
  WorkRow,
} from "../../shared/project.ts"

export {
  WORK_CATEGORIES,
  WORK_ROW_META,
  categoryLabel,
  getFrameForCategory,
} from "../../shared/project.ts"

export const brand = {
  name: "John Pavulon",
  role: "Kierunek kreatywny",
  email: "hello@johnpavulon.studio",
  year: new Date().getFullYear(),
} as const

export const nav = [
  { label: "Prace", href: "/#work" },
  { label: "Podejście", href: "/#approach" },
  { label: "O mnie", href: "/#about" },
  { label: "Kontakt", href: "/#contact" },
] as const

export const hero = {
  headline: "Mniej efektu. Więcej sensu.",
  support:
    "Kierunek kreatywny dla marek, które wolą przemyślany system od kolejnego rebrandu w pośpiechu.",
  primaryCta: { label: "Rozpocznij projekt", href: "/#contact" },
  secondaryCta: { label: "Zobacz prace", href: "/#work" },
  image: {
    src: "/hero.jpg",
    alt: "Ilustracja: nocna praca przy biurku z widokiem na oświetlone miasto w deszczu",
  },
} as const

export const workSection = {
  title: "Wybrane prace",
  lede: "Trzy linie współpracy — mobile, landing page i koncepcje AI. Docelowe case studies do uzupełnienia.",
} as const

export const approach = {
  title: "Podejście",
  steps: [
    {
      label: "Pozycjonowanie",
      body: "Krótki brief, konkurencja i ton marki — zanim powstanie pierwszy layout.",
    },
    {
      label: "System",
      body: "Typografia, kolor i ruch jako jeden język, nie zestaw osobnych plików.",
    },
    {
      label: "Powierzchnie",
      body: "To, co ludzie dotykają: web, print, social — spójnie z systemem.",
    },
  ],
} as const

export const about = {
  title: "O mnie",
  body: "Chętnie pożyczę 10zł.",
  meta: ["Projektuje w szałerku, miastowi burżuje za dychę."],
} as const

export const contact = {
  title: "Rozpocznij projekt",
  body: "Opisz krótko markę i cel — odpowiem w ciągu dwóch dni roboczych.",
  cta: "Rozpocznij projekt",
} as const

export const ui = {
  skipToContent: "Przejdź do treści",
  primaryNav: "Nawigacja główna",
  mobileNav: "Menu nawigacji",
  openMenu: "Otwórz menu",
  closeMenu: "Zamknij menu",
  startProject: "Rozpocznij projekt",
  placeholderLabel: "Przykład",
  viewCaseStudy: "Zobacz case study",
  openDemo: "Otwórz demo w nowej karcie",
  demoLabel: "Interaktywne demo",
  backToWork: "Wróć do prac",
  caseStudyLabel: "Case study",
  placeholderNote:
    "To przykładowy format prezentacji — docelowe case study zostanie uzupełnione materiałami klienta.",
} as const
