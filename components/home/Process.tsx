import { MessageCircle, ClipboardCheck, Wrench, ShieldCheck } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const steps = [
  {
    icon: MessageCircle,
    title: 'Nos escribes o nos llamas',
    text: 'Cuéntanos qué necesitas por WhatsApp, teléfono o el formulario. Respondemos el mismo día.',
  },
  {
    icon: ClipboardCheck,
    title: 'Diagnóstico y cotización',
    text: 'Visitamos tu espacio, revisamos el equipo o el proyecto y te damos un presupuesto claro por escrito.',
  },
  {
    icon: Wrench,
    title: 'Realizamos el servicio',
    text: 'Técnicos certificados, refacciones originales y trabajo limpio. Dejamos todo funcionando y ordenado.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía y seguimiento',
    text: 'Entregamos garantía por escrito y te recordamos cuándo toca el siguiente mantenimiento.',
  },
]

export default function Process() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso claro de principio a fin"
          description="Sin sorpresas: sabes qué va a pasar, cuánto cuesta y quién viene a tu casa o negocio."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-line bg-mist p-6">
              <span className="tabular absolute right-5 top-5 text-4xl font-extrabold text-navy-100" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                <s.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-ink">
                <span className="sr-only">Paso {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
