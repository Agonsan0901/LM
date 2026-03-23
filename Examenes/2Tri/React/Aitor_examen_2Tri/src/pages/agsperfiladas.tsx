import datos from '../json/agsautocarabanas.json'
import { AgsTarjeta } from '../components/agsTarjeta'

export const AgsPerfiladas = () => {
  const filtrados = datos.filter((a) => a.tipo === 'perfiladas')

  return (
    <section style={{ padding: '2rem' }}>
      <h1>Perfiladas</h1>
      {filtrados.length === 0
        ? <p style={{ color: 'var(--text)' }}>No hay modelos disponibles.</p>
        : <div className="grid">
            {filtrados.map((a) => <AgsTarjeta key={a.cod} item={a} />)}
          </div>
      }
    </section>
  )
}
