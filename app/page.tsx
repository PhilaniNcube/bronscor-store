import Image from 'next/image'
import type { Metadata } from "next";
import { getFeaturedProducts } from '@/lib/products';
import HomepageHero from './HomepageHero';
import FeaturedProducts from './FeaturedProducts';
import { getCategories } from '@/lib/categories';
import CategoriesGrid from '@/components/Categories/CategoriesGrid';

export const metadata: Metadata = {
  title: "Bronscor",
  description:
    "Suppliers of Special Steels, Castings, 3D Printing Works and Tools & Hardware",
 assets: ['/images/logo.png']
};

export default async function Home() {

  const productsData =  getFeaturedProducts()
  const categoriesData = getCategories()

  const [products, categories] = await Promise.all([productsData, categoriesData])

  return (
    <main className="">
      <HomepageHero />
      <FeaturedProducts products={products} />
      <CategoriesGrid categories={categories} />
    </main>
  )
}
