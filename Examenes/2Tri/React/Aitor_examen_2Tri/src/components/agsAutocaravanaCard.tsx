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
    <div className="tarjeta">
      <img src={item.imagenes[0]} alt={item.modelo} onError={(e) => (e.currentTarget.style.display = 'none')} />
      <div className="tarjeta-info">
        <h2>{item.marca} {item.modelo}</h2>
        <p>👥 {item.personas} personas &nbsp;|&nbsp; ⚡ {item.potencia_cv} CV</p>
        <p>📐 {item.medidas.longitud}m × {item.medidas.anchura}m × {item.medidas.altura}m</p>
        <p className="precio">{item.precio_eur.toLocaleString('es-ES')} €</p>
        <button className="btn-detalle" onClick={() => navigate(`/${tipo}/${item.cod}`)}>
          Ver detalle
        </button>
      </div>
    </div>
  )
}
