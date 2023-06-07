import { supabase } from "./utils"

  const getUser = async () => {
   const {data, error} = await supabase.auth.getUser()
    if (error) console.log(error)
    console.log(data.user)
    return data.user
  }

  export default getUser
