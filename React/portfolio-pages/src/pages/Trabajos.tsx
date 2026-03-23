
const proyectos = [
  {
    id: 1,
    titulo: 'Portfolio personal',
    descripcion: 'Portfolio desarrollado con React, TypeScript y React Router.',
    tecnologias: ['React', 'TypeScript', 'CSS'],
  },
  {
    id: 2,
    titulo: 'Tienda online',
    descripcion: 'E-commerce con carrito de compras, filtros y pasarela de pago.',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  },
  {
    id: 3,
    titulo: 'Red de fibra óptica',
    descripcion: 'Gestión y monitorización de infraestructura de red de fibra óptica.',
    tecnologias: ['Fusionadora', 'Cables de red'],
  },
]

export const Trabajos = () => {
  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Mis Trabajos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {proyectos.map(p => (
          <div key={p.id} style={{ border: '1px solid #333', borderRadius: '10px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{p.titulo}</h2>
            <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '1rem' }}>{p.descripcion}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {p.tecnologias.map(t => (
                <span key={t} style={{ background: '#646cff22', color: '#646cff', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
