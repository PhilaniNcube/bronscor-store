import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/auth/', '/api/', '/account/'],
    },
    sitemap: 'https://store.bronscorcc.co.za/sitemap.xml',
  }
}