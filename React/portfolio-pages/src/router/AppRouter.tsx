import { HashRouter, Routes, Route } from "react-router-dom"; 
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/Dashboardlayout.tsx";
import Home from "../pages/Home";
import Servicios from "../pages/Servicios.tsx";
import Trabajos from "../pages/Trabajos";
import Cursos from "../pages/Cursos";
import Contacto from "../pages/Contacto";
import AdminHome      from "../pages/Admin/AdminHome";
import AdminCursos    from "../pages/Admin/AdminCursos";
import AdminServicios from "../pages/Admin/AdminServicios";
import AdminTrabajos  from "../pages/Admin/AdminTrabajos";
import AdminFormacion from "../pages/Admin/AdminFormacion";
import { StoreProvider } from "../Context/StoreContext.tsx";

export default function AppRouter() {
  return (
    <HashRouter> 
      <StoreProvider>
        <Routes>
        
          <Route element={<MainLayout />}>
            <Route path="/"          element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/trabajos"  element={<Trabajos />} />
            <Route path="/cursos"    element={<Cursos />} />
            <Route path="/contacto"  element={<Contacto />} />
          </Route>

         
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index              element={<AdminHome />} />
            <Route path="cursos"      element={<AdminCursos />} />
            <Route path="servicios"   element={<AdminServicios />} />
            <Route path="trabajos"    element={<AdminTrabajos />} />
            <Route path="formacion"   element={<AdminFormacion />} />
          </Route>

          
          <Route path="*" element={<Home />} />
        </Routes>
      </StoreProvider>
    </HashRouter> 
  );
}