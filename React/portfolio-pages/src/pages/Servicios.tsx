import { useNavigate } from 'react-router-dom'

const servicios = [
  {
    id: 1,
    icono: '🖥️',
    titulo: 'Implantación de Sistemas',
    descripcion: 'Instalación y configuración de sistemas informáticos en entornos empresariales.',
    detalle: 'Ofrezco un servicio completo de implantación de sistemas: análisis de necesidades, instalación de hardware y software, configuración de redes y servidores, y formación al personal. Trabajo con sistemas Windows Server, Linux y entornos virtualizados con VMware y Hyper-V.',
    tags: ['Windows Server', 'Linux', 'VMware', 'Hyper-V'],
    precio: 'Desde 300€',
  },
  {
    id: 2,
    icono: '🗄️',
    titulo: 'Gestión de Bases de Datos',
    descripcion: 'Administración, optimización y mantenimiento de bases de datos relacionales.',
    detalle: 'Gestión integral de bases de datos con MySQL y SQL Server: diseño de esquemas, optimización de consultas, copias de seguridad automatizadas, control de accesos y monitorización del rendimiento. También migraciones entre motores de base de datos.',
    tags: ['MySQL', 'SQL Server', 'Backups', 'Optimización'],
    precio: 'Desde 200€',
  },
  {
    id: 3,
    icono: '🔧',
    titulo: 'Soporte Técnico',
    descripcion: 'Resolución de incidencias y mantenimiento de infraestructura informática.',
    detalle: 'Servicio de soporte técnico presencial y remoto: diagnóstico y resolución de incidencias, mantenimiento preventivo de equipos, gestión de usuarios y permisos, y atención a usuarios finales. Respuesta rápida y soluciones duraderas.',
    tags: ['Presencial', 'Remoto', 'Mantenimiento', 'Incidencias'],
    precio: 'Desde 50€/h',
  },
  {
    id: 4,
    icono: '🌐',
    titulo: 'Desarrollo Web',
    descripcion: 'Creación de sitios web y aplicaciones modernas con React y TypeScript.',
    detalle: 'Desarrollo de aplicaciones web modernas con React, TypeScript y Node.js. Diseño responsive, accesible y optimizado para SEO. Integración con APIs y bases de datos.',
    tags: ['React', 'TypeScript', 'Node.js', 'MySQL'],
    precio: 'Desde 500€',
  },
]

const proceso = [
  { paso: '01', titulo: 'Consulta inicial', desc: 'Analizamos tus necesidades y definimos el alcance del proyecto.' },
  { paso: '02', titulo: 'Propuesta', desc: 'Elaboro una propuesta detallada con plazos y presupuesto.' },
  { paso: '03', titulo: 'Desarrollo', desc: 'Ejecuto el proyecto con actualizaciones periódicas.' },
  { paso: '04', titulo: 'Entrega', desc: 'Entrega final con documentación y soporte post-proyecto.' },
]

export const serviciosData = servicios

export const Servicios = () => {
  const navigate = useNavigate()
  return (
    <div>
      {/* HEADER */}
      <section style={{ padding: '4rem 2rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' }}>
          🛠️ Servicios
        </span>
        <h1 style={{ margin: '0 0 0.8rem' }}>¿En qué puedo ayudarte?</h1>
        <p style={{ color: 'var(--text)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '560px' }}>
          Ofrezco servicios profesionales en desarrollo web y administración de sistemas. Cada proyecto es único y recibe atención personalizada.
        </p>
      </section>

      {/* CARDS */}
      <section style={{ padding: '1rem 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
          {servicios.map(s => (
            <div
              key={s.id}
              onClick={() => navigate(`/servicios/${s.id}`)}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.6rem',
                background: 'var(--code-bg)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ width: '48px', height: '48px', background: 'var(--accent-bg)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                {s.icono}
              </div>
              <div>
                <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem' }}>{s.titulo}</h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: '1.6', margin: 0 }}>{s.descripcion}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {s.tags.map(t => (
                  <span key={t} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.2rem 0.55rem', borderRadius: '12px', fontSize: '0.75rem' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.8rem', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent)' }}>{s.precio}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>Ver más →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESO */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--code-bg)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '0.4rem' }}>Cómo trabajo</h2>
          <p style={{ color: 'var(--text)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Un proceso claro y transparente en cada proyecto.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {proceso.map(p => (
              <div key={p.paso} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent)', opacity: 0.4 }}>{p.paso}</span>
                <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-h)', fontSize: '0.95rem' }}>{p.titulo}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text)', lineHeight: '1.6' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.8rem' }}>¿Listo para empezar?</h2>
        <p style={{ color: 'var(--text)', marginBottom: '2rem' }}>Cuéntame tu proyecto y te preparo una propuesta sin compromiso.</p>
        <a href='/contacto' style={{ padding: '0.8rem 2rem', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          Solicitar presupuesto →
        </a>
      </section>
    </div>
  )
}
