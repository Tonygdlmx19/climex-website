import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { landings } from '@/lib/landings'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...landings.map((l) => ({ url: `${site.url}/${l.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: `${site.url}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/proyectos`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/nosotros`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
