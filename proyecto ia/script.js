const face      = document.getElementById('face');
const bubble    = document.getElementById('bubble');
const input     = document.getElementById('input');
const sendBtn   = document.getElementById('send-btn');
const mouthPath = document.getElementById('mouth-path');
const pupilL    = document.getElementById('pupil-l');
const pupilR    = document.getElementById('pupil-r');
const eyeL      = document.getElementById('eye-l');
const eyeR      = document.getElementById('eye-r');

let responses = [];

// ── Cargar JSON ──
fetch('respuestas.json')
  .then(r => r.json())
  .then(data => { responses = data; });

// ── Seguimiento de ojos ──
document.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / window.innerWidth  * 10;
  const dy = (e.clientY - cy) / window.innerHeight * 10;
  pupilL.style.transform = `translate(${dx}px, ${dy}px)`;
  pupilR.style.transform = `translate(${dx}px, ${dy}px)`;
});

// ── Parpadeo automático ──
function blink() {
  eyeL.classList.add('blink');
  eyeR.classList.add('blink');
  setTimeout(() => {
    eyeL.classList.remove('blink');
    eyeR.classList.remove('blink');
  }, 150);
  setTimeout(blink, 2500 + Math.random() * 3000);
}
blink();

// ── Boca ──
const mouths = {
  smile:     'M10,10 Q50,32 90,10',
  neutral:   'M10,20 Q50,20 90,20',
  sad:       'M10,28 Q50,8  90,28',
  open:      'M15,8  Q50,35 85,8',
  angry:     'M10,25 Q50,12 90,25',
  surprised: 'M30,5  Q50,38 70,5',
  scared:    'M20,8  Q50,36 80,8',
};

function setMouth(type) {
  mouthPath.setAttribute('d', mouths[type] || mouths.smile);
}

// ── Emoción ──
function setEmotion(emotion) {
  face.className = '';
  switch (emotion) {
    case 'talking':   face.classList.add('talking');   setMouth('open');      break;
    case 'thinking':  face.classList.add('thinking');  setMouth('neutral');   break;
    case 'happy':     face.classList.add('happy');     setMouth('smile');     break;
    case 'sad':       face.classList.add('sad');       setMouth('sad');       break;
    case 'cry':       face.classList.add('cry');       setMouth('sad');       break;
    case 'angry':     face.classList.add('angry');     setMouth('angry');     break;
    case 'scared':    face.classList.add('scared');    setMouth('scared');    break;
    case 'surprised': face.classList.add('surprised'); setMouth('surprised'); break;
    default:                                            setMouth('smile');     break;
  }
}

// ── Burbuja ──
let bubbleTimer = null;

function showBubble(text) {
  bubble.textContent = '';
  bubble.classList.add('visible');
  let i = 0;
  const iv = setInterval(() => {
    bubble.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(iv);
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => bubble.classList.remove('visible'), 5000);
    }
  }, 28);
}

// ── Sentimiento ──
const positivas = ['genial','increíble','increible','guay','bien','bueno','buena','feliz','alegre','amor','bonito','bonita','me gusta','me encanta','perfecto','perfecto','gracias','chulo','chula','mola','estupendo','maravilloso','fantástico','fantastico','excelente','super','súper'];
const negativas = ['malo','mala','odio','fatal','horrible','pésimo','pesimo','asco','feo','fea','aburrido','aburrida','triste','mal','peor','terrible','detesto','no me gusta','odias','estúpido','estupido','idiota','tonto','tonta'];
const insultos  = ['idiota','imbécil','imbecil','estúpido','estupido','tonto','tonta','inútil','inutil','maldito','maldita','asco','basura'];

function detectarSentimiento(text) {
  const lower = text.toLowerCase();
  if (insultos.some(p => lower.includes(p)))  return 'angry';
  if (negativas.some(p => lower.includes(p))) return 'sad';
  if (positivas.some(p => lower.includes(p))) return 'happy';
  return null;
}

// ── Buscar respuesta ──
function getReply(text) {
  const lower = text.toLowerCase();

  for (const r of responses) {
    if (r.keys.some(k => lower.includes(k))) {
      if (r.reply === '__DATETIME__') {
        const now = new Date();
        return {
          reply: `Son las ${now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} del ${now.toLocaleDateString('es-ES')}`,
          emotion: r.emotion
        };
      }
      return { reply: r.reply, emotion: r.emotion };
    }
  }

  // Si no hay respuesta en el JSON, reacciona por sentimiento
  const sentimiento = detectarSentimiento(text);
  if (sentimiento === 'angry')  return { reply: '¡Eso no está bien dicho! 😠', emotion: 'angry' };
  if (sentimiento === 'sad')    return { reply: 'Vaya... eso no suena muy bien 😔', emotion: 'sad' };
  if (sentimiento === 'happy')  return { reply: '¡Me alegra que estés de buen humor! 😄', emotion: 'happy' };

  return { reply: 'Interesante... déjame pensar en eso 🤔', emotion: 'thinking' };
}

// ── Responder ──
function respond(text) {
  let { reply, emotion } = getReply(text);

  // Si la respuesta es neutral, el sentimiento del mensaje manda
  if (emotion === 'thinking') {
    const s = detectarSentimiento(text);
    if (s) emotion = s;
  }

  setEmotion('thinking');
  bubble.classList.remove('visible');

  setTimeout(() => {
    setEmotion('talking');
    showBubble(reply);
    setTimeout(() => {
      setEmotion(emotion);
      setTimeout(() => setEmotion('idle'), 2500);
    }, reply.length * 28 + 200);
  }, 600);
}

// ── Enviar ──
function send() {
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  respond(text);
}

sendBtn.addEventListener('click', send);
input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

setEmotion('idle');
