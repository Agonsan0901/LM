import { useParams } from 'react-router-dom'
import datos from '../json/agsautocarabanas.json'
import { AutocaravanasCard } from '../components/agsAutocaravanasCard'

export const Autocaravanas = () => {
  const { tipo } = useParams<{ tipo: string }>()
  const filtrados = datos.filter((a) => a.tipo === tipo)

  return (
    <section style={{ padding: '2rem' }}>
      <h1 style={{ textTransform: 'capitalize' }}>{tipo}</h1>
      <AutocaravanasCard items={filtrados} tipo={tipo!} />
    </section>
  )
}
