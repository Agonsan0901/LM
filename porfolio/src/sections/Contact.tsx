const Contact = () => {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Contacto
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Hablemos sobre tu próximo proyecto</p>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Email</p>
                    <p className="font-semibold">contacto@portfolio.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Teléfono</p>
                    <p className="font-semibold">+34 123 456 789</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Ubicación</p>
                    <p className="font-semibold">Madrid, España</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors">
                  <span className="text-xl">in</span>
                </a>
                <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors">
                  <span className="text-xl">🐙</span>
                </a>
                <a href="#" className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg transition-colors">
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur p-8 rounded-2xl border border-slate-700 shadow-xl">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input 
                  type="email" 
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Asunto</label>
                <input 
                  type="text" 
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Mensaje</label>
                <textarea 
                  rows={5} 
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Enviar Mensaje 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
