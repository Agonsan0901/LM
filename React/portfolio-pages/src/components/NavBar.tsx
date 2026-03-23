import { Link, useLocation } from "react-router-dom"

const links = [
  { to: '/', label: 'Home' },
  { to: '/trabajos', label: 'Trabajos' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
]

export const NavBar = () => {
  const { pathname } = useLocation()
  return (
    <nav style={{ display: 'flex', gap: '0.5rem', padding: '1rem 2rem', alignItems: 'center' }}>
      <span style={{ fontWeight: 'bold', color: 'var(--accent)', marginRight: 'auto', fontSize: '1.1rem' }}>Aitor</span>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            background: pathname === to ? 'var(--accent-bg)' : 'transparent',
            color: pathname === to ? 'var(--accent)' : 'var(--text)',
            fontWeight: pathname === to ? 'bold' : 'normal',
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}