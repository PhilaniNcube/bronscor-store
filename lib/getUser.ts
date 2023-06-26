import { cookies } from "next/headers"
import { supabase } from "./utils"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/schema"

  const getUser = async () => {
   const {data, error} = await supabase.auth.getUser()
    if (error) console.log(error)
    console.log(data.user)
    return data.user
  }

  export default getUser


  export const getAdmin = async () => {

     const {data:is_admin} = await supabase.rpc("is_admin").single()

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


    export const getSession = async () => {

   const supabase = createServerComponentClient<Database>({cookies})

    const session = await supabase.auth.getSession()



    return session

  }


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
