import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Home } from "../pages/Home"
import { Trabajos } from "../pages/Trabajos"
import { Contacto } from "../pages/Contacto"
import { Servicios } from "../pages/Servicios"
import { ServicioDetalle } from "../pages/ServicioDetalle"

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
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
