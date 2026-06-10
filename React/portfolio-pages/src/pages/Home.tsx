import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Experiencia } from '../lib/types'

const skills = [
  { nombre: 'React / TypeScript', nivel: 85 },
  { nombre: 'HTML / CSS', nivel: 95 },
  { nombre: 'Node.js', nivel: 70 },
  { nombre: 'MySQL / SQL Server', nivel: 80 },
  { nombre: 'Linux / Windows Server', nivel: 75 },
  { nombre: 'Git / GitHub', nivel: 85 },
]

const stats = [
  { valor: '3+', label: 'Años de experiencia' },
  { valor: '12+', label: 'Proyectos completados' },
  { valor: '8+', label: 'Tecnologías dominadas' },
  { valor: '100%', label: 'Compromiso' },
]

export const Home = () => {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([])

  useEffect(() => {
    supabase
      .from('experiencias')
      .select('*')
      .eq('activo', true)
      .order('orden')
      .then(({ data }) => { if (data) setExperiencias(data) })
  }, [])
  return (
    <div>

      {/* HERO */}
      <section style={{ padding: '5rem 2rem 4rem', maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }} className="hero-grid">
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '1.4rem', border: '1px solid var(--accent-border)', letterSpacing: '0.3px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Disponible para proyectos
          </span>
          <h1 style={{ margin: '0 0 1.2rem', lineHeight: 1.05 }}>
            Hola, soy{' '}
            <span style={{ color: 'var(--accent)' }}>Aitor</span>
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text)', maxWidth: '520px', margin: '0 0 2rem' }}>
            Desarrollador web y técnico de sistemas con experiencia en{' '}
            <strong style={{ color: 'var(--text-h)' }}>React</strong>,{' '}
            <strong style={{ color: 'var(--text-h)' }}>TypeScript</strong> y administración de infraestructura.
            Me apasiona crear soluciones digitales limpias y eficientes.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a href='/trabajos' style={{ padding: '0.75rem 1.8rem', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(165,0,68,0.3)' }}>
              Ver mis trabajos →
            </a>
            <a href='/contacto' style={{ padding: '0.75rem 1.8rem', border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Contactar
            </a>
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[['React', '⚛️'], ['TypeScript', '🔷'], ['Node.js', '🟢'], ['MySQL', '🗄️']].map(([t, icon]) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text)', fontWeight: '500' }}>
                <span>{icon}</span>{t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', flexShrink: 0 }} className="hero-avatar">
          <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'var(--accent-bg)', border: '3px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem', boxShadow: '0 8px 30px rgba(165,0,68,0.2)' }}>👨💻</div>
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: '#22c55e', borderRadius: '50%', width: '22px', height: '22px', border: '3px solid var(--bg)' }} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--code-bg)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: '0.5rem', borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <p style={{ margin: 0, fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent)', letterSpacing: '-1px' }}>{s.valor}</p>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: 'var(--text)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ padding: '4.5rem 2rem', maxWidth: '960px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '0.4rem' }}>Tecnologías</h2>
        <p style={{ color: 'var(--text)', marginBottom: '2rem', fontSize: '0.95rem', margin: '0 0 2rem' }}>Herramientas y lenguajes con los que trabajo habitualmente.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {skills.map(s => (
            <div key={s.nombre} style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.1rem 1.3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-h)', fontWeight: '600' }}>{s.nombre}</span>
                <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{s.nivel}%</span>
              </div>
              <div style={{ height: '5px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.nivel}%`, background: 'linear-gradient(90deg, var(--accent), #d4006b)', borderRadius: '10px' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section style={{ padding: '0 2rem 4.5rem', maxWidth: '960px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '0.4rem' }}>Experiencia</h2>
        <p style={{ color: 'var(--text)', marginBottom: '2rem', fontSize: '0.95rem', margin: '0 0 2rem' }}>Mi trayectoria profesional.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experiencias.map((exp) => (
            <div key={exp.empresa} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.2rem', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '13px', height: '13px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, boxShadow: '0 0 0 3px var(--accent-bg)' }} />
                <div style={{ width: '2px', flex: 1, background: 'var(--border)', minHeight: '60px' }} />
              </div>
              <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.3rem 1.5rem', background: 'var(--code-bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: '700', color: 'var(--text-h)', margin: 0, fontSize: '1rem' }}>{exp.puesto}</p>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '0.2rem 0.7rem', borderRadius: '20px', border: '1px solid var(--accent-border)', fontWeight: '600' }}>{exp.periodo}</span>
                </div>
                <p style={{ color: 'var(--accent)', margin: '0 0 0.6rem', fontSize: '0.88rem', fontWeight: '600' }}>{exp.empresa}</p>
                <p style={{ color: 'var(--text)', fontSize: '0.88rem', lineHeight: '1.7', margin: '0 0 0.8rem' }}>{exp.descripcion}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.76rem', fontWeight: '500' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--code-bg)', padding: '5rem 2rem', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', background: 'var(--accent-bg)', color: 'var(--accent)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '1.2rem', border: '1px solid var(--accent-border)' }}>📬 Contacto</span>
        <h2 style={{ marginBottom: '0.8rem', fontSize: '1.8rem' }}>¿Tienes un proyecto en mente?</h2>
        <p style={{ color: 'var(--text)', fontSize: '1rem', maxWidth: '420px', margin: '0 auto 2.5rem' }}>Estoy disponible para colaborar en proyectos web o de sistemas. Hablemos sin compromiso.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href='/contacto' style={{ padding: '0.8rem 2rem', background: 'var(--accent)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem', boxShadow: '0 4px 14px rgba(165,0,68,0.3)' }}>
            Escribirme →
          </a>
          <a href='/trabajos' style={{ padding: '0.8rem 2rem', border: '1.5px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }}>
            Ver trabajos
          </a>
        </div>
      </section>

    </div>
  )
}
