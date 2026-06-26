let equiposData = [];

const PARTIDOS = { laliga: 380, premier: 380, bundesliga: 306, seriea: 380, ligue1: 306 };

function animarNumero(el, destino) {
    const inicio = parseInt(el.textContent) || 0;
    const duracion = 500;
    const pasos = 20;
    const incremento = (destino - inicio) / pasos;
    let paso = 0;
    el.classList.add('bump');
    setTimeout(() => el.classList.remove('bump'), 200);
    const timer = setInterval(() => {
        paso++;
        el.textContent = Math.round(inicio + incremento * paso);
        if (paso >= pasos) { el.textContent = destino; clearInterval(timer); }
    }, duracion / pasos);
}

function mostrarSkeleton() {
    const container = document.getElementById('equipos-container');
    container.innerHTML = Array.from({ length: 8 }, () => `
        <div class="skeleton">
            <div class="skeleton-circle"></div>
            <div class="skeleton-line" style="width:60%"></div>
            <div class="skeleton-line" style="width:80%"></div>
            <div class="skeleton-line" style="width:70%"></div>
        </div>
    `).join('');
}

function cargarLiga(jsonPath, titulo, sub, ligaKey) {
    mostrarSkeleton();
    fetch(jsonPath)
        .then(r => r.json())
        .then(data => {
            equiposData = data;
            document.getElementById('header-titulo').textContent = titulo;
            document.getElementById('header-sub').textContent = sub;
            animarNumero(document.getElementById('stat-equipos'), data.length);
            animarNumero(document.getElementById('stat-partidos'), PARTIDOS[ligaKey] ?? 380);
            document.getElementById('buscador').value = '';
            renderEquipos(data);
        })
        .catch(err => console.error('Error cargando equipos:', err));
}

function renderEquipos(lista) {
    const container = document.getElementById('equipos-container');
    const noResultados = document.getElementById('no-resultados');
    container.innerHTML = '';

    if (lista.length === 0) {
        noResultados.hidden = false;
        return;
    }
    noResultados.hidden = true;

    lista.forEach((equipo, i) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ver detalles de ${equipo.nombre}`);
        card.style.animationDelay = `${i * 40}ms`;

        const ir = () => {
            location.href = `equipo.html?equipo=${encodeURIComponent(equipo.nombre)}&json=${encodeURIComponent(ligaActual)}`;
        };
        card.addEventListener('click', ir);
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') ir(); });

        card.innerHTML = `
            <img class="card-logo" src="${equipo.escudo}" alt="${equipo.nombre}" loading="lazy"
                 onerror="this.src='escudos/placeholder.png'">
            <h2>${equipo.nombre}</h2>
            <div class="card-info">
                <p><strong>Fundación:</strong> ${equipo.fundacion ?? '—'}</p>
                <p><strong>Estadio:</strong> ${equipo.estadio?.nombre ?? '—'}</p>
                <p><strong>Ciudad:</strong> ${equipo.ciudad ?? '—'}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// ── FILTRO LIGAS ──────────────────────────────────────────
let ligaActual = 'js/equipos.json';

document.querySelectorAll('.liga-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.liga-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        ligaActual = btn.dataset.json;
        cargarLiga(btn.dataset.json, btn.dataset.titulo, btn.dataset.sub, btn.dataset.liga);
        document.getElementById('equipos-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── BUSCADOR ──────────────────────────────────────────────
document.getElementById('buscador').addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    renderEquipos(equiposData.filter(e => e.nombre.toLowerCase().includes(q)));
});

// ── CARGA INICIAL ─────────────────────────────────────────
cargarLiga('js/equipos.json', 'LaLiga 25/26', 'Primera División · España', 'laliga');
