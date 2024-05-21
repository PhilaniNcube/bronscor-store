import { createClient } from '@/utils/supabase/server';
import type { QueryData } from '@supabase/supabase-js';

export const getProducts = async (page = 1, page_size = 8) => {

  const start = (page - 1) * page_size;
  const end = page * page_size - 1

  const supabase = createClient()

  const {data:products, error, count} = await supabase.from("products").select('*, brand_id(id, name), category_id(id, name)', {count: "exact"}).range(start, end).order('name', {ascending: true})

  if (error) {
    throw new Error(error.message);
  }

  return {products, count}

}


export const getProductById = async (id: string) => {

    const supabase = createClient()

    const {data:product, error} = await supabase.from("products").select('*, brand_id(*), category_id(*)').eq('id', id).single()

    if (error) {
      throw new Error(error.message);
    }

    return product

}


export const getProductBySlug = async (slug: string) => {

    const supabase = createClient()

    const {data:product, error} = await supabase.from("products").select('*, brand_id(*), category_id(*)').eq('slug', slug).single()

    if (error) {
      throw new Error(error.message);
    }

    return product

}


export const getFeaturedProducts = async () => {

    const supabase = createClient()

    const {data:products, error} = await supabase.from("products").select('*, brand_id(*), category_id(*)').eq('featured', true).limit(4)

    if (error) {
      throw new Error(error.message);
    }

    return products

}




export const getProductsByCategoryBySlug = async (slug:string) => {

    const supabase = createClient()

    const {data:products, error} = await supabase.from("products").select('*, brand_id(*), category_id!inner(id,name,slug )').eq('category_id.slug', `${slug}`)

    if (error) {
      throw new Error(error.message);
    }

    return products

}


export const getProductsByCategoryId = async (id:number) => {

    const supabase = createClient()

    const {data:products, error} = await supabase.from("products").select('*, brand_id(*), category_id(*)').eq('category_id', `${id}`)

    if (error) {
      throw new Error(error.message);
    }

    return products

}




export const getSteelProducts = async () => {
  const supabase = createClient()

  const {data, error} = await supabase.from("steel").select('*')

  if (error) {
    throw new Error(error.message);
  }

  return data
}


export const getProductCategoriesByProductId = async (product_id:string) => {

  const supabase = createClient()

  const {data, error} = await supabase.from("product_categories").select('*').eq('product_id', product_id)

  if (error || data === null) {
    throw new Error(error.message);
  }

  console.log(data)

  return data

}


export const getProductsCategoryId = async (category_id:number) => {

  const supabase = createClient()

  const productsQuery = supabase.from("product_categories").select('*,product:products(image, name,slug, id, price,in_stock)').eq('category_id', category_id)

  // get the type of the query
		type ProductsWithCategory = QueryData<typeof productsQuery>;

    const {data, error} = await productsQuery


  if (error || data === null) {
    throw new Error(error.message || "No data found");
  }

  console.log(data)


  const products = data as ProductsWithCategory;

  const returnedProducts = products.map((item) => item.product)



  return returnedProducts;


}
