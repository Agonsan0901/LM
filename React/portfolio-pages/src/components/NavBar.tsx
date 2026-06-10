import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/trabajos', label: 'Trabajos' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/ventas', label: 'Precios' },
  { to: '/contacto', label: 'Contacto' },
]

export const NavBar = () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', position: 'relative' }}>

      {/* LOGO */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ width: '34px', height: '34px', background: 'var(--accent)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '1rem', boxShadow: '0 2px 8px rgba(165,0,68,0.3)' }}>A</span>
        <span style={{ fontWeight: '700', color: 'var(--text-h)', fontSize: '1.05rem', letterSpacing: '-0.3px' }}>
          Aitor<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
      </Link>

      {/* LINKS DESKTOP */}
      <div className="nav-links" style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
        {links.map(({ to, label }) => {
          const active = pathname === to || (to !== '/' && pathname.startsWith(to))
          return (
            <Link key={to} to={to} style={{
              padding: '0.45rem 1rem',
              borderRadius: '7px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              background: active ? 'var(--accent-bg)' : 'transparent',
              color: active ? 'var(--accent)' : 'var(--text)',
              fontWeight: active ? '600' : 'normal',
              borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>
              {label}
            </Link>
          )
        })}
        <Link to="/contacto" style={{
          marginLeft: '0.8rem',
          padding: '0.5rem 1.2rem',
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: '20px',
          textDecoration: 'none',
          fontSize: '0.88rem',
          fontWeight: '700',
          boxShadow: '0 2px 10px rgba(165,0,68,0.25)',
          letterSpacing: '0.2px',
        }}>
          Contrátame
        </Link>
        <Link to="/admin/login" style={{
          marginLeft: '0.4rem',
          padding: '0.5rem 0.8rem',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '0.85rem',
        }} title="Panel Admin">
          ⚙️
        </Link>
      </div>

      {/* HAMBURGER MOBILE */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--text-h)', display: 'none' }}
        className="hamburger"
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--bg)', borderBottom: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', padding: '1rem 2rem', gap: '0.5rem', zIndex: 200,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} style={{
              padding: '0.7rem 0',
              color: pathname === to ? 'var(--accent)' : 'var(--text)',
              textDecoration: 'none',
              fontWeight: pathname === to ? '600' : 'normal',
              borderBottom: '1px solid var(--border)',
              fontSize: '0.95rem',
            }}>
              {label}
            </Link>
          ))}
          <Link to="/contacto" onClick={() => setOpen(false)} style={{ marginTop: '0.5rem', padding: '0.7rem 1rem', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', textAlign: 'center', fontSize: '0.9rem' }}>
            Contrátame
          </Link>
        </div>
      )}
    </nav>
  )
}
