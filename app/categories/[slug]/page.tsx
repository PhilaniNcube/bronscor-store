import ProductItem from "@/components/Products/ProductItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Database } from "@/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const page = async ({params: {slug}}:{params:{slug:string}}) => {

  const supabase = createServerComponentClient<Database>({ cookies });

const {data:category, error:category_error} = await supabase.from("categories").select("*").eq("slug", slug).single();

const {data:products, error:products_error} = await supabase.from("products").select("*").eq("category_id.slug", slug );




  return (
    <main className="container my-6">
      <h1 className="text-2xl md:text-4xl font-medium">{category?.name}</h1>
      <Separator className="my-4" />
      {products?.length === 0 || !products || products_error ? (
        <div className="flex w-full justify-between items-center">
          <p className="text-xl">No products found</p>
          <Link href="/">
            <Button
              className="bg-amber-600 text-black hover:text-amber-600"
              type="button"
            >
              Back to Homepage
            </Button>
          </Link>
        </div>
      ) : (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};
export default page;
