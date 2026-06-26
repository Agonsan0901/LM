import { NavLink, Outlet } from 'react-router-dom'

export const AgsLayout = () => {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-logo">🚐 Autocaravanas</NavLink>
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/integrales" className={({ isActive }) => isActive ? 'active' : ''}>Integrales</NavLink>
          <NavLink to="/perfiladas" className={({ isActive }) => isActive ? 'active' : ''}>Perfiladas</NavLink>
          <NavLink to="/campers" className={({ isActive }) => isActive ? 'active' : ''}>Campers</NavLink>
          <NavLink to="/capuchinas" className={({ isActive }) => isActive ? 'active' : ''}>Capuchinas</NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>Contacto</NavLink>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2025 Autocaravanas · Todos los derechos reservados</p>
      </footer>
    </>
  )
}
