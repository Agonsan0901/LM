let equipos = [];
let ligaNombre = 'LaLiga';

const JSONS = {
    'js/equipos.json':   { nombre: 'LaLiga',         goleador: 'Pichichi' },
    'js/premier.json':   { nombre: 'Premier League',  goleador: 'Golden Boot' },
    'js/bundesliga.json':{ nombre: 'Bundesliga',      goleador: 'Torjägerkanone' },
    'js/seriea.json':    { nombre: 'Serie A',         goleador: 'Capocannoniere' },
    'js/ligue1.json':    { nombre: 'Ligue 1',         goleador: 'Soulier d\'Or' },
};

// ── CARGA DE LIGA ─────────────────────────────────────────
function cargarLiga(jsonPath) {
    const meta = JSONS[jsonPath];
    ligaNombre = meta.nombre;

    fetch(jsonPath)
        .then(r => r.json())
        .then(data => {
            equipos = data;
            actualizarLabels(meta);
            resetEncuesta();
            rellenarSelects();
            iniciarJuegoEscudo();
            iniciarJuegoEstadio();
            iniciarMemoria();
        });
}

function actualizarLabels(meta) {
    document.getElementById('label-campeon').textContent   = `🏆 ¿Quién crees que ganará la ${meta.nombre} esta temporada?`;
    document.getElementById('label-descenso').textContent  = `📉 ¿Qué equipo crees que descenderá?`;
    document.getElementById('label-jugador').textContent   = `⭐ ¿Cuál es tu jugador favorito de la ${meta.nombre}?`;
    document.getElementById('label-goleador').textContent  = `🥅 ¿Quién será el máximo goleador (${meta.goleador})?`;
    document.getElementById('label-estadio').textContent   = `🏟️ ¿Cuál es tu estadio favorito de la ${meta.nombre}?`;
    document.getElementById('label-partidos').textContent  = `🎮 ¿Cuántos partidos ves de la ${meta.nombre} a la semana?`;
}

function resetEncuesta() {
    document.getElementById('encuesta-form').hidden = false;
    document.getElementById('enc-resultado').hidden = true;
    document.getElementById('encuesta-form').reset();
}

// ── TABS ──────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// ── FILTRO LIGAS ──────────────────────────────────────────
document.querySelectorAll('.liga-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.liga-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('header-titulo').textContent = btn.dataset.titulo;
        document.getElementById('header-sub').textContent    = btn.dataset.sub;
        cargarLiga(btn.dataset.json);
    });
});

// ── ENCUESTA ──────────────────────────────────────────────
function rellenarSelects() {
    const selectsEquipo = ['eq-favorito', 'eq-odiado', 'eq-segundo', 'eq-campeon', 'eq-descenso'];
    selectsEquipo.forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = '<option value="" disabled selected>Selecciona un equipo</option>';
        equipos.forEach(e => {
            const opt = document.createElement('option');
            opt.value = e.nombre;
            opt.textContent = e.nombre;
            sel.appendChild(opt);
        });
    });

    const selEstadio = document.getElementById('estadio-fav');
    selEstadio.innerHTML = '<option value="" disabled selected>Selecciona un estadio</option>';
    equipos.forEach(e => {
        if (!e.estadio?.nombre) return;
        const opt = document.createElement('option');
        opt.value = e.estadio.nombre;
        opt.textContent = `${e.estadio.nombre} (${e.nombre})`;
        selEstadio.appendChild(opt);
    });
}

document.getElementById('encuesta-form').addEventListener('submit', e => {
    e.preventDefault();
    const fav      = document.getElementById('eq-favorito').value;
    const odio     = document.getElementById('eq-odiado').value;
    const seg      = document.getElementById('eq-segundo').value;
    const campeon  = document.getElementById('eq-campeon').value;
    const descenso = document.getElementById('eq-descenso').value;
    const jugador  = document.getElementById('jugador-fav').value.trim();
    const goleador = document.getElementById('pichichi').value.trim();
    const estadio  = document.getElementById('estadio-fav').value;
    const partidos = document.getElementById('partidos-semana').value;
    const texto    = document.getElementById('explicacion').value.trim();

    const res = document.getElementById('enc-resultado');
    res.hidden = false;
    res.innerHTML = `
        <p>⚽ Tu equipo: <strong>${fav}</strong></p>
        <p>😤 El equipo que más odias: <strong>${odio}</strong></p>
        <p>💙 Tu segundo favorito: <strong>${seg}</strong></p>
        <p>🏆 Campeón de la ${ligaNombre}: <strong>${campeon}</strong></p>
        <p>📉 Equipo que descenderá: <strong>${descenso}</strong></p>
        ${jugador  ? `<p>⭐ Tu jugador favorito: <strong>${jugador}</strong></p>` : ''}
        ${goleador ? `<p>🥅 Máximo goleador: <strong>${goleador}</strong></p>` : ''}
        <p>🏟️ Tu estadio favorito: <strong>${estadio}</strong></p>
        ${partidos ? `<p>🎮 Partidos por semana: <strong>${partidos}</strong></p>` : ''}
        ${texto    ? `<p>📝 <em>"${texto}"</em></p>` : ''}
        <p class="enc-gracias">¡Gracias por participar!</p>
    `;
    document.getElementById('encuesta-form').hidden = true;
});

// ── UTILIDADES ────────────────────────────────────────────
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function getRandom(lista) { return lista[Math.floor(Math.random() * lista.length)]; }
function getOpciones4(correcto, lista) {
    const otros = shuffle(lista.filter(e => e.nombre !== correcto.nombre)).slice(0, 3);
    return shuffle([correcto, ...otros]).map(e => e.nombre);
}

// ── JUEGO ESCUDO ──────────────────────────────────────────
let escudoPuntos = 0, escudoActual = null;

function iniciarJuegoEscudo() {
    escudoActual = getRandom(equipos);
    document.getElementById('escudo-img').src = escudoActual.escudo;

    const cont = document.getElementById('escudo-opciones');
    cont.innerHTML = '';
    document.getElementById('escudo-feedback').textContent = '';
    document.getElementById('escudo-feedback').className = 'juego-feedback';
    document.getElementById('escudo-siguiente').hidden = true;

    getOpciones4(escudoActual, equipos).forEach(op => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn';
        btn.textContent = op;
        btn.addEventListener('click', () => responderJuego(op, btn, cont, escudoActual.nombre, 'escudo'));
        cont.appendChild(btn);
    });
}

document.getElementById('escudo-siguiente').addEventListener('click', iniciarJuegoEscudo);

// ── JUEGO ESTADIO ─────────────────────────────────────────
let estadioPuntos = 0, estadioActual = null;

function iniciarJuegoEstadio() {
    const conEstadio = equipos.filter(e => e.estadio?.imagen);
    estadioActual = getRandom(conEstadio);
    document.getElementById('estadio-img').src = estadioActual.estadio.imagen;

    const cont = document.getElementById('estadio-opciones');
    cont.innerHTML = '';
    document.getElementById('estadio-feedback').textContent = '';
    document.getElementById('estadio-feedback').className = 'juego-feedback';
    document.getElementById('estadio-siguiente').hidden = true;

    getOpciones4(estadioActual, equipos).forEach(op => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn';
        btn.textContent = op;
        btn.addEventListener('click', () => responderJuego(op, btn, cont, estadioActual.nombre, 'estadio'));
        cont.appendChild(btn);
    });
}

document.getElementById('estadio-siguiente').addEventListener('click', iniciarJuegoEstadio);

// ── RESPUESTA GENÉRICA ────────────────────────────────────
function responderJuego(respuesta, btnPulsado, cont, correcto, tipo) {
    cont.querySelectorAll('.opcion-btn').forEach(b => {
        b.disabled = true;
        if (b.textContent === correcto) b.classList.add('correcta');
    });
    const feedback = document.getElementById(`${tipo}-feedback`);
    if (respuesta === correcto) {
        if (tipo === 'escudo') escudoPuntos++;
        else estadioPuntos++;
        btnPulsado.classList.add('correcta');
        feedback.textContent = '✅ ¡Correcto!';
        feedback.className = 'juego-feedback ok';
    } else {
        btnPulsado.classList.add('incorrecta');
        feedback.textContent = `❌ Era ${correcto}`;
        feedback.className = 'juego-feedback fail';
    }
    document.getElementById(`${tipo}-puntos`).querySelector('span').textContent =
        tipo === 'escudo' ? escudoPuntos : estadioPuntos;
    document.getElementById(`${tipo}-siguiente`).hidden = false;
}

// ── JUEGO MEMORIA ─────────────────────────────────────────
const PARES = 6;
let memoriaIntentos = 0, memoriaParejas = 0, primeraCard = null, bloqueado = false;

function iniciarMemoria() {
    memoriaIntentos = 0;
    memoriaParejas  = 0;
    primeraCard     = null;
    bloqueado       = false;
    actualizarInfoMemoria();
    document.getElementById('memoria-fin').hidden = true;

    const conEstadio = equipos.filter(e => e.estadio?.imagen);
    const cartas = [];
    shuffle(conEstadio).slice(0, PARES).forEach((eq, i) => {
        cartas.push({ id: i, tipo: 'escudo',  src: eq.escudo,           nombre: eq.nombre });
        cartas.push({ id: i, tipo: 'estadio', src: eq.estadio.imagen,   nombre: eq.nombre });
    });

    const tablero = document.getElementById('memoria-tablero');
    tablero.innerHTML = '';
    shuffle(cartas).forEach(carta => {
        const card = document.createElement('div');
        card.className = 'mem-card';
        card.dataset.id   = carta.id;
        card.dataset.tipo = carta.tipo;
        card.innerHTML = `
            <div class="mem-inner">
                <div class="mem-front">❓</div>
                <div class="mem-back"><img src="${carta.src}" alt="${carta.nombre}"></div>
            </div>`;
        card.addEventListener('click', () => voltearCard(card));
        tablero.appendChild(card);
    });
}

function voltearCard(card) {
    if (bloqueado || card.classList.contains('volteada') || card.classList.contains('encontrada')) return;
    card.classList.add('volteada');
    if (!primeraCard) { primeraCard = card; return; }

    memoriaIntentos++;
    actualizarInfoMemoria();

    if (primeraCard.dataset.id === card.dataset.id && primeraCard.dataset.tipo !== card.dataset.tipo) {
        primeraCard.classList.add('encontrada');
        card.classList.add('encontrada');
        memoriaParejas++;
        actualizarInfoMemoria();
        primeraCard = null;
        if (memoriaParejas === PARES) mostrarFinMemoria();
    } else {
        bloqueado = true;
        const a = primeraCard, b = card;
        setTimeout(() => {
            a.classList.remove('volteada');
            b.classList.remove('volteada');
            primeraCard = null;
            bloqueado   = false;
        }, 1000);
    }
}

function actualizarInfoMemoria() {
    document.getElementById('memoria-intentos').textContent = `Intentos: ${memoriaIntentos}`;
    document.getElementById('memoria-parejas').textContent  = `Parejas: ${memoriaParejas} / ${PARES}`;
}

function mostrarFinMemoria() {
    const fin = document.getElementById('memoria-fin');
    fin.hidden = false;
    fin.textContent = `🎉 ¡Completado en ${memoriaIntentos} intentos!`;
}

document.getElementById('memoria-reiniciar').addEventListener('click', iniciarMemoria);

// ── CARGA INICIAL ─────────────────────────────────────────
cargarLiga('js/equipos.json');
