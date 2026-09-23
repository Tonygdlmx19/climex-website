import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import Contact from '@/components/home/Contact'

export const metadata: Metadata = {
  title: 'Contacto y cotización gratis',
  description:
    'Cotiza gratis tu instalación, mantenimiento o reparación de aire acondicionado en Guadalajara. WhatsApp, teléfono y formulario. Respuesta el mismo día.',
  alternates: { canonical: '/contacto' },
}

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Cotiza gratis tu servicio"
        description="Escríbenos por WhatsApp, llámanos o déjanos tus datos y te contactamos hoy mismo."
        crumbs={[{ name: 'Contacto' }]}
      />
      <Contact />
    </>
  )
}
