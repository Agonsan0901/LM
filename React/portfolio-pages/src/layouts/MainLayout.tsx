import { NavBar } from '../components/NavBar'
import { Link, Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
      <header style={{ borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 100, backdropFilter: 'blur(8px)' }}>
        <NavBar />
      </header>

      <main style={{ flex: 1, textAlign: 'left' }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 2rem 2rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <span style={{ width: '28px', height: '28px', background: 'var(--accent)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '0.85rem' }}>A</span>
              <span style={{ fontWeight: 'bold', color: 'var(--text-h)' }}>Aitor González Sánchez<span style={{ color: 'var(--accent)' }}>.</span></span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text)' }}>Desarrollador web y técnico de sistemas. Disponible para proyectos freelance.</p>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: 'var(--text-h)', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Navegación</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[['/', 'Home'], ['/tienda', 'Tienda'], ['/trabajos', 'Trabajos'], ['/servicios', 'Servicios'], ['/ventas', 'Precios'], ['/contacto', 'Contacto']].map(([to, label]) => (
                <Link key={to} to={to} style={{ fontSize: '0.85rem', color: 'var(--text)', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: 'var(--text-h)', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Contacto</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text)' }}>
              <span>📧 aitor@email.com</span>
              <span>📍 España</span>
              <span>💼 Disponible</span>
            </div>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: 'var(--text-h)', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Redes</p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[['GitHub', 'https://github.com'], ['LinkedIn', 'https://linkedin.com']].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                  padding: '0.35rem 0.8rem', border: '1px solid var(--border)', borderRadius: '6px',
                  fontSize: '0.8rem', color: 'var(--text)', textDecoration: 'none',
                }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '900px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text)' }}>
          <span>© {new Date().getFullYear()} Aitor · Todos los derechos reservados</span>
          <Link to="/admin/login" style={{ fontSize: '0.8rem', color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            ⚙️ Panel Admin
          </Link>
        </div>
      </footer>
    </>
  )
}
