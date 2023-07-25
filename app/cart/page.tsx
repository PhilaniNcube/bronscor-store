import CartDetails from "./CartDetails";
import { cookies } from "next/headers";
import { Database } from "@/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

const page = async () => {

const supabase = createServerComponentClient<Database>({ cookies });

const {data: {session}} = await supabase.auth.getSession();

  return (
    <main className="container my-6">
      <CartDetails userId={session?.user.id} />
    </main>
  );
};
export default page;
