import { useParams } from 'react-router-dom'
import datos from '../json/agsautocarabanas.json'
import { AutocaravanasCard } from '../components/agsAutocaravanasCard'

const iconos: Record<string, string> = {
  integrales: '🚌',
  perfiladas:  '🚐',
  campers:     '🚙',
  capuchinas:  '🏕️',
}

export const Autocaravanas = () => {
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
      <AutocaravanasCard items={filtrados} tipo={tipo!} />
    </section>
  )
}
