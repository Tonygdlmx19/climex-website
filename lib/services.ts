export type Service = {
  id: string
  title: string
  short: string
  image: string
  intro: string
  includes: { title: string; items: string[] }[]
  outro: string
}

export const services: Service[] = [
  {
    id: 'mantenimiento',
    title: 'Mantenimiento preventivo',
    short: 'Limpieza profunda, revisión eléctrica y de gas para que tu equipo enfríe como el primer día.',
    image: '/images/servicio-mantenimiento.jpg',
    intro:
      'El mantenimiento preventivo y correctivo mantiene tus equipos funcionando al máximo todo el año, reduce el consumo de energía y evita fallas costosas.',
    includes: [
      {
        title: 'Qué incluye',
        items: [
          'Limpieza profunda de filtros, serpentines y turbina',
          'Verificación y recarga de gas refrigerante',
          'Revisión del sistema eléctrico y conexiones',
          'Lubricación de partes móviles',
          'Diagnóstico completo del equipo',
          'Detección y reparación de fugas',
        ],
      },
      {
        title: 'Beneficios',
        items: [
          'Mayor vida útil del equipo',
          'Menor consumo de energía',
          'Mejor calidad del aire',
          '30 días de garantía en el servicio',
          'Pólizas de mantenimiento para empresas',
        ],
      },
    ],
    outro: 'Técnicos certificados y herramienta de última generación en cada visita.',
  },
  {
    id: 'reparacion',
    title: 'Reparación',
    short: 'Diagnóstico preciso y refacciones originales para todas las marcas.',
    image: '/images/servicio-reparacion.jpg',
    intro:
      'Diagnosticamos y reparamos fallas en equipos de aire acondicionado de cualquier marca: minisplit, piso-techo, paquete, ductos y sistemas comerciales.',
    includes: [
      {
        title: 'Reparaciones más comunes',
        items: [
          'Equipo que no enfría o enfría poco',
          'Fugas de gas refrigerante',
          'Cambio de compresores, motores y capacitores',
          'Tarjetas electrónicas y controles',
          'Goteo de agua y drenajes',
          'Ruidos y vibraciones',
        ],
      },
      {
        title: 'Cómo trabajamos',
        items: [
          'Visita de diagnóstico con presupuesto claro',
          'Refacciones originales',
          'Garantía por escrito en la reparación',
        ],
      },
    ],
    outro: 'Si otro técnico no pudo, nosotros sí. Cotización sin compromiso.',
  },
  {
    id: 'instalacion',
    title: 'Instalación',
    short: 'Instalación integral: tubería, eléctrico, drenaje y albañilería en un solo servicio.',
    image: '/images/servicio-instalacion.jpg',
    intro:
      'Nos encargamos de todo para que tu equipo quede funcionando perfecto: desde la selección del equipo ideal hasta el último detalle de acabado.',
    includes: [
      {
        title: 'Nuestro proceso',
        items: [
          'Evaluación del espacio y recomendación del equipo',
          'Instalación de unidad interior y exterior',
          'Tubería de cobre y cableado eléctrico',
          'Drenaje y trabajos de albañilería',
          'Pruebas de funcionamiento y calibración',
          'Capacitación de uso y cuidado',
        ],
      },
      {
        title: 'Por qué con nosotros',
        items: [
          'Un solo proveedor para todo',
          'Instalación limpia y profesional',
          '90 días de garantía en la instalación',
        ],
      },
    ],
    outro: 'Trabajamos con todas las marcas y capacidades del mercado.',
  },
  {
    id: 'venta',
    title: 'Venta de equipos',
    short: 'Minisplit inverter, piso-techo y paquete de las mejores marcas, con garantía de fábrica.',
    image: '/images/servicio-venta.jpg',
    intro:
      'Amplia variedad de equipos de aire acondicionado de las mejores marcas, con garantía de fábrica, respaldo técnico y precio competitivo.',
    includes: [
      {
        title: 'Marcas',
        items: ['Mirage', 'York', 'Trane', 'Carrier', 'Prime', 'Lennox', 'Hisense'],
      },
      {
        title: 'Tipos de equipo',
        items: [
          'Minisplit inverter residencial y comercial',
          'Piso-techo',
          'Tipo paquete',
          'Sistema dividido y ductos',
          'Equipos de precisión',
        ],
      },
      {
        title: 'Incluye',
        items: ['Asesoría para elegir la capacidad correcta', 'Instalación profesional opcional', 'Garantía de fábrica según el fabricante', 'Servicio posventa y refacciones'],
      },
    ],
    outro: 'Te ayudamos a encontrar el equipo correcto para tu espacio y presupuesto.',
  },
  {
    id: 'proyectos',
    title: 'Proyectos comerciales e industriales',
    short: 'Diseño, cálculo de carga térmica e instalación para oficinas, comercios y naves.',
    image: '/images/servicio-proyectos.jpg',
    intro:
      'Si necesitas climatizar un espacio comercial o industrial, diseñamos y ejecutamos el proyecto completo con base en cálculo de carga térmica.',
    includes: [
      {
        title: 'Qué incluye',
        items: [
          'Visita técnica y levantamiento',
          'Cálculo de carga térmica',
          'Diseño del sistema y selección de equipos',
          'Presupuesto detallado',
          'Planos y especificaciones',
          'Instalación, ductos, difusores y control',
          'Revisión y diagnóstico de sistemas VRF',
        ],
      },
      {
        title: 'Tipos de proyecto',
        items: ['Oficinas y corporativos', 'Restaurantes y comercios', 'Bodegas y plantas', 'Escuelas, clínicas y hoteles'],
      },
    ],
    outro: '¿Ya tienes el proyecto definido? Cotizamos la ejecución con la calidad que esperas.',
  },
  {
    id: 'complementarios',
    title: 'Servicios complementarios',
    short: 'Albañilería, tabla roca, pintura, fontanería e instalaciones eléctricas.',
    image: '/images/servicio-complementarios.jpg',
    intro:
      'Para que tu proyecto quede completamente terminado, también realizamos los trabajos alrededor de la instalación.',
    includes: [
      {
        title: 'Servicios',
        items: [
          'Albañilería: apertura y cierre de huecos, resanes y acabados',
          'Tabla roca: plafones, muros divisorios y nichos',
          'Pintura de áreas afectadas por la instalación',
          'Fontanería: drenajes y conexiones de agua',
          'Instalaciones eléctricas: acometidas, centros de carga y cableado',
        ],
      },
      {
        title: 'Ventajas',
        items: ['Un solo proveedor y un solo presupuesto', 'Coordinación eficiente', 'Menor tiempo de ejecución'],
      },
    ],
    outro: 'Dejamos tu espacio listo y funcionando, sin que tengas que buscar a nadie más.',
  },
]
