import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/schema'

export const getCategories = async () => {

      const supabase = createServerComponentClient<Database>({cookies})

      const {data:categories, error} = await supabase.from("categories").select('*')

      if (error) {
        throw new Error(error.message);
      }

      return categories

}


export const getCategory = async (slug:string) => {

        const supabase = createServerComponentClient<Database>({cookies})

        const {data:categories, error} = await supabase.from("categories").select('*').eq('slug', slug).single()

        if (error) {
          throw new Error(error.message);
        }

        return categories
}
