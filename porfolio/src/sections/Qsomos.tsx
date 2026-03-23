
const QSomos = () => {
  return (
    <section id="qsomos" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Quiénes Somos
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed">
              Somos un equipo apasionado de profesionales dedicados a crear soluciones digitales innovadoras que transforman negocios.
            </p>
            <p className="text-lg text-gray-400">
              Con años de experiencia en desarrollo web, diseño y tecnología, ayudamos a empresas a alcanzar sus objetivos digitales.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                <p className="text-3xl font-bold text-blue-400">50+</p>
                <p className="text-sm text-gray-400">Proyectos</p>
              </div>
              <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-500/30">
                <p className="text-3xl font-bold text-purple-400">30+</p>
                <p className="text-sm text-gray-400">Clientes</p>
              </div>
              <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/30">
                <p className="text-3xl font-bold text-green-400">5+</p>
                <p className="text-sm text-gray-400">Años</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
              <div className="space-y-4 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-bold">Misión</h3>
                    <p className="text-sm opacity-90">Innovar y crear valor</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👁️</span>
                  <div>
                    <h3 className="font-bold">Visión</h3>
                    <p className="text-sm opacity-90">Liderar el cambio digital</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⭐</span>
                  <div>
                    <h3 className="font-bold">Valores</h3>
                    <p className="text-sm opacity-90">Excelencia y compromiso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QSomos;

