const Training = () => {
  const skills = [
    { icon: '💻', title: 'Sistemas Informáticos', items: ['Windows Server', 'Linux', 'Virtualización', 'Active Directory'], color: 'blue' },
    { icon: '🌐', title: 'Redes', items: ['TCP/IP', 'Routing & Switching', 'VLANs', 'Seguridad de Redes'], color: 'green' },
    { icon: '🔒', title: 'Seguridad', items: ['Ciberseguridad', 'Firewalls', 'VPN', 'Auditorías'], color: 'purple' },
    { icon: '📊', title: 'Servicios & BBDD', items: ['Bases de Datos', 'Servidores Web', 'Cloud Computing', 'Backup'], color: 'orange' },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'from-blue-600 to-blue-800 border-blue-500',
    green: 'from-green-600 to-green-800 border-green-500',
    purple: 'from-purple-600 to-purple-800 border-purple-500',
    orange: 'from-orange-600 to-orange-800 border-orange-500',
  };

  return (
    <section id="formacion" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Módulos ASIR
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Administración de Sistemas Informáticos en Red</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className={`bg-gradient-to-br ${colorClasses[skill.color]} p-6 rounded-xl border-2 hover:scale-105 transition-transform shadow-xl`}>
              <div className="text-5xl mb-4 text-center">{skill.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-white">{skill.title}</h3>
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center text-white/90">
                    <span className="mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur p-8 rounded-2xl border border-slate-700">
            <h3 className="text-3xl font-bold mb-6 text-center">Certificaciones Profesionales</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-3xl mb-2">🏆</div>
                <p className="font-semibold">Cisco CCNA</p>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-3xl mb-2">🎓</div>
                <p className="font-semibold">Microsoft MCSA</p>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-3xl mb-2">⭐</div>
                <p className="font-semibold">CompTIA Security+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Training
