import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { name: string; href?: string }

export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string
  title: string
  description: string
  crumbs: Crumb[]
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-navy-500/40 blur-3xl" />
      </div>
      <div className="container relative py-16 md:py-20">
        <nav aria-label="Ruta" className="mb-6 flex flex-wrap items-center gap-1 text-xs font-semibold text-navy-200">
          <Link href="/" className="hover:text-white">Inicio</Link>
          {crumbs.map((c) => (
            <span key={c.name} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              {c.href ? (
                <Link href={c.href} className="hover:text-white">{c.name}</Link>
              ) : (
                <span className="text-white">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
        <span className="eyebrow !text-brand-200 before:!bg-brand-300">{eyebrow}</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-navy-100">{description}</p>
      </div>
    </section>
  )
}
