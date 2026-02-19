const Services = () => {
  return (
    <section id="services" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Servicios</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-slate-900 p-8 rounded-lg hover:transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-2xl font-semibold mb-3">Desarrollo Web</h3>
            <p className="text-gray-300">Creamos sitios web modernos y responsivos adaptados a tus necesidades.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-lg hover:transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-2xl font-semibold mb-3">Apps Móviles</h3>
            <p className="text-gray-300">Desarrollamos aplicaciones móviles nativas y multiplataforma.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-lg hover:transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold mb-3">Diseño UI/UX</h3>
            <p className="text-gray-300">Diseñamos interfaces intuitivas y atractivas para tus usuarios.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
