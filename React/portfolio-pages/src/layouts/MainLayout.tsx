import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
      <header style={{ borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 100 }}>
        <NavBar />
      </header>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text)' }}>
        © {new Date().getFullYear()} Aitor · Todos los derechos reservados
      </footer>
    </>
  )
}
