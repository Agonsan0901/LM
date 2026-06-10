const params = new URLSearchParams(location.search);
const nombre = params.get('equipo');
const jsonFile = params.get('json') || 'js/equipos.json';

fetch(jsonFile)
    .then(r => r.json())
    .then(data => {
        const equipo = data.find(e => e.nombre === nombre);
        if (!equipo) { document.body.innerHTML = '<p style="padding:40px">Equipo no encontrado.</p>'; return; }

        document.title = equipo.nombre + ' · Fútbol Europeo';

        const hero = document.getElementById('hero');
        if (equipo.estadio?.imagen) {
            hero.style.backgroundImage = `url('${equipo.estadio.imagen}')`;
        }

        document.getElementById('escudo').src = equipo.escudo;
        document.getElementById('escudo').alt = equipo.nombre;
        document.getElementById('nombre').textContent = equipo.nombre;
        document.getElementById('estadio-nombre').textContent = '🏟️ ' + (equipo.estadio?.nombre ?? '—');

        const datos = [
            ['🏙️ Ciudad', equipo.ciudad],
            ['📅 Fundación', equipo.fundacion],
            ['🏟️ Estadio', equipo.estadio?.nombre],
            ['👕 Apodo', equipo.apodo],
            ['🎨 Colores', equipo.colores],
            ['🏆 Ligas', equipo.ligas],
        ];

        const lista = document.getElementById('datos-lista');
        datos.forEach(([label, val]) => {
            if (!val) return;
            const li = document.createElement('li');
            li.innerHTML = `<span class="dato-label">${label}</span><span class="dato-val">${val}</span>`;
            lista.appendChild(li);
        });

        document.getElementById('historia-texto').textContent = equipo.historia ?? 'Sin información disponible.';

        const curList = document.getElementById('curiosidades-lista');
        (equipo.curiosidades ?? []).forEach(c => {
            const li = document.createElement('li');
            li.textContent = c;
            curList.appendChild(li);
        });
    });
