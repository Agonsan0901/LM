import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const planes = [
  {
    nombre: 'Básico',
    precio: '299',
    periodo: 'proyecto',
    descripcion: 'Ideal para autónomos y pequeños negocios que necesitan presencia online.',
    icono: '🌱',
    popular: false,
    features: [
      'Sitio web de hasta 5 páginas',
      'Diseño responsive',
      'Formulario de contacto',
      'Optimización básica SEO',
      'Entrega en 2 semanas',
      '1 mes de soporte',
    ],
    noIncluye: ['Panel de administración', 'Integración con API', 'E-commerce'],
  },
  {
    nombre: 'Profesional',
    precio: '699',
    periodo: 'proyecto',
    descripcion: 'Para empresas que buscan una solución completa y escalable.',
    icono: '🚀',
    popular: true,
    features: [
      'Sitio web ilimitado de páginas',
      'Panel de administración',
      'Diseño responsive + modo oscuro',
      'SEO avanzado',
      'Integración con APIs',
      'Entrega en 4 semanas',
      '3 meses de soporte',
      'Base de datos incluida',
    ],
    noIncluye: ['E-commerce completo'],
  },
  {
    nombre: 'Enterprise',
    precio: '1.499',
    periodo: 'proyecto',
    descripcion: 'Solución a medida para proyectos de gran escala con requisitos específicos.',
    icono: '🏢',
    popular: false,
    features: [
      'Todo lo del plan Profesional',
      'E-commerce completo',
      'Pasarela de pago integrada',
      'Infraestructura en servidor',
      'Formación al equipo',
      'Soporte 6 meses',
      'Mantenimiento mensual',
      'SLA garantizado',
    ],
    noIncluye: [],
  },
]

const testimonios = [
  {
    nombre: 'Carlos M.',
    empresa: 'Tienda Online SL',
    texto: 'Aitor transformó nuestra web por completo. Las ventas aumentaron un 40% en el primer mes tras el rediseño.',
    rating: 5,
    avatar: 'C',
  },
  {
    nombre: 'Laura P.',
    empresa: 'Consultoría LP',
    texto: 'Entrega puntual, comunicación constante y resultado espectacular. Totalmente recomendable.',
    rating: 5,
    avatar: 'L',
  },
  {
    nombre: 'Miguel R.',
    empresa: 'StartupXYZ',
    texto: 'El panel de administración que desarrolló nos ahorra horas de trabajo cada semana. Excelente trabajo.',
    rating: 5,
    avatar: 'M',
  },
]

const faqs = [
  {
    pregunta: '¿Cuánto tiempo tarda en entregarse un proyecto?',
    respuesta: 'Depende del plan elegido: el Básico se entrega en 2 semanas, el Profesional en 4 y el Enterprise según acuerdo. Siempre con hitos intermedios para que puedas seguir el progreso.',
  },
  {
    pregunta: '¿Qué incluye el soporte post-entrega?',
    respuesta: 'Corrección de bugs, pequeños ajustes de diseño y consultas técnicas durante el período incluido en cada plan. Pasado ese tiempo, se puede contratar soporte mensual.',
  },
  {
    pregunta: '¿Puedo cambiar de plan más adelante?',
    respuesta: 'Sí. Si tu proyecto crece y necesitas más funcionalidades, podemos ampliar el alcance. Solo pagas la diferencia entre planes.',
  },
  {
    pregunta: '¿Trabajas con clientes fuera de España?',
    respuesta: 'Sí, trabajo en remoto con clientes de cualquier país. Las reuniones se hacen por videollamada y la comunicación por email o chat.',
  },
]

const ventajas = [
  { icono: '⚡', titulo: 'Entrega rápida', desc: 'Plazos claros y cumplidos. Sin sorpresas.' },
  { icono: '🔒', titulo: 'Código limpio', desc: 'Código mantenible, documentado y escalable.' },
  { icono: '📱', titulo: '100% Responsive', desc: 'Perfecta visualización en todos los dispositivos.' },
  { icono: '🎨', titulo: 'Diseño moderno', desc: 'Interfaces actuales con excelente UX/UI.' },
  { icono: '🛠️', titulo: 'Soporte incluido', desc: 'Acompañamiento tras la entrega del proyecto.' },
  { icono: '💬', titulo: 'Comunicación fluida', desc: 'Actualizaciones periódicas durante el desarrollo.' },
]

export const Ventas = () => {
  const navigate = useNavigate()
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null)
  const [anual, setAnual] = useState(false)

  return (
    <div>

      {/* HERO */}
      <section style={{ padding: '5rem 2rem 4rem', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '1.4rem', border: '1px solid var(--accent-border)' }}>
          💰 Planes y precios
        </span>
        <h1 style={{ margin: '0 0 1rem' }}>
          Invierte en tu{' '}
          <span style={{ color: 'var(--accent)' }}>presencia digital</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text)', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
          Planes claros, sin costes ocultos. Elige el que mejor se adapta a tu proyecto y empieza a crecer hoy.
        </p>

        {/* Toggle facturación */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '0.88rem' }}>
          <span style={{ color: !anual ? 'var(--accent)' : 'var(--text)', fontWeight: !anual ? '700' : 'normal' }}>Pago único</span>
          <button
            onClick={() => setAnual(a => !a)}
            style={{ width: '42px', height: '22px', borderRadius: '11px', background: anual ? 'var(--accent)' : 'var(--border)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', padding: 0 }}
          >
            <span style={{ position: 'absolute', top: '3px', left: anual ? '22px' : '3px', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transition: 'left 0.2s' }} />
          </button>
          <span style={{ color: anual ? 'var(--accent)' : 'var(--text)', fontWeight: anual ? '700' : 'normal' }}>
            Mantenimiento mensual
            <span style={{ marginLeft: '0.4rem', background: '#22c55e', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '700' }}>-20%</span>
          </span>
        </div>
      </section>

      {/* PLANES */}
      <section style={{ padding: '0 2rem 5rem', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {planes.map(p => (
            <div
              key={p.nombre}
              style={{
                border: p.popular ? '2px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: '16px',
                background: p.popular ? 'var(--accent-bg)' : 'var(--code-bg)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: p.popular ? '0 8px 30px rgba(165,0,68,0.15)' : 'none',
              }}
            >
              {p.popular && (
                <div style={{ background: 'var(--accent)', color: '#fff', textAlign: 'center', padding: '0.4rem', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                  ⭐ MÁS POPULAR
                </div>
              )}
              <div style={{ padding: '1.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>{p.icono}</span>
                  <span style={{ fontWeight: '700', color: 'var(--text-h)', fontSize: '1.05rem' }}>{p.nombre}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: '1.6', marginBottom: '1.2rem' }}>{p.descripcion}</p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-h)', letterSpacing: '-1px' }}>
                    {anual ? Math.round(Number(p.precio.replace('.', '')) * 0.8).toLocaleString('es-ES') : p.precio}€
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text)', marginLeft: '0.3rem' }}>/ {anual ? 'mes' : p.periodo}</span>
                </div>
                <button
                  onClick={() => navigate('/contacto')}
                  style={{
                    width: '100%', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer',
                    background: p.popular ? 'var(--accent)' : 'transparent',
                    color: p.popular ? '#fff' : 'var(--accent)',
                    border: p.popular ? 'none' : '1.5px solid var(--accent)',
                    fontWeight: '700', fontSize: '0.9rem', marginBottom: '1.5rem',
                    transition: 'opacity 0.15s',
                  } as React.CSSProperties}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  {p.popular ? 'Empezar ahora →' : 'Solicitar presupuesto'}
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <span style={{ color: '#22c55e', fontWeight: '700', flexShrink: 0 }}>✓</span>
                      <span style={{ color: 'var(--text-h)' }}>{f}</span>
                    </div>
                  ))}
                  {p.noIncluye.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.4 }}>
                      <span style={{ flexShrink: 0 }}>✕</span>
                      <span style={{ color: 'var(--text)', textDecoration: 'line-through' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VENTAJAS */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--code-bg)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.4rem' }}>¿Por qué elegirme?</h2>
          <p style={{ color: 'var(--text)', textAlign: 'center', marginBottom: '3rem', fontSize: '0.95rem' }}>Lo que me diferencia de otras opciones del mercado.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
            {ventajas.map(v => (
              <div key={v.titulo} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.2rem' }}>
                <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{v.icono}</span>
                <div>
                  <p style={{ fontWeight: '700', color: 'var(--text-h)', margin: '0 0 0.3rem', fontSize: '0.95rem' }}>{v.titulo}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: '1.5' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{ padding: '4rem 2rem', maxWidth: '960px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.4rem' }}>Lo que dicen mis clientes</h2>
        <p style={{ color: 'var(--text)', textAlign: 'center', marginBottom: '3rem', fontSize: '0.95rem' }}>Resultados reales de proyectos completados.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {testimonios.map(t => (
            <div key={t.nombre} style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '1.6rem', background: 'var(--code-bg)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-h)', lineHeight: '1.7', fontStyle: 'italic' }}>"{t.texto}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginTop: 'auto' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem', flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: '700', color: 'var(--text-h)', margin: 0, fontSize: '0.88rem' }}>{t.nombre}</p>
                  <p style={{ color: 'var(--text)', margin: 0, fontSize: '0.78rem' }}>{t.empresa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--code-bg)', borderTop: '1px solid var(--border)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.4rem' }}>Preguntas frecuentes</h2>
          <p style={{ color: 'var(--text)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Todo lo que necesitas saber antes de empezar.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--bg)', overflow: 'hidden' }}>
                <button
                  onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}
                  style={{ width: '100%', padding: '1.1rem 1.3rem', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', textAlign: 'left' }}
                >
                  <span style={{ fontWeight: '600', color: 'var(--text-h)', fontSize: '0.92rem' }}>{faq.pregunta}</span>
                  <span style={{ color: 'var(--accent)', fontSize: '1.1rem', flexShrink: 0, transition: 'transform 0.2s', transform: faqAbierta === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {faqAbierta === i && (
                  <div style={{ padding: '0 1.3rem 1.1rem', fontSize: '0.88rem', color: 'var(--text)', lineHeight: '1.7' }}>
                    {faq.respuesta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '1.2rem', border: '1px solid var(--accent-border)' }}>🚀 Empieza ya</span>
        <h2 style={{ marginBottom: '0.8rem', fontSize: '1.8rem' }}>¿Listo para dar el siguiente paso?</h2>
        <p style={{ color: 'var(--text)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: '1.7' }}>
          Contáctame hoy y te preparo una propuesta personalizada sin coste ni compromiso.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/contacto')} style={{ padding: '0.85rem 2.2rem', background: 'var(--accent)', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', boxShadow: '0 4px 14px rgba(165,0,68,0.3)' }}>
            Solicitar presupuesto →
          </button>
          <button onClick={() => navigate('/servicios')} style={{ padding: '0.85rem 2.2rem', border: '1.5px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', background: 'transparent', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
            Ver servicios
          </button>
        </div>
      </section>

    </div>
  )
}
