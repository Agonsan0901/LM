import { NavLink, Outlet } from 'react-router-dom'

export const AgsLayout = () => {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="logo">🚐 Autocaravanas</NavLink>
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/caravanas" className={({ isActive }) => isActive ? 'active' : ''}>Caravanas</NavLink>
          <NavLink to="/perfiladas" className={({ isActive }) => isActive ? 'active' : ''}>Perfiladas</NavLink>
          <NavLink to="/campers" className={({ isActive }) => isActive ? 'active' : ''}>Campers</NavLink>
          <NavLink to="/capuchinas" className={({ isActive }) => isActive ? 'active' : ''}>Capuchinas</NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>Contacto</NavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
