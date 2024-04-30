
import { createClient } from "@/utils/supabase/server"




  export const getAdmin = async () => {
     const supabase = createClient()

     const {data:is_admin, error} = await supabase.rpc("is_admin")

     if(error) {
        console.error(error)
        return false
     }

      return is_admin

  }


  export const getProfile = async (id:string) => {

   const supabase = createClient()

    const {data:profile, error} = await supabase.from("profiles").select('*').eq('id', id).single()

    if (error) {
     console.error("What",error)
     return null
    }

    return profile

  }


  //   export const getSession = async () => {

  //  const supabase = createClient()

  //   const session = await supabase.auth.getSession()



  //   return session

  // }


  export const getProfiles = async (page = 1, page_size = 8) => {

      const start = (page - 1) * page_size;
  const end = page * page_size - 1

  const supabase = createClient()

  const {data:profiles, error, count} = await supabase.from("profiles").select('*', {count: "exact"}).order('first_name', {ascending: true})

  if (error) {
    throw new Error(error.message);
  }

  return {profiles, count}

  }
