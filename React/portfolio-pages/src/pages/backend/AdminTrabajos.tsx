import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface Trabajo {
  id?: number
  titulo: string
  descripcion: string
  tecnologias: string[]
  categoria: string
  estado: string
  link: string
  created_at?: string
}

const vacio: Omit<Trabajo, 'id' | 'created_at'> = {
  titulo: '', descripcion: '', tecnologias: [], categoria: 'Web', estado: 'Completado', link: ''
}

export const AdminTrabajos = () => {
  const [items, setItems] = useState<Trabajo[]>([])
  const [cargando, setCargando] = useState(true)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState<Trabajo | null>(null)
  const [form, setForm] = useState(vacio)
  const [techInput, setTechInput] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [eliminando, setEliminando] = useState<number | null>(null)
  const [exito, setExito] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const cargar = async () => {
    setCargando(true)
    const { data } = await supabase.from('trabajos').select('*').order('id')
    if (data) setItems(data)
    setCargando(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => { setEditando(null); setForm(vacio); setTechInput(''); setError(null); setModal(true) }

  const abrirEditar = (t: Trabajo) => {
    setEditando(t)
    setForm({ titulo: t.titulo, descripcion: t.descripcion, tecnologias: t.tecnologias, categoria: t.categoria, estado: t.estado, link: t.link })
    setTechInput(t.tecnologias.join(', '))
    setError(null); setModal(true)
  }

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault(); setGuardando(true); setError(null)
    const datos = { ...form, tecnologias: techInput.split(',').map(t => t.trim()).filter(Boolean) }
    if (editando?.id) {
      const { error } = await supabase.from('trabajos').update(datos).eq('id', editando.id)
      if (error) { setError(error.message); setGuardando(false); return }
      setExito('Trabajo actualizado')
    } else {
      const { error } = await supabase.from('trabajos').insert([datos])
      if (error) { setError(error.message); setGuardando(false); return }
      setExito('Trabajo creado')
    }
    setGuardando(false); setModal(false); cargar()
    setTimeout(() => setExito(null), 3000)
  }

  const eliminar = async (id: number) => {
    if (!confirm('¿Eliminar este trabajo?')) return
    setEliminando(id)
    await supabase.from('trabajos').delete().eq('id', id)
    setItems(i => i.filter(x => x.id !== id))
    setEliminando(null); setExito('Trabajo eliminado')
    setTimeout(() => setExito(null), 3000)
  }

  const inputStyle = { padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-h)', fontSize: '0.9rem', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' as const, outline: 'none' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Trabajos</h2>
          <p style={{ color: 'var(--text)', fontSize: '0.88rem', margin: '0.3rem 0 0' }}>Gestiona los proyectos del portfolio.</p>
        </div>
        <button onClick={abrirNuevo} style={{ padding: '0.65rem 1.3rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 14px rgba(165,0,68,0.25)' }}>
          + Nuevo trabajo
        </button>
      </div>

      {exito && <div style={{ padding: '0.8rem 1.2rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', color: '#16a34a', fontSize: '0.88rem', marginBottom: '1.2rem' }}>✅ {exito}</div>}

      {cargando ? <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text)' }}>Cargando...</div> : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', borderRadius: '12px', color: 'var(--text)' }}>
          <p style={{ fontSize: '2.5rem', margin: '0 0 0.8rem' }}>📁</p>
          <p>No hay trabajos. Pulsa "+ Nuevo trabajo" para añadir.</p>
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 100px 110px', gap: '1rem', padding: '0.8rem 1.2rem', background: 'var(--code-bg)', borderBottom: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Título</span><span>Descripción</span><span>Categoría</span><span>Estado</span><span style={{ textAlign: 'right' }}>Acciones</span>
          </div>
          {items.map((t, i) => (
            <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 100px 110px', gap: '1rem', padding: '1rem 1.2rem', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', background: i % 2 === 0 ? 'var(--bg)' : 'var(--code-bg)' }}>
              <div>
                <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-h)', fontSize: '0.9rem' }}>{t.titulo}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.4rem' }}>
                  {t.tecnologias.slice(0, 3).map(tech => <span key={tech} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.1rem 0.5rem', borderRadius: '10px', fontSize: '0.72rem' }}>{tech}</span>)}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text)', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{t.descripcion}</p>
              <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>{t.categoria}</span>
              <span style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', background: t.estado === 'Completado' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)', color: t.estado === 'Completado' ? '#16a34a' : '#ca8a04' }}>{t.estado}</span>
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                <button onClick={() => abrirEditar(t)} style={{ padding: '0.35rem 0.7rem', background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>✏️</button>
                <button onClick={() => eliminar(t.id!)} disabled={eliminando === t.id} style={{ padding: '0.35rem 0.7rem', background: 'rgba(165,0,68,0.08)', border: '1px solid var(--accent-border)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--accent)' }}>{eliminando === t.id ? '...' : '🗑️'}</button>
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
              <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{editando ? '✏️ Editar trabajo' : '+ Nuevo trabajo'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text)' }}>✕</button>
            </div>
            <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Título *</label>
                <input required value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} placeholder="Ej: Portfolio personal" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Descripción *</label>
                <textarea required rows={3} value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Categoría</label>
                  <select value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} style={inputStyle}>
                    {['Web', 'Sistemas', 'Mobile', 'Otro'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Estado</label>
                  <select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))} style={inputStyle}>
                    {['Completado', 'En progreso'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Tecnologías <span style={{ fontWeight: '400', color: 'var(--text)' }}>(separadas por coma)</span></label>
                <input value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, TypeScript, Node.js" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Link del proyecto</label>
                <input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="https://..." style={inputStyle} />
              </div>
              {error && <div style={{ padding: '0.7rem 1rem', background: 'rgba(165,0,68,0.1)', border: '1px solid var(--accent-border)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent)' }}>⚠️ {error}</div>}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={guardando} style={{ flex: 1, padding: '0.75rem', background: guardando ? 'var(--border)' : 'var(--accent)', color: guardando ? 'var(--text)' : '#fff', border: 'none', borderRadius: '8px', cursor: guardando ? 'not-allowed' : 'pointer', fontWeight: '700' }}>
                  {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear trabajo'}
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
