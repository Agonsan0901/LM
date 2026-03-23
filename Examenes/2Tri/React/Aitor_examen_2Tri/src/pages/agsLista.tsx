import datos from '../json/agsautocarabanas.json'
import { AgsTarjeta } from '../components/agsTarjeta'

export const AgsLista = ({ tipo }: { tipo: string }) => {
  const filtrados = datos.filter((a) => a.tipo === tipo)

  return (
    <div className="lista">
      <h1>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>
      {filtrados.length === 0
        ? <p>No hay modelos disponibles para esta categoría.</p>
        : <div className="grid">
            {filtrados.map((a) => (
              <AgsTarjeta key={a.cod} item={a} />
            ))}
          </div>
      }
    </div>
  )
}
