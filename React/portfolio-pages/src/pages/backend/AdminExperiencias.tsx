import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Experiencia } from '../../lib/types'

const vacia: Omit<Experiencia, 'id' | 'created_at'> = {
  empresa: '', puesto: '', periodo: '', descripcion: '', tags: [], activo: true, orden: 0,
}

export const AdminExperiencias = () => {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([])
  const [cargando, setCargando] = useState(true)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState<Experiencia | null>(null)
  const [form, setForm] = useState(vacia)
  const [tagsInput, setTagsInput] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [eliminando, setEliminando] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState<string | null>(null)

  const cargar = async () => {
    setCargando(true)
    const { data, error } = await supabase.from('experiencias').select('*').order('orden')
    if (!error && data) setExperiencias(data)
    setCargando(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => {
    setEditando(null)
    setForm(vacia)
    setTagsInput('')
    setError(null)
    setModal(true)
  }

  const abrirEditar = (exp: Experiencia) => {
    setEditando(exp)
    setForm({ empresa: exp.empresa, puesto: exp.puesto, periodo: exp.periodo, descripcion: exp.descripcion, tags: exp.tags, activo: exp.activo, orden: exp.orden })
    setTagsInput(exp.tags.join(', '))
    setError(null)
    setModal(true)
  }

  const cerrarModal = () => { setModal(false); setEditando(null); setError(null) }

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault()
    setGuardando(true)
    setError(null)

    const datos = { ...form, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) }

    if (editando?.id) {
      const { error } = await supabase.from('experiencias').update(datos).eq('id', editando.id)
      if (error) { setError(error.message); setGuardando(false); return }
      setExito('Experiencia actualizada correctamente')
    } else {
      const { error } = await supabase.from('experiencias').insert([datos])
      if (error) { setError(error.message); setGuardando(false); return }
      setExito('Experiencia creada correctamente')
    }

    setGuardando(false)
    cerrarModal()
    cargar()
    setTimeout(() => setExito(null), 3000)
  }

  const eliminar = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar esta experiencia?')) return
    setEliminando(id)
    const { error } = await supabase.from('experiencias').delete().eq('id', id)
    if (!error) { setExperiencias(e => e.filter(x => x.id !== id)); setExito('Experiencia eliminada') }
    setEliminando(null)
    setTimeout(() => setExito(null), 3000)
  }

  const toggleActivo = async (exp: Experiencia) => {
    const { error } = await supabase.from('experiencias').update({ activo: !exp.activo }).eq('id', exp.id!)
    if (!error) setExperiencias(e => e.map(x => x.id === exp.id ? { ...x, activo: !x.activo } : x))
  }

  const inputStyle = {
    padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border)',
    background: 'var(--bg)', color: 'var(--text-h)', fontSize: '0.9rem',
    fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' as const, outline: 'none',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Experiencias</h2>
          <p style={{ color: 'var(--text)', fontSize: '0.88rem', margin: '0.3rem 0 0' }}>
            Gestiona las experiencias que aparecen en tu portfolio.
          </p>
        </div>
        <button onClick={abrirNuevo} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.3rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(165,0,68,0.25)' }}>
          + Nueva experiencia
        </button>
      </div>

      {exito && (
        <div style={{ padding: '0.8rem 1.2rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', color: '#16a34a', fontSize: '0.88rem', marginBottom: '1.2rem' }}>
          ✅ {exito}
        </div>
      )}

      {cargando ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text)' }}>Cargando...</div>
      ) : experiencias.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', borderRadius: '12px', color: 'var(--text)' }}>
          <p style={{ fontSize: '2.5rem', margin: '0 0 0.8rem' }}>📋</p>
          <p style={{ fontWeight: '600', color: 'var(--text-h)', marginBottom: '0.4rem' }}>No hay experiencias todavía</p>
          <p style={{ fontSize: '0.88rem' }}>Pulsa "Nueva experiencia" para añadir la primera.</p>
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 90px 110px', gap: '1rem', padding: '0.8rem 1.2rem', background: 'var(--code-bg)', borderBottom: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Empresa / Puesto</span>
            <span>Descripción</span>
            <span>Periodo</span>
            <span>Estado</span>
            <span style={{ textAlign: 'right' }}>Acciones</span>
          </div>

          {experiencias.map((exp, i) => (
            <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 90px 110px', gap: '1rem', padding: '1rem 1.2rem', borderBottom: i < experiencias.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', background: i % 2 === 0 ? 'var(--bg)' : 'var(--code-bg)' }}>

              <div>
                <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-h)', fontSize: '0.9rem' }}>{exp.empresa}</p>
                <p style={{ margin: '0.2rem 0 0.5rem', fontSize: '0.82rem', color: 'var(--accent)' }}>{exp.puesto}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.1rem 0.5rem', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '600' }}>{t}</span>
                  ))}
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text)', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
                {exp.descripcion}
              </p>

              <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text)', fontWeight: '500' }}>{exp.periodo}</p>

              <button onClick={() => toggleActivo(exp)} style={{ padding: '0.3rem 0.7rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700', background: exp.activo ? 'rgba(34,197,94,0.12)' : 'rgba(107,114,128,0.12)', color: exp.activo ? '#16a34a' : '#6b7280' }}>
                {exp.activo ? '● Activo' : '○ Oculto'}
              </button>

              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                <button onClick={() => abrirEditar(exp)} style={{ padding: '0.4rem 0.8rem', background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '7px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text-h)', fontWeight: '600' }}>
                  ✏️ Editar
                </button>
                <button onClick={() => eliminar(exp.id!)} disabled={eliminando === exp.id} style={{ padding: '0.4rem 0.8rem', background: 'rgba(165,0,68,0.08)', border: '1px solid var(--accent-border)', borderRadius: '7px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--accent)', fontWeight: '600' }}>
                  {eliminando === exp.id ? '...' : '🗑️'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={cerrarModal} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{editando ? '✏️ Editar experiencia' : '+ Nueva experiencia'}</h2>
              <button onClick={cerrarModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text)' }}>✕</button>
            </div>

            <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Empresa *</label>
                  <input required value={form.empresa} onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))} placeholder="Ej: Empresa ABC" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Periodo *</label>
                  <input required value={form.periodo} onChange={e => setForm(f => ({ ...f, periodo: e.target.value }))} placeholder="Ej: 2023 - Actualidad" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Puesto *</label>
                <input required value={form.puesto} onChange={e => setForm(f => ({ ...f, puesto: e.target.value }))} placeholder="Ej: Técnico de Sistemas" style={inputStyle} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Descripción *</label>
                <textarea required rows={3} value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Describe las responsabilidades y logros..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>
                  Tags <span style={{ fontWeight: '400', color: 'var(--text)' }}>(separados por coma)</span>
                </label>
                <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="Ej: React, TypeScript, Node.js" style={inputStyle} />
                {tagsInput && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {tagsInput.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                      <span key={t} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem' }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Orden</label>
                  <input type="number" min={0} value={form.orden} onChange={e => setForm(f => ({ ...f, orden: Number(e.target.value) }))} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', justifyContent: 'flex-end' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-h)' }}>Visible en portfolio</label>
                  <button type="button" onClick={() => setForm(f => ({ ...f, activo: !f.activo }))} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.88rem', background: form.activo ? 'rgba(34,197,94,0.12)' : 'rgba(107,114,128,0.12)', color: form.activo ? '#16a34a' : '#6b7280' }}>
                    {form.activo ? '● Activo' : '○ Oculto'}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{ padding: '0.7rem 1rem', background: 'rgba(165,0,68,0.1)', border: '1px solid var(--accent-border)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent)' }}>
                  ⚠️ {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button type="submit" disabled={guardando} style={{ flex: 1, padding: '0.75rem', background: guardando ? 'var(--border)' : 'var(--accent)', color: guardando ? 'var(--text)' : '#fff', border: 'none', borderRadius: '8px', cursor: guardando ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '0.95rem' }}>
                  {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear experiencia'}
                </button>
                <button type="button" onClick={cerrarModal} style={{ padding: '0.75rem 1.2rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text)', fontSize: '0.9rem' }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
