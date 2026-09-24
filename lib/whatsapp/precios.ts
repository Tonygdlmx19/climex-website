/**
 * Lista de precios que el asistente puede mencionar.
 * Tony la actualiza aquí; si está vacía, el asistente NO da precios y ofrece
 * cotización sin compromiso.
 *
 * Formato libre por renglón: servicio, condición y precio. Ejemplos:
 *   { servicio: 'Mantenimiento minisplit 1 a 2 ton', precio: 'desde $650', nota: 'incluye limpieza profunda y revisión de gas' }
 */
export type Precio = { servicio: string; precio: string; nota?: string }

export const precios: Precio[] = [
  // Pendiente: lista de precios de Climex
]

export const politicaPrecios = `Los precios son "desde" e incluyen IVA salvo que se indique lo contrario. La cotización final depende de la revisión en sitio. Se aceptan efectivo, transferencia y tarjeta.`
