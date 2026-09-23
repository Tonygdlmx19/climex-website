# Climex Soluciones Integrales — sitio web

Sitio de [climexsi.com](https://climexsi.com) hecho con Next.js 14 (App Router), Tailwind CSS y desplegado en Netlify.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

Node 20 (ver `.nvmrc`).

## Dónde cambiar las cosas

| Qué | Archivo |
| --- | --- |
| Teléfonos, WhatsApp, correo, dirección, horario, cobertura, marcas | `lib/site.ts` |
| Textos de los servicios (tarjetas, modal y página /servicios) | `lib/services.ts` |
| Fotos de trabajos (galería y /proyectos) | `lib/gallery.ts` + carpeta `public/trabajos/` |
| Opiniones de Google | `components/home/Testimonials.tsx` |
| Colores de marca (cian y azul marino del logo) | `tailwind.config.js` |
| Menú principal | `navigation` en `lib/site.ts` |

## Formulario de cotización (Netlify Forms)

El formulario `cotizacion` se envía a Netlify Forms. Para que Netlify lo detecte existe
`public/__forms.html` con los mismos campos que `components/ContactForm.tsx`. Si agregas un campo
nuevo, agrégalo en los dos lugares. Las respuestas llegan a **Netlify → Forms**; ahí puedes activar
notificaciones por correo a `administracion@climexsi.com`.

Además, cada formulario ofrece "Enviar por WhatsApp" con los datos ya escritos.

## Medición (Google Ads / GA4)

Define `NEXT_PUBLIC_GA_ID` (por ejemplo `G-XXXXXXX` o `AW-XXXXXXX`) en las variables de entorno de
Netlify y el sitio carga gtag automáticamente. Los eventos que se envían son:

- `contact_whatsapp` — clic en cualquier botón de WhatsApp (con `location`)
- `contact_call` — clic en un teléfono
- `contact_email` — clic en el correo
- `form_submit` — envío exitoso del formulario

Usa esos eventos como acciones de conversión en Google Ads.

## Variables de entorno

Ver `.env.example`. `NEXT_PUBLIC_SITE_URL` se usa para canonical, sitemap y datos estructurados.

## Redirecciones del sitio anterior

`next.config.js` redirige rutas del sitio viejo de Jimdo (por ejemplo `/cotizaciones-y-servicio`) a
`/contacto`. Cuando el dominio `climexsi.com.mx` apunte a este sitio, esas URLs seguirán funcionando.
