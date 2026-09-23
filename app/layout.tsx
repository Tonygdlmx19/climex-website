import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { site } from '@/lib/site'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Aire Acondicionado en Guadalajara`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    'aire acondicionado guadalajara',
    'instalacion de aire acondicionado',
    'mantenimiento de aire acondicionado',
    'reparacion de minisplit',
    'venta de minisplit guadalajara',
    'climex',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${site.name} | Aire Acondicionado en Guadalajara`,
    description: site.description,
    type: 'website',
    locale: 'es_MX',
    url: site.url,
    siteName: site.name,
    images: [{ url: '/images/portada.jpg', width: 1800, height: 1450, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: ['/images/portada.jpg'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#2B3990',
  width: 'device-width',
  initialScale: 1,
}

const gaId = process.env.NEXT_PUBLIC_GA_ID

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  name: site.name,
  url: site.url,
  telephone: site.phones.main.e164,
  email: site.email,
  image: `${site.url}/images/logoClimex.png`,
  logo: `${site.url}/images/logoClimex.png`,
  foundingDate: String(site.foundedYear),
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: site.coverage.map((c) => ({ '@type': 'City', name: c })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.googleRating,
    bestRating: 5,
    ratingCount: 60,
  },
  makesOffer: [
    'Instalación de aire acondicionado',
    'Mantenimiento de aire acondicionado',
    'Reparación de aire acondicionado',
    'Venta de equipos de aire acondicionado',
  ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={manrope.variable}>
      <body className="font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Ir al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
