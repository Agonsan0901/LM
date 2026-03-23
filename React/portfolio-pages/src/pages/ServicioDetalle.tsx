import { useParams, useNavigate } from 'react-router-dom'
import { serviciosData } from './Servicios'

export const ServicioDetalle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const servicio = serviciosData.find(s => s.id === Number(id))

  if (!servicio) return (
    <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <p>Servicio no encontrado.</p>
      <button onClick={() => navigate('/servicios')} style={{ marginTop: '1rem', cursor: 'pointer', color: 'var(--accent)', background: 'none', border: 'none', fontSize: '1rem' }}>← Volver</button>
    </section>
  )

  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/servicios')}
        style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.95rem', padding: 0, marginBottom: '2rem' }}
      >
        ← Volver a Servicios
      </button>
      <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem' }}>
        <h1 style={{ marginTop: 0 }}>{servicio.titulo}</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text)' }}>{servicio.detalle}</p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <a href='/contacto' style={{ padding: '0.6rem 1.4rem', background: 'var(--accent)', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>
          Solicitar este servicio
        </a>
      </div>
    </section>
  )
}
