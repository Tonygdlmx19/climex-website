# Póliza de garantía

`garantia-climex.html` es la fuente de la póliza. De ahí salen dos cosas:

1. **PDF genérico para el sitio** (`public/garantia-climex.pdf`, botón "Descargar póliza" en `/garantias`).
   Se genera con `./scripts/build-garantia-pdf.sh`; los campos de "Datos de esta póliza" van vacíos.
2. **Póliza por servicio** (para Climex One). El bloque "Datos de esta póliza" al inicio del documento
   tiene un `<span data-field="...">` por dato. El sistema llena esos spans con la información del
   servicio y convierte el HTML a PDF (Chrome headless, Puppeteer, o el motor de PDF que use Climex One).

## Campos (`data-field`)

| Campo | Contenido |
| --- | --- |
| `cliente` | Nombre o razón social |
| `folio` | Folio / nota de servicio |
| `fecha_entrega` | Fecha de entrega del trabajo (inicio de la garantía) |
| `vigencia_hasta` | Fecha de entrega + 90 días (instalación y reparación) o + 30 días (mantenimiento) |
| `servicio` | Instalación, reparación o mantenimiento preventivo, con detalle breve |
| `equipo` | Marca, modelo y capacidad |
| `tecnico` | Técnico responsable |
| `domicilio` | Domicilio donde se realizó el servicio |

Ejemplo mínimo de llenado (Node + Puppeteer):

```js
const html = fs.readFileSync('garantia-climex.html', 'utf8')
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate((d) => {
  for (const [k, v] of Object.entries(d)) {
    const el = document.querySelector(`[data-field="${k}"]`)
    if (el) el.textContent = v
  }
}, { cliente: 'Juan Pérez', folio: 'A-1024', fecha_entrega: '28/09/2026', vigencia_hasta: '27/12/2026', servicio: 'Instalación de minisplit 1 TR', equipo: 'Mirage X32 12,000 BTU', tecnico: 'Luis Ramírez', domicilio: 'Av. Patria 1234, Zapopan' })
await page.pdf({ path: 'poliza-A-1024.pdf', format: 'Letter', printBackground: true })
```

La ruta del logo en el HTML es relativa (`../../public/images/logoClimex.png`); si el HTML se copia a otro
sistema, ajusta esa ruta o cámbiala por una URL absoluta (`https://climexsi.com/images/logoClimex.png`).
