import { cookies } from "next/headers"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/schema"




  export const getAdmin = async () => {
     const supabase = createServerComponentClient<Database>({cookies})

     const {data:is_admin, error} = await supabase.rpc("is_admin").single()

     if(error) {
        console.error(error)
        return false
     }

      return is_admin

  }


  export const getProfile = async () => {

   const supabase = createServerComponentClient<Database>({cookies})

    const {data:profile, error} = await supabase.from("profiles").select('*').single()

    if (error) {
     console.error(error)
     return null
    }

    return profile

  }


  //   export const getSession = async () => {

  //  const supabase = createServerComponentClient<Database>({cookies})

  //   const session = await supabase.auth.getSession()



  //   return session

  // }


  export const getProfiles = async (page = 1, page_size = 8) => {

      const start = (page - 1) * page_size;
  const end = page * page_size - 1

  const supabase = createServerComponentClient<Database>({cookies})

  const {data:profiles, error, count} = await supabase.from("profiles").select('*', {count: "exact"}).range(start, end).order('first_name', {ascending: true})

  if (error) {
    throw new Error(error.message);
  }

  return {profiles, count}

  }
