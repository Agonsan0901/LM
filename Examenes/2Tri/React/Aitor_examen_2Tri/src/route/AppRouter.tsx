import { HashRouter, Routes, Route } from 'react-router-dom'
import { AgsLayout } from '../layouts/agsLayout'
import { AgsHome } from '../pages/agsHome'
import { AgsCaravanas } from '../pages/agsCaravanas'
import { AgsPerfiladas } from '../pages/agsPerfiladas'
import { AgsCampers } from '../pages/agsCampers'
import { AgsCapuchinas } from '../pages/agsCapuchinas'
import { AgsContacto } from '../pages/agsContacto'

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AgsLayout />}>
          <Route index element={<AgsHome />} />
          <Route path="caravanas" element={<AgsCaravanas />} />
          <Route path="perfiladas" element={<AgsPerfiladas />} />
          <Route path="campers" element={<AgsCampers />} />
          <Route path="capuchinas" element={<AgsCapuchinas />} />
          <Route path="contacto" element={<AgsContacto />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
