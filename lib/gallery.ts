export type Work = { src: string; alt: string; w: number; h: number }

/**
 * Fotos reales de trabajos de Climex (carpeta public/trabajos).
 * La primera se muestra en grande en la portada. Para agregar una foto:
 * cópiala a public/trabajos y agrega una línea aquí con su tamaño en píxeles.
 */
export const works: Work[] = [
  {
    src: '/trabajos/01-tablero-unidad-paquete.jpg',
    alt: 'Técnico de Climex revisando el tablero eléctrico de una unidad tipo paquete en azotea',
    w: 1600,
    h: 1200,
  },
  {
    src: '/trabajos/09-servicio-condensadoras-carrier-mirage.jpg',
    alt: 'Servicio a condensadoras Carrier y Mirage instaladas en muro de un local comercial',
    w: 1512,
    h: 1512,
  },
  {
    src: '/trabajos/06-condensadoras-minisplit-azotea.jpg',
    alt: 'Proyecto con catorce condensadoras de minisplit alineadas en azotea',
    w: 1600,
    h: 747,
  },
  {
    src: '/trabajos/04-condensadoras-mirage-inverter.jpg',
    alt: 'Instalación de dos condensadoras Mirage Inverter X sobre base metálica',
    w: 963,
    h: 1280,
  },
  {
    src: '/trabajos/05-unidad-paquete-mirage-azotea.jpg',
    alt: 'Unidad tipo paquete Mirage instalada en azotea residencial',
    w: 1280,
    h: 960,
  },
  {
    src: '/trabajos/10-ductos-aislados-azotea.jpg',
    alt: 'Red de ductos aislados para climatización en azotea',
    w: 1280,
    h: 963,
  },
  {
    src: '/trabajos/07-mantenimiento-cassette-oficinas.jpg',
    alt: 'Mantenimiento de equipo tipo cassette en plafón de oficinas',
    w: 1600,
    h: 1200,
  },
  {
    src: '/trabajos/02-paquete-carrier-nave-industrial.jpg',
    alt: 'Unidad tipo paquete Carrier sobre techo de nave industrial',
    w: 720,
    h: 1280,
  },
  {
    src: '/trabajos/03-maniobra-grua-equipo-industrial.jpg',
    alt: 'Maniobra con grúa para descarga de equipo de climatización industrial',
    w: 1600,
    h: 1200,
  },
  {
    src: '/trabajos/08-ventilacion-techo-nave.jpg',
    alt: 'Instalación de sistema de ventilación en techo de nave industrial',
    w: 1200,
    h: 1600,
  },
]
