import { getBrands } from "@/lib/brands";
import { getCategories } from "@/lib/categories";
import { getProductById } from "@/lib/products";
import UpdateProduct from "./UpdateProduct";

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
    <div>
      <UpdateProduct categories={categories} brands={brands} product={product} />
    </div>
  );
};
export default page;
