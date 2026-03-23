
export const Contacto = () => {
  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Contacto</h1>
      <p style={{ color: 'var(--text)', marginBottom: '2rem' }}>¿Tienes un proyecto en mente? Escríbeme y hablamos.</p>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type='text'
          placeholder='Tu nombre'
          style={{ padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)', outline: 'none' }}
        />
        <input
          type='email'
          placeholder='Tu email'
          style={{ padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)', outline: 'none' }}
        />
        <textarea
          placeholder='Tu mensaje'
          rows={5}
          style={{ padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)', resize: 'vertical', outline: 'none', fontFamily: 'inherit', fontSize: 'inherit' }}
        />
        <button
          type='submit'
          style={{ padding: '0.7rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}
        >
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}
