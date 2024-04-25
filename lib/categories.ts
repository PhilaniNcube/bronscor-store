
import { createClient } from '@/utils/supabase/server'

export const getCategories = async () => {

      const supabase = createClient()

      const {data:categories, error} = await supabase.from("categories").select('*').order("name", { ascending: true })

      if (error) {
        throw new Error(error.message);
      }

      return categories

}


export const getCategory = async (id:number) => {

        const supabase = createClient()

        const {data:categories, error} = await supabase.from("categories").select('*').eq('id', id).single()

        if (error) {
          throw new Error(error.message);
        }

        return categories
}


export const getCategoryBySlug = async (slug:string) => {

        const supabase = createClient()

        const {data:categories, error} = await supabase.from("categories").select('*').eq('slug', slug).single()

        if (error) {
          throw new Error(error.message);
        }

        return categories
}
