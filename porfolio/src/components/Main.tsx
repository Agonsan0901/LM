import QSomos from '../sections/Qsomos';
import Services from '../sections/Services';
import Contact from '../sections/Contact';
import Training from '../sections/Training';

export default function Main() {
  return (
    <main className="flex-1 pt-16">
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="text-center z-10 px-4 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Portfolio Profesional
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">Desarrollo Web & Soluciones Digitales</p>
          <a href="#servicios" className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
            Ver Servicios
          </a>
        </div>
      </section>
      
      <QSomos />
      <Training />
      <Services />
      <Contact />
      
      <footer className="bg-gray-950 py-8 text-center text-gray-400">
        <p>&copy; 2024 Portfolio. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
