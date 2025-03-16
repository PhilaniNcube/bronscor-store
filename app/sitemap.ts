import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/products'
import { getCategories } from '@/lib/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://store.bronscorcc.co.za'
  
  // Static routes - excluding dashboard, auth, api, and account routes
  const staticRoutes = [
    '',
    '/products',
    '/categories',
    '/cart',
    '/checkout/success',
    '/checkout/cancel',
    '/contact-us',
    '/privacy-policy',
    '/terms-and-conditions',
    '/returns-and-refunds',
    '/shipping-and-delivery',
    '/forgot-password',
    '/reset-password',
    '/search',
    '/wishlist',
    '/steel',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/products' ? 'daily' : 'weekly' as 'daily' | 'weekly',
    priority: route === '' ? 1 : route === '/products' ? 0.9 : 0.7,
  }))

  // Fetch all products to generate product routes
  const { products } = await getProducts(1, 1000) // Fetch up to 1000 products

  // Map each product to its URL
  const productRoutes = products.map(product => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.8,
  }))

  // Fetch all categories
  const categories = await getCategories()

  // Map each category to its URL
  const categoryRoutes = categories.map(category => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.8,
  }))

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
  ]
}