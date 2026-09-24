# Asistente automático de WhatsApp (API de WhatsApp Cloud)

El sitio incluye un webhook en `app/api/whatsapp/route.ts` que recibe los mensajes de un
**número nuevo dedicado al asistente** (la "recepción") y responde solo: saluda, ofrece un menú de servicios, pide tipo de
equipo, zona, nombre y detalle, confirma al cliente y avisa al equipo por correo (Netlify
Forms → administracion@climexsi.com) y, opcionalmente, por WhatsApp.

- Conversación: `lib/whatsapp/flow.ts` (textos, menú, preguntas frecuentes por palabras clave)
- Envío a Meta: `lib/whatsapp/api.ts` · Estado por cliente: `lib/whatsapp/store.ts` (Netlify Blobs)
- Horario: `lib/whatsapp/hours.ts` · Avisos al equipo: `lib/whatsapp/notify.ts`

Comandos que entiende el cliente en cualquier momento: **menu** (empezar de nuevo) y
**asesor** (pasa a una persona: el bot deja de contestar y avisa al equipo).

## Lo que hay que hacer en Meta (una sola vez)

> Esquema de dos números:
> - **Número nuevo (bot)**: se registra en la API. Es el que se publica en el sitio, los anuncios
>   y la ficha de Google. Un número registrado en la API no puede usarse en la app del teléfono.
> - **33 2456 8104 (asesores)**: sigue en el teléfono con la app de siempre para clientes
>   antiguos y para contestar a los leads que el bot registra.
>
> Requisitos del número nuevo: que reciba SMS o llamada para verificarlo, y que **nunca haya
> tenido cuenta de WhatsApp** (o que se haya eliminado la cuenta desde la app antes). Sirve una
> SIM nueva o una línea fija que reciba llamadas.

1. **Cuenta de Meta Business**: https://business.facebook.com → crear cuenta con el nombre
   "Climex Soluciones Integrales". Usa tu correo climexgdl@gmail.com.
2. **App de desarrollador**: https://developers.facebook.com/apps → "Crear app" → tipo
   *Empresa* → nombre "Climex WhatsApp" → asociar a la cuenta de Meta Business.
3. En la app, agrega el producto **WhatsApp** → "Configuración de la API".
   - Ahí aparece un número de prueba. Para usar el real: "Agregar número de teléfono" →
     el número nuevo → verificación por SMS/llamada.
   - Copia el **Phone number ID** → variable `WA_PHONE_ID`.
4. **Token permanente**: Meta Business → Configuración del negocio → Usuarios → *Usuarios del
   sistema* → crear uno (rol Administrador) → "Generar token" → seleccionar la app, permisos
   `whatsapp_business_messaging` y `whatsapp_business_management`, caducidad *Nunca*.
   Copia el token → variable `WA_TOKEN`. (Los tokens temporales de la consola caducan en 24 h.)
5. **App secret**: app → Configuración de la app → Básica → "Clave secreta de la app" →
   variable `WA_APP_SECRET`.
6. **Webhook**: app → WhatsApp → Configuración → Webhook → "Editar":
   - URL de devolución de llamada: `https://climexsi.com/api/whatsapp`
   - Token de verificación: inventa una frase larga (ej. `climex-2026-verifica`) y ponla
     igual en la variable `WA_VERIFY_TOKEN` **antes** de pulsar "Verificar y guardar".
   - En "Campos del webhook" suscribe **messages**.
7. **Verificación de la empresa** (Meta Business → Centro de seguridad): sube acta o
   comprobante fiscal. Sin verificar, el límite es 250 conversaciones iniciadas por el negocio
   al día y el nombre no se muestra; las respuestas a clientes que escriben primero no
   tienen límite.
8. **Perfil del número**: WhatsApp → Perfil → nombre "Climex Soluciones Integrales", foto
   (logo), dirección, horario, sitio web https://climexsi.com, descripción.

## Variables en Netlify

Netlify → proyecto *climexsi* → Site configuration → Environment variables:

| Variable | Valor |
| --- | --- |
| `WA_TOKEN` | token permanente del usuario del sistema |
| `WA_PHONE_ID` | Phone number ID del número |
| `WA_VERIFY_TOKEN` | la frase que pusiste en el webhook |
| `WA_APP_SECRET` | clave secreta de la app |
| `WA_TEAM_NUMBER` | (opcional) número del equipo para avisos, formato `521XXXXXXXXXX` |
| `WA_TEAM_TEMPLATE` | (opcional) nombre de la plantilla aprobada, ver abajo |

Después de guardar las variables, "Trigger deploy" para que la función las lea.

## Aviso al equipo por WhatsApp (opcional)

Meta solo permite escribir a alguien que no ha escrito en las últimas 24 h usando una
**plantilla aprobada**. Crea una en Meta Business → WhatsApp Manager → Plantillas de mensajes:

- Nombre: `nuevo_lead` · Categoría: *Utilidad* · Idioma: Español (MEX)
- Cuerpo:
  ```
  Nuevo contacto por WhatsApp 🔔
  Nombre: {{1}}
  Servicio: {{2}}
  Equipo: {{3}}
  Zona: {{4}}
  Detalle: {{5}}
  Responder: {{6}}
  ```
  Los seis parámetros se llenan en ese orden. Cuando esté aprobada, pon `WA_TEAM_TEMPLATE=nuevo_lead`.

## Cómo responden las personas

El bot le dice al cliente que un asesor le escribirá desde el **33 2456 8104** (valor en
`site.whatsappAsesores` de `lib/site.ts`). El aviso por correo trae el teléfono del cliente y un
enlace `wa.me` para abrir el chat desde ese número. Si más adelante hace falta contestar desde
el propio número del bot, se puede construir una bandeja web sobre la API.

## Cuando tengas el número nuevo

1. Cambia `site.whatsapp` en `lib/site.ts` al número nuevo (botones del sitio, barra móvil,
   formulario y JSON-LD se actualizan solos) y haz push.
2. Actualiza el vínculo "Cotiza por WhatsApp" en Google Ads y el chat de la ficha de Google.
3. Deja el 33 2456 8104 solo en la app del teléfono.

## Probar sin Meta

Sin `WA_TOKEN` el webhook está en modo prueba: no envía nada y devuelve en JSON los mensajes
que habría mandado. Con el servidor local corriendo:

```bash
curl -s -X POST http://localhost:3001/api/whatsapp -H 'Content-Type: application/json' \
  -d '{"entry":[{"changes":[{"value":{"contacts":[{"profile":{"name":"Prueba"}}],"messages":[{"id":"1","from":"5213300000000","type":"text","text":{"body":"hola"}}]}}]}]}'
```

Para cambiar textos o preguntas, edita `lib/whatsapp/flow.ts`.

## Modo IA (asistente conversacional)

Con la variable `ANTHROPIC_API_KEY` en Netlify, el webhook deja de usar el menú y conversa con
Claude (`lib/whatsapp/ai.ts`): asesora, responde con la lista de precios de
`lib/whatsapp/precios.ts` y, cuando el cliente quiere agendar, registra el lead (correo +
plantilla) con nombre, servicio, equipo, zona, detalle, horario preferido y resumen. Un asesor
confirma la cita desde el 33 2456 8104. Si el cliente pide una persona, avisa al equipo.
Sin clave, o si la IA falla, se usa el menú guiado. `ANTHROPIC_MODEL` cambia el modelo
(por defecto `claude-sonnet-5`). El cliente puede escribir "menu" para empezar de cero.

## Seguimiento de conversaciones a medias

`netlify/functions/whatsapp-followups.mts` corre cada 3 minutos y, para conversaciones sin lead
registrado donde el bot habló al último: a los 5 min manda un recordatorio, a la hora otro, y una
hora después una despedida cordial. No insiste si el cliente se despidió ni fuera de la ventana de
24 h. Textos en `lib/whatsapp/followups.ts`. Prueba manual: `/api/whatsapp/test-notify?key=…&followups=1`.
