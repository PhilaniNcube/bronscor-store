import ProductItem from "@/components/Products/ProductItem";
import { Separator } from "@/components/ui/separator";
import type { Database } from "@/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const page = async () => {

const supabase = createServerComponentClient<Database>({cookies});

const {data:wishlist, error} = await supabase.from("wishlist").select("*, product_id(*)");

console.log(wishlist)



  return <main className="container py-10">
    <h1 className="text-3xl font-semibold">Wishlist</h1>
    <Separator className="my-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {wishlist?.map((item, idx) => (
        <ProductItem key={idx} product={item?.product_id} />
      ))}
    </div>
  </main>;
};
export default page;
