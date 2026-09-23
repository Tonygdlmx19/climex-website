'use client'

import { useState, type FormEvent } from 'react'
import { Send, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react'
import { serviceOptions, whatsappUrl } from '@/lib/site'
import { track } from '@/lib/analytics'

type Status = 'idle' | 'sending' | 'ok' | 'error'

const initial = { nombre: '', telefono: '', email: '', servicio: '', mensaje: '' }

/**
 * Formulario de cotización. Se envía a Netlify Forms (ver public/__forms.html)
 * y ofrece como alternativa mandar el mismo mensaje por WhatsApp.
 */
export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState(initial)
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setData({ ...data, [k]: e.target.value })

  const waMessage = () =>
    `Hola Climex, quiero una cotización.\n\nNombre: ${data.nombre}\nTeléfono: ${data.telefono}\nServicio: ${data.servicio || 'Por definir'}\nMensaje: ${data.mensaje || '-'}`

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const body = new URLSearchParams({ 'form-name': 'cotizacion', ...data })
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      track('form_submit', { servicio: data.servicio || 'sin especificar' })
      setStatus('ok')
      setData(initial)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-brand-50 px-6 py-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-brand-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-extrabold text-ink">Recibimos tu solicitud</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">
          Te contactamos hoy mismo en horario de oficina. Si es urgente, escríbenos por WhatsApp.
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('contact_whatsapp', { location: 'form-ok' })}
          className="btn-whatsapp mt-6"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Abrir WhatsApp
        </a>
        <button type="button" onClick={() => setStatus('idle')} className="mt-3 text-xs font-semibold text-slate-500 hover:text-ink">
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  return (
    <form name="cotizacion" method="POST" action="/__forms.html" onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <input type="hidden" name="form-name" value="cotizacion" />
      <p className="hidden">
        <label>
          No llenar: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="f-nombre" className="label">Nombre *</label>
          <input id="f-nombre" name="nombre" required autoComplete="name" value={data.nombre} onChange={set('nombre')} className="field" placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="f-telefono" className="label">Teléfono o WhatsApp *</label>
          <input id="f-telefono" name="telefono" type="tel" required autoComplete="tel" inputMode="tel" value={data.telefono} onChange={set('telefono')} className="field" placeholder="33 1234 5678" />
        </div>
      </div>

      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="f-email" className="label">Correo (opcional)</label>
          <input id="f-email" name="email" type="email" autoComplete="email" value={data.email} onChange={set('email')} className="field" placeholder="tu@correo.com" />
        </div>
        <div>
          <label htmlFor="f-servicio" className="label">Servicio *</label>
          <select id="f-servicio" name="servicio" required value={data.servicio} onChange={set('servicio')} className="field">
            <option value="">Selecciona una opción</option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="f-mensaje" className="label">Cuéntanos qué necesitas</label>
        <textarea id="f-mensaje" name="mensaje" rows={4} value={data.mensaje} onChange={set('mensaje')} className="field resize-none" placeholder="Ej. Mi minisplit de 1 tonelada ya no enfría, ¿me pueden dar mantenimiento esta semana?" />
      </div>

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          No pudimos enviar el formulario. Inténtalo de nuevo o mándanos el mensaje por WhatsApp.
        </p>
      )}

      <div className="flex flex-col gap-2 pt-1 sm:flex-row">
        <button type="submit" disabled={status === 'sending'} className="btn-primary flex-1 py-3.5 disabled:opacity-60">
          <Send className="h-4 w-4" aria-hidden="true" />
          {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
        </button>
        <a
          href={whatsappUrl(waMessage())}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('contact_whatsapp', { location: 'form' })}
          className="btn-whatsapp flex-1 py-3.5"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Enviar por WhatsApp
        </a>
      </div>
      <p className="text-xs text-slate-500">
        Al enviar aceptas nuestro{' '}
        <a href="/privacidad" className="font-semibold text-brand-600 hover:underline">aviso de privacidad</a>. Nunca compartimos tus datos.
      </p>
    </form>
  )
}
