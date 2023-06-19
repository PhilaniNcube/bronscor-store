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
