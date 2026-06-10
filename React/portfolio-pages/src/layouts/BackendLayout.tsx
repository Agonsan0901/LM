import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

const sideLinks: { to: string; label: string; icon: string; badge?: number }[] = [
  { to: '/admin', label: 'Dashboard', icon: '🏠' },
  { to: '/admin/mensajes', label: 'Mensajes', icon: '📬' },
  { to: '/admin/experiencias', label: 'Experiencias', icon: '💼' },
  { to: '/admin/productos', label: 'Productos', icon: '🖥️' },
  { to: '/admin/trabajos', label: 'Trabajos', icon: '📁' },
  { to: '/admin/servicios', label: 'Servicios', icon: '🛠️' },
]

const stats = [
  { label: 'Visitas hoy', value: '1.284', change: '+12%', up: true },
  { label: 'Proyectos', value: '8', change: '+1', up: true },
  { label: 'Mensajes', value: '3', change: 'nuevos', up: false },
  { label: 'Servicios activos', value: '3', change: 'sin cambios', up: null },
]

export const BackendLayout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [collapsed, _setCollapsed] = useState(false)

  const cerrarSesion = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{
        width: collapsed ? '64px' : '220px',
        minHeight: '100vh',
        background: 'var(--bg)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{ padding: '1.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>⚙️</span>
          {!collapsed && <span style={{ fontWeight: 'bold', color: 'var(--accent)', fontSize: '1rem', whiteSpace: 'nowrap' }}>Panel Admin</span>}
        </div>
        <nav style={{ flex: 1, padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {sideLinks.map(({ to, label, icon, badge }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  background: active ? 'var(--accent-bg)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text)',
                  fontWeight: active ? 'bold' : 'normal',
                  borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
                {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
                {!collapsed && badge && (
                  <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: '10px', fontSize: '0.7rem', padding: '0.1rem 0.45rem', fontWeight: 'bold' }}>
                    {badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: '1rem 0.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text)', textDecoration: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>
            <span>🌐</span>
            {!collapsed && <span>Ver sitio</span>}
          </Link>
          <button
            onClick={cerrarSesion}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(165,0,68,0.08)', border: '1px solid var(--accent-border)', cursor: 'pointer', color: 'var(--accent)', fontSize: '0.85rem', padding: '0.4rem 0.8rem', borderRadius: '6px', textAlign: 'left', width: '100%', fontWeight: '600' }}
          >
            <span>🚪</span>
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* HEADER */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.9rem 2rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text)' }}>Panel de administración</p>
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-h)' }}>
              {sideLinks.find(l => l.to === pathname)?.label ?? 'Dashboard'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>🕐 {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>A</div>
          </div>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', padding: '1.5rem 2rem 0' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.2rem 1.4rem' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text)' }}>{s.label}</p>
              <p style={{ margin: '0.3rem 0 0', fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--text-h)' }}>{s.value}</p>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: s.up === true ? '#22c55e' : s.up === false ? 'var(--accent)' : 'var(--text)' }}>
                {s.up === true ? '▲' : s.up === false ? '▼' : '—'} {s.change}
              </p>
            </div>
          ))}
        </div>
        <main style={{ flex: 1, padding: '1.5rem 2rem' }}>
          <Outlet />
        </main>
        <footer style={{ padding: '1rem 2rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text)', textAlign: 'right' }}>
          Panel Admin · Aitor © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
