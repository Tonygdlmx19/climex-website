import { faqs, type Faq } from './faq'
import { services, type Service } from './services'
import { works, type Work } from './gallery'

export type Landing = {
  slug: string
  service: Service
  eyebrow: string
  /** H1 con la palabra clave principal */
  h1: string
  metaTitle: string
  metaDescription: string
  lead: string
  paragraphs: string[]
  /** Señales / situaciones en las que el cliente necesita este servicio */
  signals: { title: string; items: string[] }
  faq: Faq[]
  photos: Work[]
  whatsappMessage: string
  /** Opción del formulario que se preselecciona */
  formService: string
}

const byId = (id: string) => services.find((s) => s.id === id)!
const pick = (idx: number[]) => idx.map((i) => works[i])

export const landings: Landing[] = [
  {
    slug: 'mantenimiento-aire-acondicionado-guadalajara',
    service: byId('mantenimiento'),
    eyebrow: 'Mantenimiento',
    h1: 'Mantenimiento de aire acondicionado en Guadalajara',
    metaTitle: 'Mantenimiento de Aire Acondicionado en Guadalajara',
    metaDescription:
      'Mantenimiento preventivo de minisplit y aire acondicionado en Guadalajara, Zapopan, Tlaquepaque y Tonalá. Técnicos certificados, 30 días de garantía. Cotiza por WhatsApp.',
    lead:
      'Limpieza profunda, revisión eléctrica y de gas para que tu minisplit, piso techo o equipo paquete enfríe como el primer día y gaste menos luz.',
    paragraphs: [
      'Un equipo sin mantenimiento pierde capacidad de enfriamiento, consume hasta 30 % más energía y termina fallando en pleno calor. Nuestro servicio de mantenimiento preventivo en Guadalajara y zona metropolitana deja tu aire acondicionado limpio, calibrado y con un diagnóstico por escrito.',
      'Atendemos casas, departamentos, oficinas, comercios y naves industriales. Para empresas ofrecemos pólizas de mantenimiento programado con reporte por equipo y atención prioritaria.',
    ],
    signals: {
      title: 'Tu equipo necesita mantenimiento si…',
      items: [
        'Enfría menos que antes o tarda en llegar a la temperatura',
        'Tiene mal olor o sale polvo al encenderlo',
        'Gotea agua por la unidad interior',
        'El recibo de luz subió sin explicación',
        'Hace ruido o vibra más de lo normal',
        'Pasaron más de 6 meses desde el último servicio',
      ],
    },
    faq: [...faqs.mantenimiento, faqs.general[0], faqs.general[2]],
    photos: pick([6, 0, 1]),
    whatsappMessage: 'Hola Climex, quiero cotizar el mantenimiento de mi aire acondicionado.',
    formService: 'Mantenimiento',
  },
  {
    slug: 'reparacion-aire-acondicionado-guadalajara',
    service: byId('reparacion'),
    eyebrow: 'Reparación',
    h1: 'Reparación de aire acondicionado en Guadalajara',
    metaTitle: 'Reparación de Aire Acondicionado en Guadalajara',
    metaDescription:
      'Reparación de minisplit y aire acondicionado de todas las marcas en Guadalajara y zona metropolitana. Diagnóstico preciso, refacciones originales y garantía por escrito.',
    lead:
      '¿Tu aire acondicionado no enfría, gotea o no enciende? Diagnosticamos la falla y la reparamos con refacciones originales y garantía por escrito.',
    paragraphs: [
      'Reparamos equipos de aire acondicionado de cualquier marca y tipo: minisplit, piso techo, ventana, fan & coil, paquete y divididos. Antes de hacer cualquier trabajo te entregamos un diagnóstico claro y un presupuesto por escrito, para que decidas sin sorpresas.',
      'Fugas de gas, compresores, motores, capacitores, tarjetas electrónicas, drenajes y ruidos: nuestros técnicos certificados llegan con herramienta especializada y resuelven la mayoría de las fallas en la primera visita.',
    ],
    signals: {
      title: 'Fallas que reparamos todos los días',
      items: [
        'No enfría o enfría muy poco',
        'No enciende o se apaga solo',
        'Gotea agua o hace hielo en la unidad',
        'Ruidos, vibraciones o mal olor',
        'Fuga de gas refrigerante',
        'Control o tarjeta electrónica sin respuesta',
      ],
    },
    faq: [...faqs.reparacion, faqs.general[3], faqs.general[4]],
    photos: pick([1, 0, 4]),
    whatsappMessage: 'Hola Climex, mi aire acondicionado tiene una falla y quiero cotizar la reparación.',
    formService: 'Reparación',
  },
  {
    slug: 'instalacion-aire-acondicionado-guadalajara',
    service: byId('instalacion'),
    eyebrow: 'Instalación',
    h1: 'Instalación de aire acondicionado en Guadalajara',
    metaTitle: 'Instalación de Aire Acondicionado en Guadalajara',
    metaDescription:
      'Instalación de minisplit y aire acondicionado en Guadalajara, Zapopan, Tlaquepaque y Tonalá. Tubería, eléctrico, drenaje y albañilería incluidos. 90 días de garantía.',
    lead:
      'Instalación integral de minisplit, piso techo y equipos paquete: tubería, eléctrico, drenaje y albañilería en un solo servicio, con 90 días de garantía.',
    paragraphs: [
      'Una buena instalación es la diferencia entre un equipo que dura 15 años y uno que falla al segundo verano. Calculamos la capacidad correcta para tu espacio, instalamos con tubería de cobre, cableado y protecciones adecuadas, y dejamos todo limpio y funcionando.',
      'Instalamos equipos nuevos que nos compres o que ya tengas, en casas, departamentos, oficinas, comercios y naves. Si necesitas varios equipos o un proyecto completo, también hacemos el cálculo de carga térmica y el diseño del sistema.',
    ],
    signals: {
      title: 'Qué incluye nuestra instalación',
      items: [
        'Visita y recomendación de la capacidad correcta',
        'Montaje de unidad interior y exterior con soportes',
        'Tubería de cobre aislada y cableado eléctrico',
        'Drenaje, perforaciones, resanes y acabados',
        'Vacío, carga, pruebas de funcionamiento y calibración',
        'Explicación de uso y cuidados del equipo',
      ],
    },
    faq: [...faqs.instalacion, faqs.general[6], faqs.general[2]],
    photos: pick([2, 3, 9]),
    whatsappMessage: 'Hola Climex, quiero cotizar la instalación de un aire acondicionado.',
    formService: 'Instalación',
  },
]

export const landingBySlug = (slug: string) => landings.find((l) => l.slug === slug)

/** Ruta de la landing de un servicio, o la sección de /servicios si no tiene landing. */
export const serviceHref = (id: string) => {
  const l = landings.find((x) => x.service.id === id)
  return l ? `/${l.slug}` : `/servicios#${id}`
}
