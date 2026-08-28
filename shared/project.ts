export type WorkCategory = "mobile" | "landing" | "ai"

export type WorkItem = {
  index: string
  category: WorkCategory
  slug: string
  href: string
  previewUrl: string
  previewSrc: string
  demoSrc: string
  frameWidth: number
  frameHeight: number
  title: string
  year: string
  role: string
  outcome: string
  summary: string
  deliverables: string[]
  isPlaceholder?: boolean
}

export type WorkRow = {
  id: WorkCategory
  label: string
  lede: string
  items: WorkItem[]
}

export type ProjectsData = {
  rows: WorkRow[]
}

export const WORK_CATEGORIES: WorkCategory[] = ["mobile", "landing", "ai"]

export const WORK_ROW_META: Record<
  WorkCategory,
  { label: string; lede: string }
> = {
  mobile: {
    label: "Mobilne",
    lede: "Product UI i aplikacje — wybrane ekrany z pełnych systemów.",
  },
  landing: {
    label: "Landing page",
    lede: "Strony marketingowe i editorial web — pierwsze wrażenie marki.",
  },
  ai: {
    label: "AI",
    lede: "Koncepcje produktów AI — insight, decyzje i copilot w interfejsie.",
  },
}

export const MOBILE_FRAME = { frameWidth: 390, frameHeight: 844 } as const
export const DESKTOP_FRAME = { frameWidth: 1280, frameHeight: 900 } as const

export function getFrameForCategory(category: WorkCategory) {
  return category === "landing" ? DESKTOP_FRAME : MOBILE_FRAME
}

export function categoryLabel(category: WorkCategory): string {
  return WORK_ROW_META[category].label
}

export type ProjectInput = {
  category: WorkCategory
  slug: string
  previewUrl: string
  title: string
  year: string
  role: string
  outcome: string
  summary: string
  deliverables: string[]
  isPlaceholder?: boolean
}
