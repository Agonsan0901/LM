
const experiencias = [
  {
    empresa: 'Empresa ABC',
    puesto: 'Técnico de Implantación de Sistemas',
    periodo: '2023 - Actualidad',
    descripcion: 'Implantación y configuración de sistemas informáticos en entornos empresariales. Soporte técnico y resolución de incidencias.',
  },
  {
    empresa: 'Startup XYZ',
    puesto: 'Administrador de Base de Datos',
    periodo: '2021 - 2023',
    descripcion: 'Gestión y mantenimiento de bases de datos relacionales con MySQL y SQL Server. Optimización de consultas y copias de seguridad.',
  },
]

export const Home = () => {
  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Hola, soy <span style={{ color: 'var(--accent)' }}>Aitor</span> 👋</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginTop: '1rem' }}>
        Desarrollador web con experiencia en tecnologías modernas como React, TypeScript y Node.js.
        Me apasiona crear interfaces limpias, accesibles y con buena experiencia de usuario.
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <a href='/trabajos' style={{ padding: '0.6rem 1.4rem', background: 'var(--accent)', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>Ver trabajos</a>
        <a href='/contacto' style={{ padding: '0.6rem 1.4rem', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '6px', textDecoration: 'none' }}>Contacto</a>
      </div>
      <div style={{ marginTop: '3rem' }}>
        <h2>Tecnologías</h2>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'MySQL', 'Git'].map(tech => (
            <li key={tech} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.9rem' }}>{tech}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '3rem', textAlign: 'left' }}>
        <h2>Experiencia</h2>
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experiencias.map((exp) => (
            <div key={exp.empresa} style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
              <p style={{ fontWeight: 'bold', color: 'var(--text-h)', margin: 0 }}>{exp.puesto}</p>
              <p style={{ color: 'var(--accent)', margin: '0.2rem 0', fontSize: '0.95rem' }}>{exp.empresa} · {exp.periodo}</p>
              <p style={{ marginTop: '0.4rem' }}>{exp.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
