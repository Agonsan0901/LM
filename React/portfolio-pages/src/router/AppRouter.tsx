import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Home } from "../pages/Home"
import { Trabajos } from "../pages/Trabajos"
import { Contacto } from "../pages/Contacto"
import { Servicios } from "../pages/Servicios"
import { ServicioDetalle } from "../pages/ServicioDetalle"
import { Ventas } from "../pages/Ventas"
import { Tienda } from "../pages/Tienda"
import { ProductoDetalle } from "../pages/ProductoDetalle"
import { BackendLayout } from "../layouts/BackendLayout"
import { AdminExperiencias } from "../pages/backend/AdminExperiencias"
import { AdminProductos } from "../pages/backend/AdminProductos"
import { AdminTrabajos } from "../pages/backend/AdminTrabajos"
import { AdminServicios } from "../pages/backend/AdminServicios"
import { AdminMensajes } from "../pages/backend/AdminMensajes"
import { AdminLogin } from "../pages/backend/AdminLogin"
import { ProtectedRoute } from "../components/ProtectedRoute"

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/trabajos" element={<Trabajos />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/servicios/:id" element={<ServicioDetalle />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/tienda" element={<Tienda />} />
                <Route path="/tienda/:id" element={<ProductoDetalle />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<BackendLayout />}>
                <Route path="/admin" element={<AdminMensajes />} />
                <Route path="/admin/experiencias" element={<AdminExperiencias />} />
                <Route path="/admin/productos" element={<AdminProductos />} />
                <Route path="/admin/trabajos" element={<AdminTrabajos />} />
                <Route path="/admin/servicios" element={<AdminServicios />} />
                <Route path="/admin/mensajes" element={<AdminMensajes />} />
              </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
