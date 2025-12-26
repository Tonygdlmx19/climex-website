import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Climex Soluciones Integrales | Aire Acondicionado en Guadalajara',
  description: 'Expertos en instalación, mantenimiento y reparación de aires acondicionados en Guadalajara. Más de 8 años de experiencia. Cotiza gratis.',
  keywords: 'aire acondicionado, guadalajara, instalacion, mantenimiento, reparacion, clima, minisplit',
  openGraph: {
    title: 'Climex Soluciones Integrales',
    description: 'Expertos en climatización en Guadalajara',
    type: 'website',
    locale: 'es_MX',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-white text-neutral-dark antialiased">
        <Header />
        <main>{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  )
}
