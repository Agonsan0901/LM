import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Ordenador } from '../../lib/types'

const vacío: Omit<Ordenador, 'id' | 'created_at'> = {
  nombre: '', marca: '', categoria: 'Portátil', precio: 0,
  descripcion: '', especificaciones: {}, imagen_url: '', stock: 0, destacado: false,
}

const categorias = ['Portátil', 'Sobremesa', 'Gaming']
const marcas = ['Apple', 'Dell', 'ASUS', 'Lenovo', 'HP', 'Custom']

export const AdminProductos = () => {
  const [items, setItems] = useState<Ordenador[]>([])
  const [cargando, setCargando] = useState(true)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState<Ordenador | null>(null)
  const [form, setForm] = useState(vacío)
  const [specsInput, setSpecsInput] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [eliminando, setEliminando] = useState<number | null>(null)
  const [exito, setExito] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const cargar = async () => {
    setCargando(true)
    const { data } = await supabase.from('ordenadores').select('*').order('id')
    if (data) setItems(data)
    setCargando(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => {
    setEditando(null); setForm(vacío)
    setSpecsInput(''); setError(null); setModal(true)
  }

  const abrirEditar = (p: Ordenador) => {
    setEditando(p)
    setForm({ nombre: p.nombre, marca: p.marca, categoria: p.categoria, precio: p.precio, descripcion: p.descripcion || '', especificaciones: p.especificaciones || {}, imagen_url: p.imagen_url || '', stock: p.stock, destacado: p.destacado })
    setSpecsInput(Object.entries(p.especificaciones || {}).map(([k, v]) => `${k}: ${v}`).join('\n'))
    setError(null); setModal(true)
  }

  const parsearSpecs = (texto: string) => {
    const obj: Record<string, string> = {}
    texto.split('\n').forEach(linea => {
      const [k, ...v] = linea.split(':')
      if (k && v.length) obj[k.trim()] = v.join(':').trim()
    })
    return obj
  }

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault(); setGuardando(true); setError(null)
    const datos = { ...form, especificaciones: parsearSpecs(specsInput) }
    if (editando?.id) {
      const { error } = await supabase.from('ordenadores').update(datos).eq('id', editando.id)
      if (error) { setError(error.message); setGuardando(false); return }
      setExito('Producto actualizado')
    } else {
      const { error } = await supabase.from('ordenadores').insert([datos])
      if (error) { setError(error.message); setGuardando(false); return }
      setExito('Producto creado')
    }
    setGuardando(false); setModal(false); cargar()
    setTimeout(() => setExito(null), 3000)
  }

  const eliminar = async (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return
    setEliminando(id)
    await supabase.from('ordenadores').delete().eq('id', id)
    setItems(i => i.filter(x => x.id !== id))
    setEliminando(null); setExito('Producto eliminado')
    setTimeout(() => setExito(null), 3000)
  }

  const inputStyle = { padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-h)', fontSize: '0.9rem', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' as const, outline: 'none' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Productos</h2>
          <p style={{ color: 'var(--text)', fontSize: '0.88rem', margin: '0.3rem 0 0' }}>Gestiona los ordenadores de la tienda.</p>
        </div>
        <button onClick={abrirNuevo} style={{ padding: '0.65rem 1.3rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(165,0,68,0.25)' }}>
          + Nuevo producto
        </button>
      </div>

      {exito && <div style={{ padding: '0.8rem 1.2rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', color: '#16a34a', fontSize: '0.88rem', marginBottom: '1.2rem' }}>✅ {exito}</div>}

      {cargando ? <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text)' }}>Cargando...</div> : (
        <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 2fr 1fr 1fr 80px 80px 120px', gap: '0.8rem', padding: '0.8rem 1.2rem', background: 'var(--code-bg)', borderBottom: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Img</span><span>Nombre</span><span>Categoría</span><span>Precio</span><span>Stock</span><span>Top</span><span style={{ textAlign: 'right' }}>Acciones</span>
          </div>
          {items.map((p, i) => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '60px 2fr 1fr 1fr 80px 80px 120px', gap: '0.8rem', padding: '0.8rem 1.2rem', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', background: i % 2 === 0 ? 'var(--bg)' : 'var(--code-bg)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'var(--accent-bg)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.imagen_url ? <img src={p.imagen_url} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>💻</span>}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-h)', fontSize: '0.88rem' }}>{p.nombre}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text)' }}>{p.marca}</p>
              </div>
              <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>{p.categoria}</span>
              <span style={{ fontWeight: '700', color: 'var(--text-h)', fontSize: '0.9rem' }}>{p.precio.toLocaleString('es-ES')}€</span>
              <span style={{ fontSize: '0.85rem', color: p.stock > 0 ? '#22c55e' : '#ef4444', fontWeight: '600' }}>{p.stock}</span>
              <span style={{ fontSize: '0.85rem' }}>{p.destacado ? '⭐' : '—'}</span>
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                <button onClick={() => abrirEditar(p)} style={{ padding: '0.35rem 0.7rem', background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-h)' }}>✏️</button>
                <button onClick={() => eliminar(p.id!)} disabled={eliminando === p.id} style={{ padding: '0.35rem 0.7rem', background: 'rgba(165,0,68,0.08)', border: '1px solid var(--accent-border)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--accent)' }}>
                  {eliminando === p.id ? '...' : '🗑️'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{editando ? '✏️ Editar producto' : '+ Nuevo producto'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text)' }}>✕</button>
            </div>
            <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Nombre *</label>
                  <input required value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Ej: MacBook Pro M3" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Marca *</label>
                  <select required value={form.marca} onChange={e => setForm(f => ({ ...f, marca: e.target.value }))} style={inputStyle}>
                    <option value="">Selecciona...</option>
                    {marcas.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Categoría *</label>
                  <select required value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} style={inputStyle}>
                    {categorias.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Precio (€) *</label>
                  <input required type="number" min={0} value={form.precio} onChange={e => setForm(f => ({ ...f, precio: Number(e.target.value) }))} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Stock</label>
                  <input type="number" min={0} value={form.stock} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Descripción</label>
                <textarea rows={2} value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Imagen URL</label>
                <input value={form.imagen_url} onChange={e => setForm(f => ({ ...f, imagen_url: e.target.value }))} placeholder="https://..." style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Especificaciones <span style={{ fontWeight: '400', color: 'var(--text)' }}>(una por línea: Clave: Valor)</span></label>
                <textarea rows={4} value={specsInput} onChange={e => setSpecsInput(e.target.value)} placeholder={'RAM: 16GB\nAlmacenamiento: 512GB SSD\nProcesador: Apple M3'} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.85rem' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input type="checkbox" id="destacado" checked={form.destacado} onChange={e => setForm(f => ({ ...f, destacado: e.target.checked }))} style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
                <label htmlFor="destacado" style={{ fontSize: '0.88rem', color: 'var(--text-h)', cursor: 'pointer' }}>⭐ Marcar como destacado</label>
              </div>
              {error && <div style={{ padding: '0.7rem 1rem', background: 'rgba(165,0,68,0.1)', border: '1px solid var(--accent-border)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent)' }}>⚠️ {error}</div>}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={guardando} style={{ flex: 1, padding: '0.75rem', background: guardando ? 'var(--border)' : 'var(--accent)', color: guardando ? 'var(--text)' : '#fff', border: 'none', borderRadius: '8px', cursor: guardando ? 'not-allowed' : 'pointer', fontWeight: '700' }}>
                  {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear producto'}
                </button>
                <button type="button" onClick={() => setModal(false)} style={{ padding: '0.75rem 1.2rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text)' }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
