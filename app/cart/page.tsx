import  { getProfile } from "@/lib/getUser";
import CartDetails from "./CartDetails";
import { cookies } from "next/headers";
import { Database } from "@/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const page = async () => {


const supabase = createServerComponentClient<Database>({ cookies });

const {data: {user}} = await supabase.auth.getUser();

console.log("User", user)

const profile = await getProfile()

  return (
    <main className="container my-6">
      <CartDetails userId={user?.id} />
    </main>
  );
};
export default page;
