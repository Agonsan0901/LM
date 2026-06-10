import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Mensaje } from '../lib/types'

const infoContacto = [
  { icono: '📧', label: 'Email', valor: 'aitor@email.com' },
  { icono: '📍', label: 'Ubicación', valor: 'España' },
  { icono: '⏱️', label: 'Respuesta', valor: 'En menos de 24h' },
  { icono: '💼', label: 'Disponibilidad', valor: 'Abierto a proyectos' },
]

export const Contacto = () => {
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<Mensaje>({ nombre: '', email: '', asunto: '', mensaje: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setError(null)

    const { error: sbError } = await supabase
      .from('mensajes')
      .insert([{ nombre: form.nombre, email: form.email, asunto: form.asunto, mensaje: form.mensaje }])

    setCargando(false)

    if (sbError) {
      setError('Error al enviar el mensaje. Inténtalo de nuevo.')
      return
    }

    setEnviado(true)
    setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
  }

  const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--code-bg)',
    color: 'var(--text-h)',
    outline: 'none',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box' as const,
  }

  return (
    <div>
      <section style={{ padding: '4rem 2rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem', border: '1px solid var(--accent-border)' }}>
          📬 Contacto
        </span>
        <h1 style={{ margin: '0 0 0.8rem' }}>Hablemos</h1>
        <p style={{ color: 'var(--text)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '500px' }}>
          ¿Tienes un proyecto en mente o quieres colaborar? Escríbeme y te respondo en menos de 24 horas.
        </p>
      </section>

      <section style={{ padding: '1rem 2rem 4rem', maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }} className="contacto-grid">

        {/* FORMULARIO */}
        {enviado ? (
          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '3rem', textAlign: 'center', background: 'var(--code-bg)' }}>
            <span style={{ fontSize: '3rem' }}>✅</span>
            <h2 style={{ margin: '1rem 0 0.5rem' }}>¡Mensaje enviado!</h2>
            <p style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>Gracias por contactarme. Te responderé en menos de 24 horas.</p>
            <button onClick={() => setEnviado(false)} style={{ padding: '0.6rem 1.4rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}>
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-h)' }}>Nombre *</label>
                <input required type='text' placeholder='Tu nombre' value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-h)' }}>Email *</label>
                <input required type='email' placeholder='tu@email.com' value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-h)' }}>Asunto *</label>
              <input required type='text' placeholder='¿En qué puedo ayudarte?' value={form.asunto} onChange={e => setForm(f => ({ ...f, asunto: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-h)' }}>Mensaje *</label>
              <textarea required placeholder='Cuéntame los detalles de tu proyecto...' rows={6} value={form.mensaje} onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {error && (
              <div style={{ padding: '0.8rem 1rem', background: 'rgba(165,0,68,0.1)', border: '1px solid var(--accent-border)', borderRadius: '8px', fontSize: '0.88rem', color: 'var(--accent)' }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type='submit'
              disabled={cargando}
              style={{ padding: '0.8rem', background: cargando ? 'var(--border)' : 'var(--accent)', color: cargando ? 'var(--text)' : '#fff', border: 'none', borderRadius: '8px', cursor: cargando ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: '700', transition: 'opacity 0.15s' }}
            >
              {cargando ? 'Enviando...' : 'Enviar mensaje →'}
            </button>
          </form>
        )}

        {/* INFO LATERAL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--code-bg)' }}>
            <h2 style={{ margin: '0 0 1.2rem', fontSize: '1rem' }}>Información de contacto</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {infoContacto.map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icono}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text)' }}>{item.label}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-h)', fontWeight: '500' }}>{item.valor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--code-bg)' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Redes sociales</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[['GitHub', '🐙', 'https://github.com'], ['LinkedIn', '💼', 'https://linkedin.com']].map(([label, icon, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.8rem', border: '1px solid var(--border)', borderRadius: '8px', textDecoration: 'none', color: 'var(--text-h)', fontSize: '0.88rem', background: 'var(--bg)' }}>
                  <span>{icon}</span> {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
