# Asistente automático de WhatsApp (API de WhatsApp Cloud)

El sitio incluye un webhook en `app/api/whatsapp/route.ts` que recibe los mensajes del
número **33 2456 8104** y responde solo: saluda, ofrece un menú de servicios, pide tipo de
equipo, zona, nombre y detalle, confirma al cliente y avisa al equipo por correo (Netlify
Forms → administracion@climexsi.com) y, opcionalmente, por WhatsApp.

- Conversación: `lib/whatsapp/flow.ts` (textos, menú, preguntas frecuentes por palabras clave)
- Envío a Meta: `lib/whatsapp/api.ts` · Estado por cliente: `lib/whatsapp/store.ts` (Netlify Blobs)
- Horario: `lib/whatsapp/hours.ts` · Avisos al equipo: `lib/whatsapp/notify.ts`

Comandos que entiende el cliente en cualquier momento: **menu** (empezar de nuevo) y
**asesor** (pasa a una persona: el bot deja de contestar y avisa al equipo).

## Lo que hay que hacer en Meta (una sola vez)

> Importante: al registrar el número en la API, ese número **deja de funcionar en la app
> WhatsApp / WhatsApp Business del teléfono**. Los mensajes llegan al webhook y las respuestas
> humanas se hacen desde una bandeja web o desde otro número. Antes de hacerlo, exporta o
> respalda los chats en la app (Ajustes → Chats → Copia de seguridad).

1. **Cuenta de Meta Business**: https://business.facebook.com → crear cuenta con el nombre
   "Climex Soluciones Integrales". Usa tu correo climexgdl@gmail.com.
2. **App de desarrollador**: https://developers.facebook.com/apps → "Crear app" → tipo
   *Empresa* → nombre "Climex WhatsApp" → asociar a la cuenta de Meta Business.
3. En la app, agrega el producto **WhatsApp** → "Configuración de la API".
   - Ahí aparece un número de prueba. Para usar el real: "Agregar número de teléfono" →
     33 2456 8104 → verificación por SMS/llamada. (El número no debe estar activo en ninguna
     app de WhatsApp en ese momento: en el teléfono, Ajustes → Cuenta → Eliminar cuenta.)
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

Con el número en la API, los asesores no pueden contestar desde la app del teléfono. Opciones:

1. **Llamar o escribir desde otro número** (el de cada técnico). El bot le dice al cliente
   "un asesor te contacta" y el aviso trae el teléfono del cliente. Es lo más simple.
2. **Bandeja web**: una página del sitio para ver y contestar chats a través de la API.
   Se puede construir después si hace falta.

## Probar sin Meta

Sin `WA_TOKEN` el webhook está en modo prueba: no envía nada y devuelve en JSON los mensajes
que habría mandado. Con el servidor local corriendo:

```bash
curl -s -X POST http://localhost:3001/api/whatsapp -H 'Content-Type: application/json' \
  -d '{"entry":[{"changes":[{"value":{"contacts":[{"profile":{"name":"Prueba"}}],"messages":[{"id":"1","from":"5213300000000","type":"text","text":{"body":"hola"}}]}}]}]}'
```

Para cambiar textos o preguntas, edita `lib/whatsapp/flow.ts`.
