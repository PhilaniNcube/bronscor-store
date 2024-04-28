import CartDetails from "./CartDetails";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

const page = async () => {

const supabase = createClient();

const {
	data: {user}
} = await supabase.auth.getUser();

  return (
    <main className="container my-6">
      <CartDetails userId={user?.id} />
    </main>
  );
};
export default page;
