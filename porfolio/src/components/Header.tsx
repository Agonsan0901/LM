import { Disclosure } from 
export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-6 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-blue-400">Mi</span>Portfolio
        </div>
        <nav className="flex gap-8">
          <a href="#inicio" className="hover:text-blue-400 transition-colors">Inicio</a>
          <a href="#qsomos" className="hover:text-blue-400 transition-colors">Quienes Somos</a>
          <a href="#training" className="hover:text-blue-400 transition-colors">Formación</a>
          <a href="#services" className="hover:text-blue-400 transition-colors">Servicios</a>
          <a href="#proyectos" className="hover:text-blue-400 transition-colors">Proyectos</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contacto</a>
        </nav>
      </div>
    </header>
  );
}