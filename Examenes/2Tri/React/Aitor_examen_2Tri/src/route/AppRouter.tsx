import { HashRouter, Routes, Route } from 'react-router-dom'
import { AgsLayout } from '../layouts/agsLayout'
import { AgsHome } from '../pages/agsHome'
import { AgsContacto } from '../pages/agsContacto'
import { AgsAutocaravanas } from '../pages/agsAutocaravanas'
import { AgsAutocaravanaDetalle } from '../pages/agsAutocaravanaDetalle'

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AgsLayout />}>
          <Route index element={<AgsHome />} />
          <Route path="contacto" element={<AgsContacto />} />
          <Route path=":tipo" element={<AgsAutocaravanas />} />
          <Route path=":tipo/:cod" element={<AgsAutocaravanaDetalle />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
