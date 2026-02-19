export default function Main() {
  return (
    <main className="flex-1">
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a mi Portfolio</h1>
          <p className="text-xl text-gray-300">Desarrollador Web</p>
        </div>
      </section>
      
      <section id="about" className="min-h-screen flex items-center justify-center bg-gray-800 p-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Acerca de mí</h2>
          <p className="text-gray-300">Información sobre tu experiencia y habilidades...</p>
        </div>
      </section>
      
      <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-gray-300">Formas de contactarte...</p>
        </div>
      </section>
    </main>
  );
}
