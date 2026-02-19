const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Contacto</h2>
        <div className="max-w-2xl mx-auto">
          <form className="bg-slate-800 p-8 rounded-lg space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mensaje</label>
              <textarea rows={5} className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold transition-colors">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
