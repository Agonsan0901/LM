import { useState } from 'react'

const proyectos = [
  {
    id: 1,
    titulo: 'Portfolio personal',
    descripcion: 'Portfolio desarrollado con React, TypeScript y React Router. Diseño responsive con modo oscuro.',
    tecnologias: ['React', 'TypeScript', 'CSS'],
    categoria: 'Web',
    estado: 'Completado',
    link: '#',
  },
  {
    id: 2,
    titulo: 'Tienda online',
    descripcion: 'E-commerce con carrito de compras, filtros por categoría y pasarela de pago integrada.',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    categoria: 'Web',
    estado: 'Completado',
    link: '#',
  },
  {
    id: 3,
    titulo: 'Red de fibra óptica',
    descripcion: 'Diseño, instalación y monitorización de infraestructura de red de fibra óptica para empresa.',
    tecnologias: ['Redes', 'Fibra óptica', 'Fusionadora'],
    categoria: 'Sistemas',
    estado: 'Completado',
    link: '#',
  },
  {
    id: 4,
    titulo: 'Panel de administración',
    descripcion: 'Dashboard de gestión con estadísticas en tiempo real, gestión de usuarios y roles.',
    tecnologias: ['React', 'TypeScript', 'Node.js', 'MySQL'],
    categoria: 'Web',
    estado: 'En progreso',
    link: '#',
  },
  {
    id: 5,
    titulo: 'Servidor Linux corporativo',
    descripcion: 'Configuración y administración de servidor Linux con servicios web, DNS y correo.',
    tecnologias: ['Linux', 'Apache', 'DNS', 'Postfix'],
    categoria: 'Sistemas',
    estado: 'Completado',
    link: '#',
  },
]

const categorias = ['Todos', 'Web', 'Sistemas']

export const Trabajos = () => {
  const [filtro, setFiltro] = useState('Todos')

  const filtrados = filtro === 'Todos' ? proyectos : proyectos.filter(p => p.categoria === filtro)

  return (
    <div>
      {/* HEADER */}
      <section style={{ padding: '4rem 2rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' }}>
          💼 Proyectos
        </span>
        <h1 style={{ margin: '0 0 0.8rem' }}>Mis Trabajos</h1>
        <p style={{ color: 'var(--text)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '560px' }}>
          Una selección de proyectos web y de sistemas que he desarrollado a lo largo de mi carrera.
        </p>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                background: filtro === cat ? 'var(--accent)' : 'transparent',
                color: filtro === cat ? '#fff' : 'var(--text)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: filtro === cat ? '600' : 'normal',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text)', alignSelf: 'center' }}>
            {filtrados.length} proyecto{filtrados.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* GRID */}
      <section style={{ padding: '1rem 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
          {filtrados.map(p => (
            <div
              key={p.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.5rem',
                background: 'var(--code-bg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.75rem', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: '600' }}>
                  {p.categoria}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '20px',
                  background: p.estado === 'Completado' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                  color: p.estado === 'Completado' ? '#16a34a' : '#ca8a04',
                  fontWeight: '600',
                }}>
                  {p.estado === 'Completado' ? '✓ ' : '⏳ '}{p.estado}
                </span>
              </div>

              <div>
                <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem' }}>{p.titulo}</h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: '1.6', margin: 0 }}>{p.descripcion}</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
                {p.tecnologias.map(t => (
                  <span key={t} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.2rem 0.55rem', borderRadius: '12px', fontSize: '0.78rem' }}>{t}</span>
                ))}
              </div>

              <a href={p.link} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: '500', marginTop: '0.3rem' }}>
                Ver proyecto →
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
