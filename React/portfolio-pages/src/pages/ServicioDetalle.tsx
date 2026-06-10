import { useParams, useNavigate } from 'react-router-dom'
import { serviciosData } from './Servicios'

export const ServicioDetalle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const servicio = serviciosData.find(s => s.id === Number(id))
  const otros = serviciosData.filter(s => s.id !== Number(id)).slice(0, 2)

  if (!servicio) return (
    <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--text)' }}>Servicio no encontrado.</p>
      <button onClick={() => navigate('/servicios')} style={{ marginTop: '1rem', cursor: 'pointer', color: 'var(--accent)', background: 'none', border: 'none', fontSize: '1rem' }}>← Volver</button>
    </section>
  )

  return (
    <div>
      {/* BREADCRUMB */}
      <div style={{ padding: '1.5rem 2rem 0', maxWidth: '900px', margin: '0 auto' }}>
        <button onClick={() => navigate('/servicios')} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '0.88rem', padding: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          ← Volver a Servicios
        </button>
      </div>

      {/* HERO */}
      <section style={{ padding: '2rem 2rem 3rem', maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
        <div>
          <div style={{ width: '56px', height: '56px', background: 'var(--accent-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '1.2rem' }}>
            {servicio.icono}
          </div>
          <h1 style={{ margin: '0 0 0.8rem' }}>{servicio.titulo}</h1>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text)', maxWidth: '560px' }}>{servicio.detalle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.5rem' }}>
            {servicio.tags.map(t => (
              <span key={t} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* PRECIO CARD */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--code-bg)', minWidth: '200px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.3rem', fontSize: '0.85rem', color: 'var(--text)' }}>Precio</p>
          <p style={{ margin: '0 0 1.2rem', fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent)' }}>{servicio.precio}</p>
          <a href='/contacto' style={{ display: 'block', padding: '0.7rem 1rem', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
            Solicitar servicio
          </a>
          <p style={{ margin: '0.8rem 0 0', fontSize: '0.78rem', color: 'var(--text)' }}>Sin compromiso · Respuesta en 24h</p>
        </div>
      </section>

      {/* OTROS SERVICIOS */}
      {otros.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--code-bg)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Otros servicios</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {otros.map(s => (
                <div
                  key={s.id}
                  onClick={() => navigate(`/servicios/${s.id}`)}
                  style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '1.2rem', cursor: 'pointer', background: 'var(--bg)', display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <span style={{ fontSize: '1.4rem' }}>{s.icono}</span>
                  <div>
                    <p style={{ margin: '0 0 0.3rem', fontWeight: '600', color: 'var(--text-h)', fontSize: '0.95rem' }}>{s.titulo}</p>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text)' }}>{s.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
