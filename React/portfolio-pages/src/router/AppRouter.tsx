import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Home } from "../pages/Home"
import Trabajos from "../pages/trabajos/Trabajos"
import { TrabajoDetalle } from "../pages/trabajos/TrabajoDetalle"
import { Contacto } from "../pages/Contacto"
import Servicios from "../pages/servicios/Servicios"
import { ServicioDetalle } from "../pages/servicios/ServicioDetalle"
import { BackendLayout } from "../layouts/BackendLayout"

import Productos from "../pages/productos/Productos"
import { ProductoDetalle } from "../pages/productos/ProductoDetalle"

// IMPORTACIONES DE ADMINISTRACIÓN (CORREGIDAS Y COMPLETAS)
import AdminServicios from "../pages/Admin/AdminServicios"
import AdminProductos from "../pages/Admin/AdminProductos"
import AdminTrabajos from "../pages/Admin/AdminTrabajos"
import AdminContactos from "../pages/Admin/AdminContactos"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas (Con MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/trabajos" element={<Trabajos />} />
          <Route path="/trabajos/:id" element={<TrabajoDetalle />} />

          <Route path="/contacto" element={<Contacto />} />

          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:id" element={<ServicioDetalle />} />

          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
        </Route>

        {/* Rutas de Administración (Con BackendLayout) */}
        <Route path="/admin" element={<BackendLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          
          {/* Componentes reales enlazados en lugar de los h1 anteriores */}
          <Route path="productos" element={<AdminProductos />} />
          <Route path="trabajos" element={<AdminTrabajos />} />
          <Route path="servicios" element={<AdminServicios />} />
          <Route path="mensajes" element={<AdminContactos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}