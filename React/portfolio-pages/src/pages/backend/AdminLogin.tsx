import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const USUARIO = 'Agonsan_090107'
const PASSWORD = '90?90?la'

export const AdminLogin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ usuario: '', password: '' })
  const [error, setError] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [verPassword, setVerPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setError(false)

    setTimeout(() => {
      if (form.usuario === USUARIO && form.password === PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true')
        navigate('/admin')
      } else {
        setError(true)
      }
      setCargando(false)
    }, 800)
  }

  const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: `1px solid ${error ? 'var(--accent)' : 'var(--border)'}`,
    background: 'var(--bg)',
    color: 'var(--text-h)',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box' as const,
    outline: 'none',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1rem' }}>

      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--accent-bg)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--accent-bg)', filter: 'blur(80px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', background: 'var(--accent)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 8px 24px rgba(165,0,68,0.3)', fontSize: '1.6rem' }}>
            ⚙️
          </div>
          <h1 style={{ margin: '0 0 0.3rem', fontSize: '1.5rem' }}>Panel Admin</h1>
          <p style={{ color: 'var(--text)', fontSize: '0.9rem', margin: 0 }}>Introduce tus credenciales para acceder</p>
        </div>

        <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-h)' }}>Usuario</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>👤</span>
                <input
                  required
                  type="text"
                  placeholder="Tu usuario"
                  value={form.usuario}
                  onChange={e => { setForm(f => ({ ...f, usuario: e.target.value })); setError(false) }}
                  style={{ ...inputStyle, paddingLeft: '2.5rem' }}
                  autoComplete="username"
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-h)' }}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔒</span>
                <input
                  required
                  type={verPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña"
                  value={form.password}
                  onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setError(false) }}
                  style={{ ...inputStyle, paddingLeft: '2.5rem', paddingRight: '3rem' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setVerPassword(v => !v)}
                  style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
                >
                  {verPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: '0.8rem 1rem', background: 'rgba(165,0,68,0.1)', border: '1px solid var(--accent-border)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⚠️ Usuario o contraseña incorrectos
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              style={{ padding: '0.85rem', background: cargando ? 'var(--border)' : 'var(--accent)', color: cargando ? 'var(--text)' : '#fff', border: 'none', borderRadius: '10px', cursor: cargando ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '1rem', boxShadow: cargando ? 'none' : '0 4px 14px rgba(165,0,68,0.3)', transition: 'all 0.2s', marginTop: '0.3rem' }}
            >
              {cargando ? '⏳ Verificando...' : 'Entrar al panel →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--text)' }}>
          ← <a href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '600' }}>Volver al sitio</a>
        </p>
      </div>
    </div>
  )
}
