import { useParams } from 'react-router-dom'
import datos from '../json/agsautocarabanas.json'
import { AgsAutocaravanasCard } from '../components/agsAutocaravanasCard'

const iconos: Record<string, string> = {
  integrales: '🚌',
  perfiladas:  '🚐',
  campers:     '🚙',
  capuchinas:  '🏕️',
}

export const AgsAutocaravanas = () => {
  const { tipo } = useParams<{ tipo: string }>()
  const filtrados = datos.filter((a) => a.tipo === tipo)

  return (
    <section className="listado">
      <div className="listado-header">
        <span className="listado-icon">{iconos[tipo!] ?? '🚐'}</span>
        <div>
          <h1 style={{ textTransform: 'capitalize' }}>{tipo}</h1>
          <p>{filtrados.length} modelo{filtrados.length !== 1 ? 's' : ''} disponible{filtrados.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <AgsAutocaravanasCard items={filtrados} tipo={tipo!} />
    </section>
  )
}
