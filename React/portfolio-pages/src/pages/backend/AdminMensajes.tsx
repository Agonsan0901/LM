import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Mensaje } from '../../lib/types'

export const AdminMensajes = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [cargando, setCargando] = useState(true)
  const [seleccionado, setSeleccionado] = useState<Mensaje | null>(null)
  const [eliminando, setEliminando] = useState<number | null>(null)
  const [filtro, setFiltro] = useState<'todos' | 'nuevos' | 'leidos'>('todos')

  const cargar = async () => {
    setCargando(true)
    const { data } = await supabase.from('mensajes').select('*').order('created_at', { ascending: false })
    if (data) setMensajes(data)
    setCargando(false)
  }

  useEffect(() => { cargar() }, [])

  const marcarLeido = async (msg: Mensaje) => {
    await supabase.from('mensajes').update({ leido: !msg.leido }).eq('id', msg.id!)
    setMensajes(m => m.map(x => x.id === msg.id ? { ...x, leido: !x.leido } : x))
    if (seleccionado?.id === msg.id) setSeleccionado(prev => prev ? { ...prev, leido: !prev.leido } : null)
  }

  const eliminar = async (id: number) => {
    if (!confirm('¿Eliminar este mensaje?')) return
    setEliminando(id)
    await supabase.from('mensajes').delete().eq('id', id)
    setMensajes(m => m.filter(x => x.id !== id))
    if (seleccionado?.id === id) setSeleccionado(null)
    setEliminando(null)
  }

  const abrirMensaje = async (msg: Mensaje) => {
    setSeleccionado(msg)
    if (!msg.leido) {
      await supabase.from('mensajes').update({ leido: true }).eq('id', msg.id!)
      setMensajes(m => m.map(x => x.id === msg.id ? { ...x, leido: true } : x))
    }
  }

  const filtrados = mensajes.filter(m => {
    if (filtro === 'nuevos') return !m.leido
    if (filtro === 'leidos') return m.leido
    return true
  })

  const noLeidos = mensajes.filter(m => !m.leido).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Mensajes {noLeidos > 0 && <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: '20px', fontSize: '0.75rem', padding: '0.15rem 0.6rem', fontWeight: '700', marginLeft: '0.5rem' }}>{noLeidos} nuevos</span>}</h2>
          <p style={{ color: 'var(--text)', fontSize: '0.88rem', margin: '0.3rem 0 0' }}>Mensajes recibidos desde el formulario de contacto.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {(['todos', 'nuevos', 'leidos'] as const).map(f => (
            <button key={f} onClick={() => setFiltro(f)} style={{ padding: '0.4rem 0.9rem', borderRadius: '20px', border: '1px solid var(--border)', background: filtro === f ? 'var(--accent)' : 'transparent', color: filtro === f ? '#fff' : 'var(--text)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: filtro === f ? '700' : 'normal', textTransform: 'capitalize' }}>
              {f === 'todos' ? 'Todos' : f === 'nuevos' ? 'No leídos' : 'Leídos'}
            </button>
          ))}
        </div>
      </div>

      {cargando ? <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text)' }}>Cargando...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: seleccionado ? '1fr 1fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>

          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            {filtrados.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text)' }}>
                <p style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>📭</p>
                <p>No hay mensajes en esta categoría.</p>
              </div>
            ) : filtrados.map((msg, i) => (
              <div
                key={msg.id}
                onClick={() => abrirMensaje(msg)}
                style={{ display: 'flex', gap: '1rem', padding: '1rem 1.2rem', borderBottom: i < filtrados.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', background: seleccionado?.id === msg.id ? 'var(--accent-bg)' : !msg.leido ? 'var(--code-bg)' : 'var(--bg)', borderLeft: seleccionado?.id === msg.id ? '3px solid var(--accent)' : !msg.leido ? '3px solid var(--accent)' : '3px solid transparent', transition: 'background 0.1s' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: !msg.leido ? 'var(--accent)' : 'var(--border)', color: !msg.leido ? '#fff' : 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem', flexShrink: 0 }}>
                  {msg.nombre.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ margin: 0, fontWeight: !msg.leido ? '700' : '500', color: 'var(--text-h)', fontSize: '0.9rem' }}>{msg.nombre}</p>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text)', flexShrink: 0 }}>
                      {new Date(msg.created_at!).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p style={{ margin: '0.1rem 0', fontSize: '0.82rem', color: !msg.leido ? 'var(--accent)' : 'var(--text)', fontWeight: !msg.leido ? '600' : 'normal' }}>{msg.asunto}</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.mensaje}</p>
                </div>
              </div>
            ))}
          </div>

          {seleccionado && (
            <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--code-bg)', position: 'sticky', top: '80px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1rem' }}>
                    {seleccionado.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-h)' }}>{seleccionado.nombre}</p>
                    <a href={`mailto:${seleccionado.email}`} style={{ fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none' }}>{seleccionado.email}</a>
                  </div>
                </div>
                <button onClick={() => setSeleccionado(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text)' }}>✕</button>
              </div>

              <div style={{ background: 'var(--bg)', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.2rem' }}>
                <p style={{ margin: '0 0 0.3rem', fontWeight: '700', color: 'var(--text-h)', fontSize: '0.95rem' }}>{seleccionado.asunto}</p>
                <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: 'var(--text)' }}>
                  {new Date(seleccionado.created_at!).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-h)', lineHeight: '1.7' }}>{seleccionado.mensaje}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <a href={`mailto:${seleccionado.email}?subject=Re: ${seleccionado.asunto}`} style={{ flex: 1, padding: '0.65rem', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.88rem', textAlign: 'center', boxShadow: '0 4px 14px rgba(165,0,68,0.25)' }}>
                  📧 Responder
                </a>
                <button onClick={() => marcarLeido(seleccionado)} style={{ padding: '0.65rem 1rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text)', fontSize: '0.82rem', fontWeight: '600' }}>
                  {seleccionado.leido ? '○ Sin leer' : '✓ Leído'}
                </button>
                <button onClick={() => eliminar(seleccionado.id!)} disabled={eliminando === seleccionado.id} style={{ padding: '0.65rem 1rem', background: 'rgba(165,0,68,0.08)', border: '1px solid var(--accent-border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--accent)', fontSize: '0.82rem', fontWeight: '600' }}>
                  {eliminando === seleccionado.id ? '...' : '🗑️'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
