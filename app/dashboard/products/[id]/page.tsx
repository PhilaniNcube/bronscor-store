import { getBrands } from "@/lib/brands";
import { getCategories } from "@/lib/categories";
import { getProductById } from "@/lib/products";
import UpdateProduct from "./UpdateProduct";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async ({params: {id}}:{params: {id:string}}) => {

  const productData = getProductById(id);

  const brandsData = getBrands();
  const categoriesData = getCategories();

  const [brands, categories, product] = await Promise.all([
    brandsData,
    categoriesData,
    productData,
  ]);

  return (
    <div className="w-full">
      <div className="flex justify-start mb-4">
        <Link href="/dashboard/products">
          <Button className="bg-amber-500 text-black hover:bg-amber-500/80">Back to Products</Button>
        </Link>
      </div>
      <UpdateProduct categories={categories} brands={brands} product={product} />
    </div>
  );
};
export default page;
