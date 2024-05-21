import ProductItem from "@/components/Products/ProductItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductsCategoryId } from "@/lib/products";
import type { Database } from "@/schema";
import { createClient } from "@/utils/supabase/server";

import Link from "next/link";

const page = async ({params: {slug}}:{params:{slug:string}}) => {

  const supabase = createClient()

const {data:category, error:category_error} = await supabase.from("categories").select("*").eq("slug", slug).single();

if (category_error) {
  console.error(category_error);
  return {
    notFound: true,
  };
}

  const {data:prductQuery, error} = await supabase
			.from("product_categories")
			.select("products(*)")
			.eq("category_id", category.id);

  const products = prductQuery?.map((product) => product.products);




  return (
    <main className="container my-6">
      <h1 className="text-2xl font-medium md:text-4xl">{category?.name}</h1>
      <Separator className="my-4" />
      {products?.length === 0 || !products  ? (
        <div className="flex items-center justify-between w-full">
          <p className="text-xl">No products found</p>
          <Link href="/">
            <Button
              className="text-black bg-amber-600 hover:text-amber-600"
              type="button"
            >
              Back to Homepage
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
          {products?.map((product, index) => (

            //@ts-ignore
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <ProductItem key={index} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};
export default page;
