import { MapPin } from 'lucide-react'
import { site } from '@/lib/site'

export default function Coverage() {
  return (
    <section className="border-y border-line bg-white py-8">
      <div className="container flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <p className="flex items-center gap-2 text-sm font-bold text-ink">
          <MapPin className="h-5 w-5 text-brand-600" aria-hidden="true" />
          Servicio a domicilio en toda la zona metropolitana de Guadalajara
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {site.coverage.map((c) => (
            <li key={c} className="rounded-full bg-mist px-3.5 py-1.5 text-sm font-semibold text-slate-700">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
