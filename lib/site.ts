/**
 * Fuente única de verdad para los datos de contacto y de la empresa.
 * Cambia aquí y se actualiza en todo el sitio (header, footer, formularios, JSON-LD).
 */
export const site = {
  name: 'Climex Soluciones Integrales',
  shortName: 'Climex',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://climexsi.com',
  tagline: 'Aire acondicionado en Guadalajara',
  description:
    'Instalación, mantenimiento, reparación y venta de aire acondicionado en Guadalajara y zona metropolitana. 18 años de experiencia, técnicos certificados y garantía por escrito.',
  yearsExperience: 18,
  foundedYear: 2008,
  happyClients: 830,
  googleRating: 4.5,
  googleReviewCount: 44,
  // Ficha de Google de Climex (enlace compartido por Tony, entidad /g/12qg744fj)
  googleReviewsUrl: 'https://www.google.com/search?kgmid=%2Fg%2F12qg744fj&q=Climex+Soluciones+Integrales+Guadalajara',
  phones: {
    // Teléfono de contacto (llamadas)
    main: { display: '33 1769 9999', e164: '+523317699999' },
  },
  whatsapp: {
    number: '523324568104',
    display: '33 2456 8104',
    defaultMessage:
      'Hola Climex, me gustaría cotizar un servicio de aire acondicionado.',
  },
  email: 'administracion@climexsi.com',
  address: {
    street: 'Calle Válvula #5986-A',
    neighborhood: 'Col. Álamo Industrial',
    city: 'Guadalajara',
    state: 'Jalisco',
    postalCode: '44490',
    country: 'MX',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Calle+V%C3%A1lvula+5986-A+%C3%81lamo+Industrial+Guadalajara',
    mapsEmbed:
      'https://www.google.com/maps?q=Calle+V%C3%A1lvula+5986-A,+%C3%81lamo+Industrial,+Guadalajara,+Jalisco&output=embed',
  },
  hours: [
    { days: 'Lunes a viernes', time: '9:00 – 18:00' },
    { days: 'Sábado', time: '9:00 – 14:00' },
  ],
  coverage: [
    'Guadalajara',
    'Zapopan',
    'Tlaquepaque',
    'Tonalá',
    'Tlajomulco de Zúñiga',
    'El Salto',
  ],
  guarantees: {
    installation: '90 días',
    maintenance: '30 días',
    equipment: 'Garantía de fábrica según el fabricante',
  },
  // Logos en public/images/brands (PNG con fondo transparente, sin márgenes).
  // Si una marca no tiene archivo de logo, se muestra su nombre en texto.
  brands: [
    { name: 'Mirage', logo: '/images/brands/mirage.png' },
    { name: 'York', logo: '/images/brands/york.png' },
    { name: 'Trane', logo: '/images/brands/trane.png' },
    { name: 'Carrier', logo: '/images/brands/carrier.png' },
    { name: 'Prime', logo: '/images/brands/prime.png' },
    { name: 'Lennox', logo: '/images/brands/lennox.png' },
    { name: 'Hisense', logo: '/images/brands/hisense.png' },
  ] as { name: string; logo: string }[],
  social: {
    // Agrega las URLs reales cuando existan; si quedan vacías no se muestran.
    facebook: '',
    instagram: '',
  },
}

export const whatsappUrl = (message: string = site.whatsapp.defaultMessage) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`

export const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/#servicios' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Trabajos', href: '/#trabajos' },
  { name: 'Opiniones', href: '/#opiniones' },
  { name: 'Contacto', href: '/#contacto' },
]

export const serviceOptions = [
  'Instalación',
  'Mantenimiento',
  'Reparación',
  'Venta de equipo',
  'Proyecto comercial / industrial',
  'Otro',
]
