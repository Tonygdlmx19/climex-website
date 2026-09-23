import { Plus } from 'lucide-react'
import type { Faq } from '@/lib/faq'
import SectionHeading from '@/components/ui/SectionHeading'

type Props = {
  items: Faq[]
  eyebrow?: string
  title?: string
  description?: string
  /** Si es true, incluye el JSON-LD de FAQPage para resultados enriquecidos. */
  schema?: boolean
  id?: string
}

/** Sección de preguntas frecuentes con acordeón nativo (accesible, sin JS). */
export default function FAQ({
  items,
  eyebrow = 'Preguntas frecuentes',
  title = 'Resolvemos tus dudas',
  description,
  schema = true,
  id = 'preguntas',
}: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section id={id} className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line rounded-3xl border border-line">
          {items.map((f) => (
            <details key={f.q} className="group px-6 py-1 open:bg-mist/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-bold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-5 pr-12 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </section>
  )
}
