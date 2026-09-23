import { site } from './site'

export type Faq = { q: string; a: string }

/**
 * Preguntas frecuentes. `general` se muestra en la portada; las demás se
 * agregan en la landing de cada servicio (y también alimentan el JSON-LD FAQPage).
 */
export const faqs: Record<'general' | 'mantenimiento' | 'reparacion' | 'instalacion', Faq[]> = {
  general: [
    {
      q: '¿Cada cuánto debo dar mantenimiento a mi aire acondicionado?',
      a: 'En uso residencial recomendamos un mantenimiento cada 6 meses, idealmente antes de la temporada de calor. En oficinas, comercios o ambientes con mucho polvo conviene cada 3 o 4 meses. Un equipo limpio enfría mejor, consume menos luz y dura más años.',
    },
    {
      q: '¿Cuánto cuesta el mantenimiento o la reparación?',
      a: 'Depende del tipo de equipo, la capacidad y el trabajo necesario. Te damos una cotización clara por escrito antes de iniciar, sin costos ocultos. Escríbenos por WhatsApp con la marca y capacidad de tu equipo y te respondemos el mismo día.',
    },
    {
      q: '¿Qué zonas atienden?',
      a: `Damos servicio en ${site.coverage.join(', ')} y alrededores. Si estás en otra zona de la metrópoli, escríbenos y lo revisamos.`,
    },
    {
      q: '¿Qué marcas de aire acondicionado reparan y dan mantenimiento?',
      a: `Atendemos todas las marcas: minisplit, piso techo, ventana, fan & coil, paquete, divididos y evaporativos. En venta manejamos ${site.brands.map((b) => b.name).join(', ')}.`,
    },
    {
      q: '¿En cuánto tiempo pueden atenderme?',
      a: 'Normalmente programamos la visita el mismo día o al siguiente, en horario de lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 14:00. Si es una urgencia, dínoslo por WhatsApp para darte prioridad.',
    },
    {
      q: '¿Qué garantía ofrecen?',
      a: `Garantía por escrito: ${site.guarantees.installation} en instalación, ${site.guarantees.maintenance} en mantenimiento y, en equipos nuevos, la garantía de fábrica del fabricante. Además usamos refacciones originales.`,
    },
    {
      q: '¿Instalan equipos que compré en otro lugar?',
      a: 'Sí. Instalamos equipos comprados en tiendas o en línea. Revisamos que la capacidad sea adecuada para tu espacio y hacemos la instalación completa: tubería, eléctrico, drenaje y albañilería.',
    },
    {
      q: '¿Hacen refrigeración comercial o chillers?',
      a: 'No. Nos especializamos en aire acondicionado y climatización residencial, comercial e industrial. Sí realizamos revisión y diagnóstico de sistemas VRF.',
    },
  ],
  mantenimiento: [
    {
      q: '¿Qué incluye el mantenimiento preventivo de un minisplit?',
      a: 'Limpieza profunda de filtros, serpentines y turbina, revisión de presiones y carga de gas, revisión del sistema eléctrico y conexiones, lubricación, limpieza del drenaje y un diagnóstico completo del equipo con reporte.',
    },
    {
      q: '¿Cuánto tarda el servicio de mantenimiento?',
      a: 'Un minisplit residencial toma entre 60 y 90 minutos. Equipos piso techo, paquete o de mayor capacidad pueden requerir más tiempo; te lo indicamos al cotizar.',
    },
    {
      q: '¿Tienen pólizas de mantenimiento para empresas?',
      a: 'Sí. Diseñamos pólizas de mantenimiento programado para oficinas, comercios y naves con visitas periódicas, reporte por equipo y atención prioritaria en fallas.',
    },
    {
      q: '¿El mantenimiento incluye recarga de gas?',
      a: 'Incluye la verificación de presiones. Si el equipo tiene baja carga, primero buscamos la fuga y te cotizamos la reparación y recarga, porque recargar sin reparar la fuga solo pospone el problema.',
    },
  ],
  reparacion: [
    {
      q: '¿Cobran la visita de diagnóstico?',
      a: 'Cotizamos la visita de diagnóstico de forma clara antes de agendar, y te entregamos el presupuesto de la reparación por escrito para que decidas sin presión.',
    },
    {
      q: 'Mi aire acondicionado no enfría, ¿qué puede ser?',
      a: 'Las causas más comunes son filtros y serpentines sucios, baja carga de gas por una fuga, capacitor o compresor dañado, o una falla en la tarjeta electrónica. Con el diagnóstico te decimos exactamente qué es y cuánto cuesta repararlo.',
    },
    {
      q: '¿Usan refacciones originales?',
      a: 'Sí. Trabajamos con refacciones originales o equivalentes de calidad avaladas por el fabricante, y toda reparación lleva garantía por escrito.',
    },
    {
      q: '¿Conviene reparar o cambiar el equipo?',
      a: 'Si el equipo tiene más de 10 años, consume mucha energía o la reparación supera una parte importante del valor de uno nuevo, te lo decimos con honestidad y te cotizamos ambas opciones.',
    },
  ],
  instalacion: [
    {
      q: '¿Qué capacidad de minisplit necesito para mi espacio?',
      a: 'Depende de los metros cuadrados, la altura, la orientación, las ventanas y el número de personas o equipos que generan calor. Como referencia, una recámara promedio usa 1 tonelada; hacemos el cálculo en la visita para que no compres de más ni de menos.',
    },
    {
      q: '¿La instalación incluye la parte eléctrica y la albañilería?',
      a: 'Sí. Dejamos el equipo funcionando completo: tubería de cobre, cableado y protección eléctrica, drenaje, perforaciones, resanes y acabados. Un solo proveedor y un solo presupuesto.',
    },
    {
      q: '¿Cuánto tarda una instalación?',
      a: 'Un minisplit residencial se instala normalmente en medio día. Instalaciones con tramos largos de tubería, equipos piso techo o proyectos comerciales se programan según el alcance que acordamos en la cotización.',
    },
    {
      q: '¿Qué garantía tiene la instalación?',
      a: `${site.guarantees.installation} de garantía por escrito en la mano de obra, además de la garantía de fábrica del equipo.`,
    },
  ],
}
