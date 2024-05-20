import { getBrands } from "@/lib/brands";
import { getCategories } from "@/lib/categories";
import { getProductById, getProductCategoriesByProductId } from "@/lib/products";
import UpdateProduct from "./UpdateProduct";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async ({params: {id}}:{params: {id:string}}) => {



  const productData = getProductById(id);
  const brandsData = getBrands();
  const categoriesData = getCategories();
  const productCategoriesData = getProductCategoriesByProductId(id);
  console.log("Product ID", id)

  const [brands, categories, product, product_categories] = await Promise.all([
			brandsData,
			categoriesData,
			productData,
			productCategoriesData,
		]);

  return (
			<div className="w-full">
				<div className="flex justify-start mb-4">
					<Link href="/dashboard/products">
						<Button className="text-black bg-amber-500 hover:bg-amber-500/80">
							Back to Products
						</Button>
					</Link>
				</div>
				<UpdateProduct
					categories={categories}
					brands={brands}
					product={product}
					product_categories={product_categories}
				/>
			</div>
		);
};
export default page;
