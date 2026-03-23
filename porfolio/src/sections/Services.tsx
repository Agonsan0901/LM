import servicios from '../model/data/servicio.json';

const Services = () => {
  return (
    <section id="servicios" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Nuestros Servicios
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Soluciones profesionales para tu negocio</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all hover:transform hover:scale-105 shadow-xl group">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src={servicio.imagen} 
                  alt={servicio.Titulo} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {servicio.categoria}
              </span>
              <h3 className="text-2xl font-bold mb-3 capitalize">{servicio.Titulo}</h3>
              <p className="text-gray-400 mb-4">{servicio.descripcion}</p>
              <div className="flex flex-wrap gap-2">
                {servicio.tecnologias.map((tech, index) => (
                  <span key={index} className="bg-slate-700 px-3 py-1 rounded-full text-xs text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-purple-500 transition-all hover:transform hover:scale-105">
            <div className="text-5xl mb-4">💻</div>
            <h3 className="text-2xl font-semibold mb-3">Desarrollo Web</h3>
            <p className="text-gray-300">Sitios web modernos, rápidos y responsivos con las últimas tecnologías.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-purple-500 transition-all hover:transform hover:scale-105">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-2xl font-semibold mb-3">Apps Móviles</h3>
            <p className="text-gray-300">Aplicaciones nativas y multiplataforma para iOS y Android.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 hover:border-purple-500 transition-all hover:transform hover:scale-105">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold mb-3">Diseño UI/UX</h3>
            <p className="text-gray-300">Interfaces intuitivas y atractivas centradas en el usuario.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
