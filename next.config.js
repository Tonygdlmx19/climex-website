/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Rutas del sitio anterior (Jimdo) que siguen recibiendo tráfico de anuncios.
    return [
      { source: '/cotizaciones-y-servicio', destination: '/contacto', permanent: true },
      { source: '/cotizaciones-y-servicio/', destination: '/contacto', permanent: true },
      { source: '/cotizaciones', destination: '/contacto', permanent: true },
      { source: '/servicios-1', destination: '/servicios', permanent: true },
    ]
  },
}

module.exports = nextConfig
