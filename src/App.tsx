import { Route, Routes } from "react-router-dom"
import { CaseStudyPage } from "./pages/CaseStudyPage"
import { HomePage } from "./pages/HomePage"
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage"
import { AdminLayout } from "./pages/admin/AdminLayout"
import { AdminLoginPage } from "./pages/admin/AdminLoginPage"
import { AdminProjectFormPage } from "./pages/admin/AdminProjectFormPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/prace/:slug" element={<CaseStudyPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="projects/new" element={<AdminProjectFormPage />} />
        <Route path="projects/:slug" element={<AdminProjectFormPage />} />
      </Route>
    </Routes>
  )
}
