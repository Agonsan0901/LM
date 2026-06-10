import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface Servicio {
  id?: number
  icono: string
  titulo: string
  descripcion: string
  detalle: string
  tags: string[]
  precio: string
  created_at?: string
}

const vacio: Omit<Servicio, 'id' | 'created_at'> = {
  icono: '🛠️', titulo: '', descripcion: '', detalle: '', tags: [], precio: ''
}

export const AdminServicios = () => {
  const [items, setItems] = useState<Servicio[]>([])
  const [cargando, setCargando] = useState(true)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState<Servicio | null>(null)
  const [form, setForm] = useState(vacio)
  const [tagsInput, setTagsInput] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [eliminando, setEliminando] = useState<number | null>(null)
  const [exito, setExito] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const cargar = async () => {
    setCargando(true)
    const { data } = await supabase.from('servicios').select('*').order('id')
    if (data) setItems(data)
    setCargando(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => { setEditando(null); setForm(vacio); setTagsInput(''); setError(null); setModal(true) }

  const abrirEditar = (s: Servicio) => {
    setEditando(s)
    setForm({ icono: s.icono, titulo: s.titulo, descripcion: s.descripcion, detalle: s.detalle, tags: s.tags, precio: s.precio })
    setTagsInput(s.tags.join(', '))
    setError(null); setModal(true)
  }

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault(); setGuardando(true); setError(null)
    const datos = { ...form, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) }
    if (editando?.id) {
      const { error } = await supabase.from('servicios').update(datos).eq('id', editando.id)
      if (error) { setError(error.message); setGuardando(false); return }
      setExito('Servicio actualizado')
    } else {
      const { error } = await supabase.from('servicios').insert([datos])
      if (error) { setError(error.message); setGuardando(false); return }
      setExito('Servicio creado')
    }
    setGuardando(false); setModal(false); cargar()
    setTimeout(() => setExito(null), 3000)
  }

  const eliminar = async (id: number) => {
    if (!confirm('¿Eliminar este servicio?')) return
    setEliminando(id)
    await supabase.from('servicios').delete().eq('id', id)
    setItems(i => i.filter(x => x.id !== id))
    setEliminando(null); setExito('Servicio eliminado')
    setTimeout(() => setExito(null), 3000)
  }

  const inputStyle = { padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-h)', fontSize: '0.9rem', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' as const, outline: 'none' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Servicios</h2>
          <p style={{ color: 'var(--text)', fontSize: '0.88rem', margin: '0.3rem 0 0' }}>Gestiona los servicios del portfolio.</p>
        </div>
        <button onClick={abrirNuevo} style={{ padding: '0.65rem 1.3rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 14px rgba(165,0,68,0.25)' }}>
          + Nuevo servicio
        </button>
      </div>

      {exito && <div style={{ padding: '0.8rem 1.2rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', color: '#16a34a', fontSize: '0.88rem', marginBottom: '1.2rem' }}>✅ {exito}</div>}

      {cargando ? <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text)' }}>Cargando...</div> : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', borderRadius: '12px', color: 'var(--text)' }}>
          <p style={{ fontSize: '2.5rem', margin: '0 0 0.8rem' }}>🛠️</p>
          <p>No hay servicios. Pulsa "+ Nuevo servicio" para añadir.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {items.map(s => (
            <div key={s.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.3rem', background: 'var(--code-bg)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>{s.icono}</span>
                  <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-h)', fontSize: '0.95rem' }}>{s.titulo}</p>
                </div>
                <span style={{ fontWeight: '700', color: 'var(--accent)', fontSize: '0.9rem', flexShrink: 0 }}>{s.precio}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text)', lineHeight: '1.5' }}>{s.descripcion}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {s.tags.map(t => <span key={t} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.1rem 0.5rem', borderRadius: '10px', fontSize: '0.72rem' }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.6rem', borderTop: '1px solid var(--border)' }}>
                <button onClick={() => abrirEditar(s)} style={{ flex: 1, padding: '0.4rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '7px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text-h)', fontWeight: '600' }}>✏️ Editar</button>
                <button onClick={() => eliminar(s.id!)} disabled={eliminando === s.id} style={{ padding: '0.4rem 0.8rem', background: 'rgba(165,0,68,0.08)', border: '1px solid var(--accent-border)', borderRadius: '7px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--accent)' }}>{eliminando === s.id ? '...' : '🗑️'}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{editando ? '✏️ Editar servicio' : '+ Nuevo servicio'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text)' }}>✕</button>
            </div>
            <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Icono</label>
                  <input value={form.icono} onChange={e => setForm(f => ({ ...f, icono: e.target.value }))} style={{ ...inputStyle, textAlign: 'center', fontSize: '1.4rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Título *</label>
                  <input required value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} placeholder="Ej: Desarrollo Web" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Descripción corta *</label>
                <input required value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Detalle completo</label>
                <textarea rows={3} value={form.detalle} onChange={e => setForm(f => ({ ...f, detalle: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Tags</label>
                  <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="React, Node.js..." style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Precio</label>
                  <input value={form.precio} onChange={e => setForm(f => ({ ...f, precio: e.target.value }))} placeholder="Desde 300€" style={inputStyle} />
                </div>
              </div>
              {error && <div style={{ padding: '0.7rem 1rem', background: 'rgba(165,0,68,0.1)', border: '1px solid var(--accent-border)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent)' }}>⚠️ {error}</div>}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={guardando} style={{ flex: 1, padding: '0.75rem', background: guardando ? 'var(--border)' : 'var(--accent)', color: guardando ? 'var(--text)' : '#fff', border: 'none', borderRadius: '8px', cursor: guardando ? 'not-allowed' : 'pointer', fontWeight: '700' }}>
                  {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear servicio'}
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
