import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/schema'

export const getProducts = async (page = 1, page_size = 10) => {

  const start = (page - 1) * page_size;
  const end = page * page_size - 1

  const supabase = createServerComponentClient<Database>({cookies})

  const {data:products, error, count} = await supabase.from("products").select('*, brand_id(name), category_id(name)', {count: "exact"}).range(start, end).limit(page_size)

  if (error) {
    throw new Error(error.message);
  }

  return {products, count}

}
