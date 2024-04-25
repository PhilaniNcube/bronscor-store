import { createClient } from '@/utils/supabase/server'

export const getBrands = async () => {

    const supabase = createClient()

    const {data:brands, error} = await supabase.from("brands").select('*')

    if (error) {
      throw new Error(error.message);
    }

    return brands

}


export const getBrand = async (slug:string) => {

    const supabase = createClient()

    const {data:brands, error} = await supabase.from("brands").select('*').eq('slug', slug).single()

    if (error) {
      throw new Error(error.message);
    }

    return brands

}
