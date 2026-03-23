export const AgsContacto = () => {
  return (
    <section className="contacto">
      <div className="contacto-header">
        <span className="contacto-icon">✉️</span>
        <h1>Contacto</h1>
        <p>¿Tienes alguna duda sobre un modelo? Escríbenos y te respondemos.</p>
      </div>
      <form className="contacto-form">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="tu@email.com" />
        </div>
        <div className="form-group">
          <label>Mensaje</label>
          <textarea placeholder="¿En qué podemos ayudarte?" rows={5} />
        </div>
        <button type="submit" className="btn-submit">Enviar mensaje</button>
      </form>
    </section>
  )
}
