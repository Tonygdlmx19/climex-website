import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, CheckCircle2, XCircle, MessageCircle, Phone, FileText } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import CTABand from '@/components/CTABand'
import TrackedLink from '@/components/TrackedLink'
import { site, whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Garantías',
  description: `Póliza de garantía de ${site.name}: ${site.guarantees.installation} en instalación y reparación, ${site.guarantees.maintenance} en mantenimiento y garantía de fábrica en equipos. Descárgala en PDF.`,
  alternates: { canonical: '/garantias' },
}

const pdfHref = '/garantia-climex.pdf'

const vigencias = [
  {
    servicio: 'Instalación de equipos',
    vigencia: '90 días (3 meses)',
    respalda:
      'Fallas técnicas en la mano de obra de instalación: conexiones de tubería, cableado eléctrico realizado por Climex, drenaje, fijación y puesta en marcha.',
  },
  {
    servicio: 'Reparación',
    vigencia: '90 días (3 meses)',
    respalda:
      'Fallas técnicas en la mano de obra de la reparación realizada. Las refacciones nuevas conservan además la garantía de su fabricante.',
  },
  {
    servicio: 'Mantenimiento preventivo',
    vigencia: '30 días (1 mes)',
    respalda: 'Fallas técnicas que sean consecuencia directa del servicio de mantenimiento preventivo.',
  },
]

const cubre = [
  'La visita de revisión y la mano de obra para corregir una falla atribuible al trabajo realizado por Climex.',
  'Los materiales menores necesarios para dicha corrección (soldadura, cinta, aislamiento, sujeción).',
  'Fugas de refrigerante en uniones o soldaduras hechas por Climex durante la vigencia.',
  'Fallas de drenaje, fijación o conexión eléctrica derivadas de la instalación realizada por Climex.',
]

const noCubre = [
  'En mantenimiento preventivo: partes o piezas que resulten defectuosas o desgastadas, ni ningún consumible (gas refrigerante, capacitores, filtros, fusibles, etc.).',
  'Fallas de fábrica del equipo o de refacciones: se atienden con la garantía del fabricante.',
  'Uso excesivo o distinto al indicado por el fabricante, y falta de mantenimiento periódico.',
  'Mala calidad de los materiales que el cliente entregue para la ejecución de los trabajos.',
  'Modificaciones, reparaciones o manipulación realizadas por el cliente o por terceros.',
  'Afectaciones directas por otros trabajos que realice el cliente (obra civil, remodelación, plomería, etc.).',
  'Cortos circuitos, variaciones o fallas en el suministro eléctrico, golpes, incendios, inundaciones o desastres naturales.',
]

const pasos = [
  {
    title: 'Repórtanos la falla',
    text: `Escríbenos por WhatsApp, llama al ${site.phones.main.display} o envía un correo con tu nombre, número de nota o factura y una breve descripción del problema.`,
  },
  {
    title: 'Programamos la revisión',
    text: `Agendamos una visita técnica con prioridad, en horario de ${site.hours[0].days.toLowerCase()} de ${site.hours[0].time} y ${site.hours[1].days.toLowerCase()} de ${site.hours[1].time}.`,
  },
  {
    title: 'Diagnóstico y solución',
    text: 'Si la falla está cubierta, la corregimos sin costo. Si no lo está, te lo explicamos con claridad y te entregamos una cotización por escrito antes de realizar cualquier trabajo.',
  },
]

const requisitos = [
  'Presentar la nota de servicio, remisión o factura del trabajo realizado por Climex.',
  'Reportar la falla dentro de la vigencia de la garantía.',
  'Que el equipo o la instalación no haya sido intervenido por personal ajeno a Climex desde la entrega del trabajo.',
  'Permitir el acceso al equipo y a la instalación en la fecha y hora acordadas.',
]

const recomendaciones = [
  'Da mantenimiento preventivo a tu equipo cada 6 meses en uso residencial y cada 3 o 4 meses en oficinas, comercios o ambientes con polvo.',
  'No modifiques la instalación eléctrica, la tubería ni el drenaje sin consultarnos.',
  'Reporta cualquier anomalía en cuanto la detectes: un ruido, goteo o baja de enfriamiento atendido a tiempo evita daños mayores.',
  'Guarda tu nota de servicio, factura y la póliza; son tu comprobante ante Climex y ante el fabricante.',
]

function DownloadButton({ className = '' }: { className?: string }) {
  return (
    <a href={pdfHref} download="Poliza-de-garantia-Climex.pdf" className={`btn-primary ${className}`}>
      <Download className="h-4 w-4" aria-hidden="true" />
      Descargar póliza en PDF
    </a>
  )
}

export default function GarantiasPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Garantía por escrito en cada servicio"
        description="Aquí está, sin letra chica, lo que cubre nuestra garantía, por cuánto tiempo y cómo hacerla válida."
        crumbs={[{ name: 'Garantías' }]}
      />

      {/* Resumen + descarga */}
      <section className="bg-white py-14 lg:py-16">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { n: site.guarantees.installation, l: 'en mano de obra de instalación y reparación' },
              { n: site.guarantees.maintenance, l: 'en servicio de mantenimiento preventivo' },
              { n: 'De fábrica', l: 'en equipos nuevos y refacciones, según cada fabricante' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
                <p className="text-3xl font-extrabold text-brand-600">{s.n}</p>
                <p className="mt-1 text-sm text-slate-600">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-line bg-mist p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                <FileText className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-ink">Póliza de garantía completa (PDF)</p>
                <p className="mt-0.5 text-sm text-slate-600">
                  El mismo documento que te entregamos con tu servicio. Guárdalo junto con tu nota o factura.
                </p>
              </div>
            </div>
            <DownloadButton className="shrink-0" />
          </div>
        </div>
      </section>

      {/* Vigencias */}
      <section className="bg-mist py-14 lg:py-16">
        <div className="container">
          <span className="eyebrow">Vigencias</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink">Cuánto dura cada garantía</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            La garantía inicia en la fecha de entrega de los trabajos, indicada en la nota de servicio o factura, y termina al
            cumplirse el plazo señalado. Los trabajos de corrección realizados en garantía no reinician ni extienden la
            vigencia original.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {vigencias.map((v) => (
              <div key={v.servicio} className="card p-6">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">{v.servicio}</p>
                <p className="mt-2 text-2xl font-extrabold text-brand-600">{v.vigencia}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{v.respalda}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cubre / no cubre */}
      <section className="bg-white py-14 lg:py-16">
        <div className="container">
          <span className="eyebrow">Cobertura</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink">Qué cubre y qué no</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-emerald-800">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Sí cubre
              </h3>
              <ul className="mt-4 space-y-3">
                {cubre.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-rose-800">
                <XCircle className="h-5 w-5" aria-hidden="true" /> No cubre
              </h3>
              <ul className="mt-4 space-y-3">
                {noCubre.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo hacerla válida */}
      <section className="bg-mist py-14 lg:py-16">
        <div className="container">
          <span className="eyebrow">Paso a paso</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink">Cómo hacer válida tu garantía</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {pasos.map((p, i) => (
              <li key={p.title} className="card p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-extrabold text-ink">Requisitos</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {requisitos.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="flex flex-col gap-3 self-start rounded-2xl bg-navy-800 p-6 text-white">
              <p className="font-bold">¿Tienes una falla en garantía? Repórtala ahora.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  event="contact_whatsapp"
                  location="garantias"
                  href={whatsappUrl('Hola Climex, quiero reportar una falla en garantía. Mi número de nota/factura es: ')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex-1"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </TrackedLink>
                <TrackedLink event="contact_call" location="garantias" href={`tel:${site.phones.main.e164}`} className="btn-ghost-light flex-1">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular">{site.phones.main.display}</span>
                </TrackedLink>
              </div>
              <p className="text-xs text-navy-200">
                O escribe a{' '}
                <TrackedLink event="contact_email" href={`mailto:${site.email}`} className="font-semibold text-white hover:underline">
                  {site.email}
                </TrackedLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fabricante + recomendaciones */}
      <section className="bg-white py-14 lg:py-16">
        <div className="container grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">Equipos nuevos</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">Garantía de fábrica en equipos y refacciones</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              La garantía de unidades nuevas y refacciones la otorga directamente el fabricante, dentro de los plazos y
              condiciones que cada uno establece. Climex te orienta en el trámite y te ayuda a identificar si una falla
              corresponde al equipo o a la instalación.
            </p>
            <table className="mt-5 w-full text-sm">
              <caption className="pb-2 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Ejemplo: equipos Mirage
              </caption>
              <tbody className="divide-y divide-line">
                {[
                  ['Compresor', '6 años'],
                  ['Todas sus piezas', '1 año'],
                  ['Tarjeta electrónica y control', '3 meses'],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-2.5 text-slate-700">{k}</td>
                    <td className="py-2.5 text-right font-extrabold text-brand-600">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Los plazos varían según la marca, el modelo y la fecha de compra; consulta la póliza del fabricante incluida
              con tu equipo. Para conservar la garantía de fábrica, la mayoría de los fabricantes exige instalación por un
              técnico certificado y mantenimiento periódico.
            </p>
          </div>
          <div>
            <span className="eyebrow">Consejos</span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">Para conservar tu garantía</h2>
            <ul className="mt-5 space-y-3">
              {recomendaciones.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-mist p-5 text-sm text-slate-600">
              Esta póliza no limita los derechos que te otorga la Ley Federal de Protección al Consumidor. Cualquier duda
              sobre su aplicación puedes aclararla con nosotros antes de contratar el servicio.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <DownloadButton />
              <Link href="/contacto" className="btn-outline">Solicitar cotización</Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
