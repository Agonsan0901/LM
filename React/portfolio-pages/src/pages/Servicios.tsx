import { useNavigate } from 'react-router-dom'

const servicios = [
  {
    id: 1,
    titulo: 'Implantación de Sistemas',
    descripcion: 'Instalación y configuración de sistemas informáticos en entornos empresariales.',
    detalle: 'Ofrezco un servicio completo de implantación de sistemas: análisis de necesidades, instalación de hardware y software, configuración de redes y servidores, y formación al personal. Trabajo con sistemas Windows Server, Linux y entornos virtualizados con VMware y Hyper-V.',
  },
  {
    id: 2,
    titulo: 'Gestión de Bases de Datos',
    descripcion: 'Administración, optimización y mantenimiento de bases de datos relacionales.',
    detalle: 'Gestión integral de bases de datos con MySQL y SQL Server: diseño de esquemas, optimización de consultas, copias de seguridad automatizadas, control de accesos y monitorización del rendimiento. También migraciones entre motores de base de datos.',
  },
  {
    id: 3,
    titulo: 'Soporte Técnico',
    descripcion: 'Resolución de incidencias y mantenimiento de infraestructura informática.',
    detalle: 'Servicio de soporte técnico presencial y remoto: diagnóstico y resolución de incidencias, mantenimiento preventivo de equipos, gestión de usuarios y permisos, y atención a usuarios finales. Respuesta rápida y soluciones duraderas.',
  },
]

export const serviciosData = servicios

export const Servicios = () => {
  const navigate = useNavigate()
  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Servicios</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {servicios.map(s => (
          <div
            key={s.id}
            onClick={() => navigate(`/servicios/${s.id}`)}
            style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem', borderLeft: '3px solid var(--accent)', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{s.titulo}</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text)', marginBottom: '1rem' }}>{s.descripcion}</p>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>Ver más →</span>
          </div>
        ))}
      </div>
    </section>
  )
}
