/**
 * Prueba interna del aviso de leads (correo + WhatsApp al equipo).
 * GET /api/whatsapp/test-notify?key=<WA_VERIFY_TOKEN>
 */
import { NextRequest, NextResponse } from 'next/server'
import { notifyTeam } from '@/lib/whatsapp/notify'
import { readLog } from '@/lib/whatsapp/store'
import { send } from '@/lib/whatsapp/api'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('key') !== process.env.WA_VERIFY_TOKEN) {
    return new NextResponse('forbidden', { status: 403 })
  }
  const to = req.nextUrl.searchParams.get('to')
  if (to) {
    const r = await send({ type: 'text', to, body: `Prueba de envío directo de Climex a ${to} (${new Date().toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City' })})` })
    return NextResponse.json({ ok: true, to, result: r })
  }
  if (req.nextUrl.searchParams.get('log')) {
    return NextResponse.json({ ok: true, log: await readLog() })
  }
  const report = await notifyTeam({
    telefono: '5213300000000',
    nombre: 'Prueba interna',
    servicio: 'Mantenimiento',
    equipo: 'Minisplit 1 ton',
    zona: 'Providencia, Guadalajara',
    detalle: 'Prueba del sistema de avisos',
    horario: 'mañana por la mañana',
    acceso: 'azotea con escalera marina',
    resumen: 'Lead de prueba generado por /api/whatsapp/test-notify',
    origen: 'ia',
  })
  return NextResponse.json({ ok: true, report, env: { phoneId: !!process.env.WA_PHONE_ID, token: !!process.env.WA_TOKEN, team: process.env.WA_TEAM_NUMBER || '5213324568104 (default)' } })
}
