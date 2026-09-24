/**
 * Lista de precios que el asistente puede mencionar (Tony, 23-sep-2026).
 * Si está vacía, el asistente NO da precios y ofrece cotización sin compromiso.
 */
export type Precio = { servicio: string; precio: string; nota?: string }

export const precios: Precio[] = [
  {
    servicio: 'Mantenimiento preventivo de minisplit / equipos de 1 a 3 toneladas',
    precio: '$1,100 por equipo (1 o 2 equipos); $950 por equipo a partir de 3 equipos',
    nota: 'limpieza profunda, revisión de gas y eléctrica; 30 días de garantía',
  },
  { servicio: 'Mantenimiento de fan & coil de 1 a 5 toneladas', precio: '$1,450 por equipo' },
  {
    servicio: 'Mantenimiento de unidad paquete / roof top o unidad dividida de 3 a 10 toneladas',
    precio: '$1,700 por equipo',
  },
  {
    servicio: 'Mantenimiento de unidad paquete / roof top o unidad dividida de 12.5 a 25 toneladas',
    precio: '$2,900 por equipo',
  },
  { servicio: 'Recarga de gas refrigerante (R22, R32 o R410A)', precio: '$1,000' },
  {
    servicio: 'Instalación básica de minisplit',
    precio: '$2,500',
    nota: 'incluye hasta 4 metros de tubería y cable de comunicación/señal; 90 días de garantía',
  },
  {
    servicio: 'Instalación eléctrica para el equipo',
    precio: '$900 de mano de obra más materiales',
  },
  { servicio: 'Cable de uso rudo 2x12 para alimentación eléctrica', precio: '$65 por metro' },
  { servicio: 'Cable 4x14 para señal', precio: '$50 por metro' },
  { servicio: 'Aislante térmico con cinta momia o impermeable (tramo de 1.80 m)', precio: '$550' },
  {
    servicio: 'Visita de revisión y diagnóstico (reparaciones)',
    precio: '$800',
    nota: 'si el cliente autoriza la cotización, los $800 se toman a cuenta del servicio',
  },
]

export const politicaPrecios = `Precios en pesos mexicanos MÁS IVA, por equipo. Los mantenimientos por volumen (3 o más equipos) tienen precio preferente. Todo trabajo adicional (tubería extra, materiales, albañilería) y cualquier servicio que no esté en esta lista lo cotiza un asesor personalizado, normalmente tras revisión en sitio. Formas de pago: las confirma el asesor al agendar.`
