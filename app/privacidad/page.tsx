import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: `Aviso de privacidad de ${site.name}.`,
  alternates: { canonical: '/privacidad' },
  robots: { index: false },
}

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Aviso de privacidad"
        description="Cómo usamos los datos que nos compartes al solicitar una cotización."
        crumbs={[{ name: 'Aviso de privacidad' }]}
      />
      <article className="container max-w-3xl space-y-6 py-16 leading-relaxed text-slate-700">
        <p>
          <strong className="text-ink">{site.name}</strong>, con domicilio en {site.address.street},{' '}
          {site.address.neighborhood}, {site.address.city}, {site.address.state}, es responsable del tratamiento de
          tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
          Particulares.
        </p>
        <h2 className="text-xl font-extrabold text-ink">Datos que recabamos</h2>
        <p>
          Nombre, teléfono, correo electrónico y la descripción del servicio que solicitas a través del formulario
          de cotización, WhatsApp, llamada telefónica o correo.
        </p>
        <h2 className="text-xl font-extrabold text-ink">Para qué los usamos</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Contactarte para dar seguimiento a tu solicitud y elaborar tu cotización.</li>
          <li>Programar visitas técnicas y servicios.</li>
          <li>Emitir garantías y recordatorios de mantenimiento.</li>
        </ul>
        <p>No vendemos ni compartimos tus datos con terceros ajenos a la prestación del servicio.</p>
        <h2 className="text-xl font-extrabold text-ink">Derechos ARCO</h2>
        <p>
          Puedes acceder, rectificar, cancelar u oponerte al uso de tus datos escribiendo a{' '}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-600 hover:underline">{site.email}</a>.
        </p>
        <h2 className="text-xl font-extrabold text-ink">Cookies y analítica</h2>
        <p>
          Este sitio puede usar herramientas de medición (Google Analytics y Google Ads) para conocer cómo se usa
          la página y medir el resultado de nuestra publicidad. Puedes desactivar las cookies desde tu navegador.
        </p>
        <p className="text-sm text-slate-500">Última actualización: septiembre de 2026.</p>
      </article>
    </>
  )
}
