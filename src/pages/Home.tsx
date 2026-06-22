export const Home = () => {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 text-transparent bg-clip-text">
        Aitor González Sánchez
      </h1>

      <h2 className="text-xl md:text-2xl text-gray-400 mb-8">
        Desarrollador Web | React • TypeScript • JavaScript
      </h2>

      <p className="max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
        Soy desarrollador de software enfocado en el desarrollo web moderno.
        Me apasiona crear aplicaciones rápidas, escalables y con buen diseño de
        experiencia de usuario. Disfruto trabajando con React, TypeScript y
        JavaScript, y aprendiendo constantemente nuevas tecnologías.
      </p>

      <div className="flex gap-4">
        <a
          href="/trabajos"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-medium"
        >
          Ver trabajos
        </a>

        <a
          href="/contacto"
          className="px-6 py-3 border border-gray-500 hover:border-white transition rounded-lg font-medium"
        >
          Contacto
        </a>
      </div>
    </section>
  );
};