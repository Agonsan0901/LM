import { AutocaravanaCard } from './agsAutocaravanaCard'

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

type Props = { items: Autocaravana[]; tipo: string }

export const AutocaravanasCard = ({ items, tipo }: Props) => {
  if (items.length === 0)
    return <p style={{ color: 'var(--text)' }}>No hay modelos disponibles.</p>

  return (
    <div className="grid">
      {items.map((a) => <AutocaravanaCard key={a.cod} item={a} tipo={tipo} />)}
    </div>
  )
}
