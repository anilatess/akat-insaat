import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProjectsAdmin from './pages/admin/ProjectsAdmin'
import ServicesAdmin from './pages/admin/ServicesAdmin'
import MessagesAdmin from './pages/admin/MessagesAdmin'
import ChangePassword from './pages/admin/ChangePassword'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="kurumsal" element={<About />} />
        <Route path="hizmetler" element={<Services />} />
        <Route path="projeler" element={<Projects />} />
        <Route path="iletisim" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/giris" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projeler" element={<ProjectsAdmin />} />
        <Route path="hizmetler" element={<ServicesAdmin />} />
        <Route path="mesajlar" element={<MessagesAdmin />} />
        <Route path="sifre" element={<ChangePassword />} />
      </Route>
    </Routes>
  )
}
