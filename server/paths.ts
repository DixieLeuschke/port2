import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT_DIR = path.resolve(__dirname, "..")
export const DATA_DIR = path.join(ROOT_DIR, "data")
export const PROJECTS_FILE = path.join(DATA_DIR, "projects.json")
export const WORK_DIR = path.join(ROOT_DIR, "public", "work")
export const DIST_DIR = path.join(ROOT_DIR, "dist")
export const PUBLIC_DIR = path.join(ROOT_DIR, "public")
