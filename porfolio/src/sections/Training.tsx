const Training = () => {
  return (
    <section id="training" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Formación</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-3 text-blue-400">Desarrollo Web</h3>
            <p className="text-gray-300">HTML, CSS, JavaScript, React, TypeScript</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-3 text-blue-400">Backend</h3>
            <p className="text-gray-300">Node.js, Python, Bases de datos</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-3 text-blue-400">Cloud & DevOps</h3>
            <p className="text-gray-300">AWS, Docker, CI/CD</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-3 text-blue-400">Metodologías</h3>
            <p className="text-gray-300">Agile, Scrum, Git</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Training
