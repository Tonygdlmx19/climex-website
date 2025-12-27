import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.climexsi.com.mx'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Climex Soluciones Integrales | Aire Acondicionado en Guadalajara',
  description: 'Expertos en instalación, mantenimiento y reparación de aires acondicionados en Guadalajara. Más de 18 años de experiencia. Cotiza gratis.',
  keywords: 'aire acondicionado, guadalajara, instalacion, mantenimiento, reparacion, clima, minisplit',
  openGraph: {
    title: 'Climex Soluciones Integrales',
    description: 'Expertos en climatización en Guadalajara',
    type: 'website',
    locale: 'es_MX',
    images: [
      {
        url: '/images/logoClimex.png',
        width: 500,
        height: 500,
        alt: 'Climex Soluciones Integrales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climex Soluciones Integrales',
    description: 'Expertos en climatización en Guadalajara',
    images: ['/images/logoClimex.png'],
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
