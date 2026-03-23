import { useNavigate } from 'react-router-dom'

type Autocaravana = {
  cod: number
  marca: string
  modelo: string
  tipo: string
  personas: number
  potencia_cv: number
  precio_eur: number
  medidas: { longitud: number; anchura: number; altura: number }
  imagenes: string[]
}

type Props = { item: Autocaravana; tipo: string }

export const AutocaravanaCard = ({ item, tipo }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="tarjeta" onClick={() => navigate(`/${tipo}/${item.cod}`)}>
      <div className="tarjeta-img-wrap">
        <img src={item.imagenes[0]} alt={item.modelo} onError={(e) => (e.currentTarget.style.display = 'none')} />
        <span className="tarjeta-badge">{item.marca}</span>
      </div>
      <div className="tarjeta-info">
        <h2>{item.marca} {item.modelo}</h2>
        <div className="tarjeta-chips">
          <span>👥 {item.personas} pers.</span>
          <span>⚡ {item.potencia_cv} CV</span>
          <span>📐 {item.medidas.longitud}m</span>
        </div>
        <div className="tarjeta-footer">
          <p className="precio">{item.precio_eur.toLocaleString('es-ES')} €</p>
          <button className="btn-detalle" onClick={(e) => { e.stopPropagation(); navigate(`/${tipo}/${item.cod}`) }}>
            Ver detalle →
          </button>
        </div>
      </div>
    </div>
  )
}
