/** Treść strony — TODO: treść do potwierdzenia z klientem */

export const brand = {
  name: "John Pavulon",
  role: "Kierunek kreatywny",
  email: "hello@johnpavulon.studio",
  year: new Date().getFullYear(),
} as const

export const nav = [
  { label: "Prace", href: "#work" },
  { label: "Podejście", href: "#approach" },
  { label: "O mnie", href: "#about" },
  { label: "Kontakt", href: "#contact" },
] as const

export const hero = {
  headline: "Systemy marek z cichą pewnością.",
  support:
    "Projektuję powściągliwe tożsamości dla firm B2B, które wolą obecność od hałasu.",
  primaryCta: { label: "Rozpocznij projekt", href: "#contact" },
  secondaryCta: { label: "Zobacz prace", href: "#work" },
  image: {
    src: "/hero.jpg",
    alt: "Ilustracja: nocna praca przy biurku z widokiem na oświetlone miasto",
  },
} as const

export type WorkItem = {
  index: string
  title: string
  year: string
  role: string
  outcome: string
  isPlaceholder?: boolean
}

export const workSection = {
  title: "Wybrane prace",
  lede: "Przykładowe formaty współpracy — docelowe case studies do uzupełnienia.",
} as const

export const work: WorkItem[] = [
  {
    index: "01",
    title: "Identyfikacja meblarska",
    year: "2025",
    role: "Identyfikacja · Art direction",
    outcome: "Spokojny znak i system druku — galeryjna cisza zamiast efektu.",
    isPlaceholder: true,
  },
  {
    index: "02",
    title: "System marki finansowej",
    year: "2024",
    role: "System marki · Web",
    outcome: "Warstwowy dark UI i hierarchia typograficzna dla biura inwestycyjnego.",
    isPlaceholder: true,
  },
  {
    index: "03",
    title: "Kampania sezonowa",
    year: "2024",
    role: "Kampania · Editorial",
    outcome: "Sezonowy język kampanii ze złotymi liniami i oszczędną fotografią.",
    isPlaceholder: true,
  },
]

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
  body: "Projektuję kierunek kreatywny dla marek, które chcą być przemyślane, nie głośne. Pracuję samodzielnie, między dniami w studio a współpracą zdalną z zespołami w Europie.",
  meta: ["Warszawa · zdalnie w EU", "Tożsamość · systemy · web editorial"],
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
} as const
