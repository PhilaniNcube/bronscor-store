import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/schema'

export const getBrands = async () => {

    const supabase = createServerComponentClient<Database>({cookies})

    const {data:brands, error} = await supabase.from("brands").select('*')

    if (error) {
      throw new Error(error.message);
    }

    return brands

}


export const getBrand = async (slug:string) => {

    const supabase = createServerComponentClient<Database>({cookies})

    const {data:brands, error} = await supabase.from("brands").select('*').eq('slug', slug).single()

    if (error) {
      throw new Error(error.message);
    }

    return brands

}
