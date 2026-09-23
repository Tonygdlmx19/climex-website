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
  googleRating: 4.8,
  googleReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Climex+Soluciones+Integrales+Guadalajara',
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
  email: 'ventas@climexsi.com',
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
  brands: [
    { name: 'Mirage', logo: '/images/Mirage.png' },
    { name: 'Carrier', logo: '/images/Carrier.png' },
    { name: 'York', logo: '/images/York.png' },
    { name: 'Trane', logo: '/images/Trane.png' },
    { name: 'Lennox', logo: '/images/Lennox.png' },
    { name: 'Hisense', logo: '/images/Hisense.png' },
    { name: 'Honeywell', logo: '/images/Honeywell.png' },
    { name: 'Danfoss', logo: '/images/Danfoss.png' },
  ],
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
