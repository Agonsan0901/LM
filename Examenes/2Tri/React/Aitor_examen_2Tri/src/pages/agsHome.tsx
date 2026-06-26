import { useNavigate } from 'react-router-dom'
import tipos from '../json/agstipos.json'

const iconos: Record<string, string> = {
  Integrales: '🚌',
  Perfiladas: '🚐',
  Campers:    '🚙',
  Capuchinas: '🏕️',
}

const descripciones: Record<string, string> = {
  Integrales: 'Máximo confort y espacio. Cabina integrada con el habitáculo.',
  Perfiladas: 'Equilibrio perfecto entre tamaño y prestaciones.',
  Campers:    'Compactas y versátiles. Ideales para cualquier aventura.',
  Capuchinas: 'Cama sobre la cabina. Más plazas para toda la familia.',
}

export const AgsHome = () => {
  const navigate = useNavigate()

  return (
    <div className="home">

      <div className="home-hero">
        <span className="home-hero-icon">🚐</span>
        <h1>Encuentra tu autocaravana ideal</h1>
        <p>Explora nuestra selección de modelos por categoría y descubre el vehículo perfecto para tu próxima aventura.</p>
      </div>

      <section className="home-categorias">
        {tipos.map((t) => (
          <button key={t.id} className="home-cat-card" onClick={() => navigate(t.ruta)}>
            <span className="home-cat-icon">{iconos[t.nombre]}</span>
            <h2>{t.nombre}</h2>
            <p>{descripciones[t.nombre]}</p>
            <span className="home-cat-link">Ver modelos →</span>
          </button>
        ))}
      </section>

      <div className="home-stats">
        <div><strong>18</strong><span>modelos disponibles</span></div>
        <div><strong>4</strong><span>categorías</span></div>
        <div><strong>8</strong><span>marcas</span></div>
      </div>

    </div>
  )
}
