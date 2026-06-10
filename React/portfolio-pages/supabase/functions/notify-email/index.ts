import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const TO_EMAIL = 'aiktorreznov@gmail.com'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const payload = await req.json()
    const record = payload.record

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <div style="background: #A50044; padding: 16px 24px; border-radius: 8px; margin-bottom: 24px;">
          <h1 style="color: #fff; margin: 0; font-size: 1.2rem;">📬 Nuevo mensaje en tu portfolio</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151; width: 30%;">Nombre</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">${record.nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">
              <a href="mailto:${record.email}" style="color: #A50044;">${record.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Asunto</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">${record.asunto}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #374151; vertical-align: top;">Mensaje</td>
            <td style="padding: 10px 0; color: #6b7280; line-height: 1.7;">${record.mensaje}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 12px 16px; background: #f9fafb; border-radius: 8px; font-size: 0.85rem; color: #9ca3af;">
          Recibido el ${new Date(record.created_at).toLocaleString('es-ES')}
        </div>
        <div style="margin-top: 16px; text-align: center;">
          <a href="mailto:${record.email}" style="display: inline-block; padding: 10px 24px; background: #A50044; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">
            Responder a ${record.nombre} →
          </a>
        </div>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: TO_EMAIL,
        subject: `📬 Nuevo mensaje de ${record.nombre}: ${record.asunto}`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return new Response(JSON.stringify({ error: err }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
})
