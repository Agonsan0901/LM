import datos from '../json/agsautocarabanas.json'
import { AgsTarjeta } from '../components/agsTarjeta'

export const AgsCampers = () => {
  const filtrados = datos.filter((a) => a.tipo === 'campers')

  return (
    <section style={{ padding: '2rem' }}>
      <h1>Campers</h1>
      {filtrados.length === 0
        ? <p style={{ color: 'var(--text)' }}>No hay modelos disponibles.</p>
        : <div className="grid">
            {filtrados.map((a) => <AgsTarjeta key={a.cod} item={a} />)}
          </div>
      }
    </section>
  )
}
