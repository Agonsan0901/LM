import { HashRouter, Routes, Route } from 'react-router-dom'
import { AgsLayout } from '../layouts/agsLayout'
import { AgsHome } from '../pages/agsHome'
import { AgsContacto } from '../pages/agsContacto'
import { Autocaravanas } from '../pages/agsAutocaravanas'
import { AutocaravanaDetalle } from '../pages/agsAutocaravanaDetalle'

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AgsLayout />}>
          <Route index element={<AgsHome />} />
          <Route path="contacto" element={<AgsContacto />} />
          <Route path=":tipo" element={<Autocaravanas />} />
          <Route path=":tipo/:cod" element={<AutocaravanaDetalle />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
