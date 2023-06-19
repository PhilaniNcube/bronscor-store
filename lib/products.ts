import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/schema'

export const getProducts = async (page = 1, page_size = 8) => {

  const start = (page - 1) * page_size;
  const end = page * page_size - 1

  const supabase = createServerComponentClient<Database>({cookies})

  const {data:products, error, count} = await supabase.from("products").select('*, brand_id(id, name), category_id(id, name)', {count: "exact"}).range(start, end).order('name', {ascending: true})

  if (error) {
    throw new Error(error.message);
  }

  return {products, count}

}


export const getProductById = async (id: string) => {

    const supabase = createServerComponentClient<Database>({cookies})

    const {data:product, error} = await supabase.from("products").select('*, brand_id(*), category_id(*)').eq('id', id).single()

    if (error) {
      throw new Error(error.message);
    }

    return product

}


export const getProductBySlug = async (slug: string) => {

    const supabase = createServerComponentClient<Database>({cookies})

    const {data:product, error} = await supabase.from("products").select('*, brand_id(*), category_id(*)').eq('slug', slug).single()

    if (error) {
      throw new Error(error.message);
    }

    return product

}


export const getFeaturedProducts = async () => {

    const supabase = createServerComponentClient<Database>({cookies})

    const {data:products, error} = await supabase.from("products").select('*, brand_id(*), category_id(*)').eq('featured', true).limit(4)

    if (error) {
      throw new Error(error.message);
    }

    return products

}




export const getProductsByCategoryBySlug = async (slug:string) => {

    const supabase = createServerComponentClient<Database>({cookies})

    const {data:products, error} = await supabase.from("products").select('*, brand_id(*), category_id!inner(id,name,slug )').eq('category_id.slug', `${slug}`)

    if (error) {
      throw new Error(error.message);
    }

    return products

}
