import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Ordenador } from '../lib/types'

const categorias = ['Todos', 'Portátil', 'Sobremesa', 'Gaming']

const iconoCategoria: Record<string, string> = {
  'Portátil': '💻',
  'Sobremesa': '🖥️',
  'Gaming': '🎮',
}

const marcas = ['Todas', 'Apple', 'Dell', 'ASUS', 'Lenovo', 'HP', 'Custom']

type Carrito = { ordenador: Ordenador; cantidad: number }

export const Tienda = () => {
  const navigate = useNavigate()
  const [ordenadores, setOrdenadores] = useState<Ordenador[]>([])
  const [cargando, setCargando] = useState(true)
  const [categoria, setCategoria] = useState('Todos')
  const [marca, setMarca] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('destacado')
  const [carrito, setCarrito] = useState<Carrito[]>([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [precioMax, setPrecioMax] = useState(3000)

  useEffect(() => {
    const fetchOrdenadores = async () => {
      const { data, error } = await supabase
        .from('ordenadores')
        .select('*')
      if (!error && data) setOrdenadores(data)
      setCargando(false)
    }
    fetchOrdenadores()
  }, [])

  const filtrados = ordenadores
    .filter(o => categoria === 'Todos' || o.categoria === categoria)
    .filter(o => marca === 'Todas' || o.marca === marca)
    .filter(o => o.precio <= precioMax)
    .filter(o => o.nombre.toLowerCase().includes(busqueda.toLowerCase()) || o.marca.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => {
      if (orden === 'destacado') return Number(b.destacado) - Number(a.destacado)
      if (orden === 'precio-asc') return a.precio - b.precio
      if (orden === 'precio-desc') return b.precio - a.precio
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre)
      return 0
    })

  const añadirCarrito = (o: Ordenador) => {
    setCarrito(c => {
      const existe = c.find(i => i.ordenador.id === o.id)
      if (existe) return c.map(i => i.ordenador.id === o.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      return [...c, { ordenador: o, cantidad: 1 }]
    })
  }

  const quitarCarrito = (id: number) => setCarrito(c => c.filter(i => i.ordenador.id !== id))

  const totalCarrito = carrito.reduce((acc, i) => acc + i.ordenador.precio * i.cantidad, 0)
  const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0)

  return (
    <div>

      {/* HERO */}
      <section style={{ padding: '4rem 2rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '1rem', border: '1px solid var(--accent-border)' }}>
          🖥️ Tienda de ordenadores
        </span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ margin: '0 0 0.5rem' }}>Ordenadores</h1>
            <p style={{ color: 'var(--text)', fontSize: '1rem' }}>Los mejores equipos al mejor precio. Envío gratuito en 24h.</p>
          </div>
          {/* CARRITO BOTÓN */}
          <button
            onClick={() => setCarritoAbierto(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 1.3rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem', position: 'relative', boxShadow: '0 4px 14px rgba(165,0,68,0.3)' }}
          >
            🛒 Carrito
            {totalItems > 0 && (
              <span style={{ background: '#fff', color: 'var(--accent)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800' }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </section>

      <section style={{ padding: '1rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem', alignItems: 'start' }} className="tienda-grid">

        {/* SIDEBAR FILTROS */}
        <aside className="tienda-sidebar" style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.4rem', background: 'var(--code-bg)', position: 'sticky', top: '80px' }}>
          <p style={{ fontWeight: '700', color: 'var(--text-h)', margin: '0 0 1rem', fontSize: '0.9rem' }}>Filtros</p>

          <div style={{ marginBottom: '1.4rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text)', margin: '0 0 0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categoría</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {categorias.map(c => (
                <button key={c} onClick={() => setCategoria(c)} style={{ padding: '0.45rem 0.8rem', borderRadius: '7px', border: 'none', background: categoria === c ? 'var(--accent-bg)' : 'transparent', color: categoria === c ? 'var(--accent)' : 'var(--text)', fontWeight: categoria === c ? '700' : 'normal', cursor: 'pointer', textAlign: 'left', fontSize: '0.88rem', borderLeft: categoria === c ? '3px solid var(--accent)' : '3px solid transparent' }}>
                  {c !== 'Todos' ? iconoCategoria[c] + ' ' : ''}{c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.4rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text)', margin: '0 0 0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Marca</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {marcas.map(m => (
                <button key={m} onClick={() => setMarca(m)} style={{ padding: '0.45rem 0.8rem', borderRadius: '7px', border: 'none', background: marca === m ? 'var(--accent-bg)' : 'transparent', color: marca === m ? 'var(--accent)' : 'var(--text)', fontWeight: marca === m ? '700' : 'normal', cursor: 'pointer', textAlign: 'left', fontSize: '0.88rem', borderLeft: marca === m ? '3px solid var(--accent)' : '3px solid transparent' }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text)', margin: '0 0 0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Precio máx: <span style={{ color: 'var(--accent)' }}>{precioMax}€</span>
            </p>
            <input type="range" min={300} max={3000} step={100} value={precioMax} onChange={e => setPrecioMax(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text)', marginTop: '0.3rem' }}>
              <span>300€</span><span>3.000€</span>
            </div>
          </div>

          <button onClick={() => { setCategoria('Todos'); setMarca('Todas'); setPrecioMax(3000); setBusqueda('') }}
            style={{ marginTop: '1.2rem', width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '7px', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '0.82rem' }}>
            Limpiar filtros
          </button>
        </aside>

        {/* PRODUCTOS */}
        <div>
          {/* BARRA BÚSQUEDA Y ORDEN */}
          <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Buscar ordenador..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ flex: 1, minWidth: '180px', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)', fontSize: '0.9rem', outline: 'none' }}
            />
            <select value={orden} onChange={e => setOrden(e.target.value)}
              style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)', fontSize: '0.88rem', cursor: 'pointer', outline: 'none' }}>
              <option value="destacado">Destacados primero</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
            <span style={{ alignSelf: 'center', fontSize: '0.85rem', color: 'var(--text)' }}>{filtrados.length} producto{filtrados.length !== 1 ? 's' : ''}</span>
          </div>

          {cargando ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text)' }}>Cargando productos...</div>
          ) : filtrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text)' }}>
              <p style={{ fontSize: '2rem' }}>🔍</p>
              <p>No se encontraron productos con esos filtros.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.2rem' }}>
              {filtrados.map(o => (
                <div key={o.id}
                  onClick={() => navigate(`/tienda/${o.id}`)}
                  style={{ border: o.destacado ? '2px solid var(--accent)' : '1px solid var(--border)', borderRadius: '14px', background: 'var(--code-bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s, transform 0.2s', position: 'relative', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {o.destacado && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--accent)', color: '#fff', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>⭐ Destacado</div>
                  )}
                  {/* Imagen */}
                  <div style={{ height: '180px', background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {o.imagen_url ? (
                      <img
                        src={o.imagen_url}
                        alt={o.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.8rem' }}
                        onError={e => {
                          const img = e.currentTarget
                          img.style.display = 'none'
                          const fallback = img.nextElementSibling as HTMLElement | null
                          if (fallback) fallback.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div style={{ display: o.imagen_url ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: '4rem' }}>
                      {iconoCategoria[o.categoria] || '💻'}
                    </div>
                  </div>
                  <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <p style={{ fontWeight: '700', color: 'var(--text-h)', margin: 0, fontSize: '0.95rem', lineHeight: '1.3' }}>{o.nombre}</p>
                      <span style={{ fontSize: '0.75rem', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.15rem 0.5rem', borderRadius: '20px', flexShrink: 0, fontWeight: '600' }}>{o.categoria}</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text)', margin: 0 }}>{o.descripcion}</p>

                    {/* Especificaciones */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.3rem' }}>
                      {Object.entries(o.especificaciones || {}).slice(0, 3).map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                          <span style={{ color: 'var(--text)' }}>{k}</span>
                          <span style={{ color: 'var(--text-h)', fontWeight: '600' }}>{v as string}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '0.8rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-h)', letterSpacing: '-0.5px' }}>{o.precio.toLocaleString('es-ES')}€</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: o.stock > 0 ? '#22c55e' : '#ef4444' }}>
                          {o.stock > 0 ? `✓ ${o.stock} en stock` : '✗ Sin stock'}
                        </p>
                      </div>
                      <button
                        onClick={() => añadirCarrito(o)}
                        disabled={o.stock === 0}
                        style={{ padding: '0.5rem 1rem', background: o.stock === 0 ? 'var(--border)' : 'var(--accent)', color: o.stock === 0 ? 'var(--text)' : '#fff', border: 'none', borderRadius: '8px', cursor: o.stock === 0 ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '0.82rem', transition: 'opacity 0.15s' }}
                        onMouseEnter={e => { if (o.stock > 0) e.currentTarget.style.opacity = '0.85' }}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        🛒 Añadir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CARRITO MODAL */}
      {carritoAbierto && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex' }}>
          <div onClick={() => setCarritoAbierto(false)} style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ width: '380px', background: 'var(--bg)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '1.5rem', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem' }}>🛒 Carrito ({totalItems})</h2>
              <button onClick={() => setCarritoAbierto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text)' }}>✕</button>
            </div>

            {carrito.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', gap: '1rem' }}>
                <span style={{ fontSize: '3rem' }}>🛒</span>
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {carrito.map(({ ordenador: o, cantidad }) => (
                    <div key={o.id} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', padding: '0.8rem', background: 'var(--code-bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '1.8rem' }}>{iconoCategoria[o.categoria]}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-h)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.nombre}</p>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '600' }}>{(o.precio * cantidad).toLocaleString('es-ES')}€ × {cantidad}</p>
                      </div>
                      <button onClick={() => quitarCarrito(o.id!)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontSize: '1rem', padding: '0.2rem' }}>🗑️</button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-h)' }}>Total</span>
                    <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent)' }}>{totalCarrito.toLocaleString('es-ES')}€</span>
                  </div>
                  <button style={{ width: '100%', padding: '0.85rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', boxShadow: '0 4px 14px rgba(165,0,68,0.3)', marginBottom: '0.6rem' }}>
                    Finalizar compra →
                  </button>
                  <button onClick={() => setCarrito([])} style={{ width: '100%', padding: '0.6rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', color: 'var(--text)', fontSize: '0.85rem' }}>
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
