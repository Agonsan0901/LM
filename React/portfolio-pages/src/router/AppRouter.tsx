import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "@/layouts/MainLayout"
import { Home } from "../pages/Home"
import Trabajos from "@/pages/trabajos/Trabajos"
import { TrabajoDetalle } from "@/pages/trabajos/TrabajoDetalle"
import { Contacto } from "@/pages/Contacto"
import Servicios from "@/pages/servicios/Servicios"
import { ServicioDetalle } from "@/pages/servicios/ServicioDetalle"
import { BackendLayout } from "@/layouts/BackendLayout";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/trabajos" element={<Trabajos />} />
          <Route path="/trabajos/:id" element={<TrabajoDetalle />} />

          <Route path="/contacto" element={<Contacto />} />

          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:id" element={<ServicioDetalle />} />
        </Route>
<Route path="/admin" element={<BackendLayout />}>
  <Route index element={<h1>Dashboard</h1>} />
  <Route path="productos" element={<h1>Productos</h1>} />
  <Route path="trabajos" element={<h1>Trabajos</h1>} />
  <Route path="mensajes" element={<h1>Mensajes</h1>} />
</Route>
      </Routes>
    </BrowserRouter>
  )
}