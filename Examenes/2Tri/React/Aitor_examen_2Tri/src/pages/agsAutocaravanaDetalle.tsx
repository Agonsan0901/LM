import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import datos from '../json/agsautocarabanas.json'

export const AutocaravanaDetalle = () => {
  const { cod } = useParams<{ cod: string }>()
  const navigate = useNavigate()
  const item = datos.find((a) => a.cod === Number(cod))
  const [imgActiva, setImgActiva] = useState(0)

  if (!item) return <p style={{ padding: '2rem' }}>Autocaravana no encontrada.</p>

  return (
    <section style={{ padding: '2rem', maxWidth: '80%', margin: '0 auto' }}>
      <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>

      <div className="tarjeta detalle">
        <img
          src={item.imagenes[imgActiva]}
          alt={item.modelo}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />

        {/* Carrusel de miniaturas */}
        <div className="carrusel">
          {item.imagenes.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${item.modelo} ${i + 1}`}
              className={i === imgActiva ? 'miniatura activa' : 'miniatura'}
              onClick={() => setImgActiva(i)}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}
        </div>

        <div className="tarjeta-info">
          <h2>{item.marca} {item.modelo}</h2>

          {/* Descripción a 3 columnas */}
          <div className="descripcion-3col">
            <div>
              <p>👥 Personas</p>
              <strong>{item.personas}</strong>
            </div>
            <div>
              <p>⚡ Potencia</p>
              <strong>{item.potencia_cv} CV</strong>
            </div>
            <div>
              <p>💰 Precio</p>
              <strong>{item.precio_eur.toLocaleString('es-ES')} €</strong>
            </div>
            <div>
              <p>📏 Longitud</p>
              <strong>{item.medidas.longitud} m</strong>
            </div>
            <div>
              <p>↔ Anchura</p>
              <strong>{item.medidas.anchura} m</strong>
            </div>
            <div>
              <p>↕ Altura</p>
              <strong>{item.medidas.altura} m</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
