import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow">Error 404</span>
      <h1 className="mt-3 text-4xl font-extrabold text-ink">Esta página no existe</h1>
      <p className="mt-3 max-w-md text-slate-600">
        Puede que el enlace sea del sitio anterior. Regresa al inicio o cotiza directamente tu servicio.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-outline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Ir al inicio
        </Link>
        <Link href="/contacto" className="btn-primary">Cotizar ahora</Link>
      </div>
    </section>
  )
}
