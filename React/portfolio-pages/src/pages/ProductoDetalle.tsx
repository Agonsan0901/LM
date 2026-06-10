import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Ordenador } from '../lib/types'

const iconoCategoria: Record<string, string> = {
  'Portátil': '💻',
  'Sobremesa': '🖥️',
  'Gaming': '🎮',
}

export const ProductoDetalle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState<Ordenador | null>(null)
  const [relacionados, setRelacionados] = useState<Ordenador[]>([])
  const [cargando, setCargando] = useState(true)
  const [cantidad, setCantidad] = useState(1)
  const [añadido, setAñadido] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const cargar = async () => {
      setCargando(true)
      setImgError(false)
      setCantidad(1)
      setAñadido(false)

      const { data } = await supabase.from('ordenadores').select('*').eq('id', id).single()
      if (data) {
        setProducto(data)
        const { data: rel } = await supabase
          .from('ordenadores')
          .select('*')
          .eq('categoria', data.categoria)
          .neq('id', data.id)
          .limit(3)
        if (rel) setRelacionados(rel)
      }
      setCargando(false)
    }
    cargar()
  }, [id])

  const handleAñadir = () => {
    setAñadido(true)
    setTimeout(() => setAñadido(false), 2500)
  }

  if (cargando) return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--text)' }}>
      <p style={{ fontSize: '2rem' }}>⏳</p>
      <p>Cargando producto...</p>
    </div>
  )

  if (!producto) return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--text)' }}>
      <p style={{ fontSize: '2rem' }}>❌</p>
      <p>Producto no encontrado.</p>
      <button onClick={() => navigate('/tienda')} style={{ marginTop: '1rem', padding: '0.6rem 1.4rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}>
        Volver a la tienda
      </button>
    </div>
  )

  return (
    <div>

      {/* BREADCRUMB */}
      <div style={{ padding: '1.5rem 2rem 0', maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text)' }}>
        <button onClick={() => navigate('/tienda')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '0.85rem', padding: 0, fontWeight: '600' }}>
          Tienda
        </button>
        <span>›</span>
        <span>{producto.categoria}</span>
        <span>›</span>
        <span style={{ color: 'var(--text-h)', fontWeight: '500' }}>{producto.nombre}</span>
      </div>

      {/* DETALLE PRINCIPAL */}
      <section style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="hero-grid">

        {/* IMAGEN */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div style={{ background: 'var(--accent-bg)', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            {producto.destacado && (
              <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'var(--accent)', color: '#fff', fontSize: '0.75rem', fontWeight: '700', padding: '0.25rem 0.7rem', borderRadius: '20px' }}>
                ⭐ Destacado
              </div>
            )}
            {producto.imagen_url && !imgError ? (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                onError={() => setImgError(true)}
                style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }}
              />
            ) : (
              <span style={{ fontSize: '8rem' }}>{iconoCategoria[producto.categoria] || '💻'}</span>
            )}
          </div>

          {/* BADGES INFO */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '1rem' }}>
            {[['🚚', 'Envío gratis en 24h'], ['🔒', 'Pago seguro'], ['↩️', '30 días devolución'], ['🛠️', '2 años garantía']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.8rem', background: 'var(--code-bg)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--text)' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.25rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', border: '1px solid var(--accent-border)' }}>
                {iconoCategoria[producto.categoria]} {producto.categoria}
              </span>
              <span style={{ background: 'var(--code-bg)', color: 'var(--text)', padding: '0.25rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem', border: '1px solid var(--border)' }}>
                {producto.marca}
              </span>
            </div>
            <h1 style={{ margin: '0 0 0.6rem', fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.2 }}>{producto.nombre}</h1>
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>{producto.descripcion}</p>
          </div>

          {/* PRECIO */}
          <div style={{ padding: '1.2rem', background: 'var(--code-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent)', letterSpacing: '-1px' }}>
                {producto.precio.toLocaleString('es-ES')}€
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text)', textDecoration: 'line-through' }}>
                {Math.round(producto.precio * 1.15).toLocaleString('es-ES')}€
              </span>
              <span style={{ background: '#22c55e', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '700' }}>-15%</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: producto.stock > 0 ? '#22c55e' : '#ef4444', fontWeight: '600' }}>
              {producto.stock > 0 ? `✓ En stock — ${producto.stock} unidades disponibles` : '✗ Sin stock'}
            </p>
          </div>

          {/* ESPECIFICACIONES */}
          {producto.especificaciones && Object.keys(producto.especificaciones).length > 0 && (
            <div>
              <p style={{ fontWeight: '700', color: 'var(--text-h)', margin: '0 0 0.8rem', fontSize: '0.9rem' }}>Especificaciones técnicas</p>
              <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                {Object.entries(producto.especificaciones).map(([k, v], i, arr) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 1rem', background: i % 2 === 0 ? 'var(--code-bg)' : 'var(--bg)', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{k}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-h)', fontWeight: '600' }}>{v as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAGS */}
          {producto.categoria && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {[producto.marca, producto.categoria, 'Garantía oficial', 'Envío gratis'].map(t => (
                <span key={t} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600' }}>{t}</span>
              ))}
            </div>
          )}

          {/* CANTIDAD + BOTONES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-h)' }}>Cantidad:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                <button onClick={() => setCantidad(c => Math.max(1, c - 1))} style={{ width: '36px', height: '36px', background: 'var(--code-bg)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-h)', fontWeight: '700' }}>−</button>
                <span style={{ padding: '0 1rem', fontWeight: '700', color: 'var(--text-h)', minWidth: '40px', textAlign: 'center' }}>{cantidad}</span>
                <button onClick={() => setCantidad(c => Math.min(producto.stock, c + 1))} style={{ width: '36px', height: '36px', background: 'var(--code-bg)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-h)', fontWeight: '700' }}>+</button>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>Total: <strong style={{ color: 'var(--accent)' }}>{(producto.precio * cantidad).toLocaleString('es-ES')}€</strong></span>
            </div>

            <button
              onClick={handleAñadir}
              disabled={producto.stock === 0}
              style={{ padding: '0.9rem', background: añadido ? '#22c55e' : producto.stock === 0 ? 'var(--border)' : 'var(--accent)', color: producto.stock === 0 ? 'var(--text)' : '#fff', border: 'none', borderRadius: '10px', cursor: producto.stock === 0 ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '1rem', transition: 'background 0.2s', boxShadow: producto.stock > 0 ? '0 4px 14px rgba(165,0,68,0.3)' : 'none' }}
            >
              {añadido ? '✓ Añadido al carrito' : producto.stock === 0 ? 'Sin stock' : `🛒 Añadir al carrito — ${(producto.precio * cantidad).toLocaleString('es-ES')}€`}
            </button>

            <button
              onClick={() => navigate('/contacto')}
              style={{ padding: '0.9rem', background: 'transparent', border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem' }}
            >
              💬 Consultar disponibilidad
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTOS RELACIONADOS */}
      {relacionados.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--code-bg)', padding: '3rem 2rem', marginTop: '3rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>También te puede interesar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.2rem' }}>
              {relacionados.map(r => (
                <div
                  key={r.id}
                  onClick={() => navigate(`/tienda/${r.id}`)}
                  style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg)', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ height: '130px', background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {r.imagen_url ? (
                      <img src={r.imagen_url} alt={r.nombre} style={{ maxWidth: '100%', maxHeight: '110px', objectFit: 'contain', padding: '0.5rem' }} />
                    ) : (
                      <span style={{ fontSize: '3rem' }}>{iconoCategoria[r.categoria] || '💻'}</span>
                    )}
                  </div>
                  <div style={{ padding: '0.9rem' }}>
                    <p style={{ margin: '0 0 0.3rem', fontWeight: '700', color: 'var(--text-h)', fontSize: '0.88rem', lineHeight: 1.3 }}>{r.nombre}</p>
                    <p style={{ margin: 0, fontWeight: '800', color: 'var(--accent)', fontSize: '1.05rem' }}>{r.precio.toLocaleString('es-ES')}€</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
