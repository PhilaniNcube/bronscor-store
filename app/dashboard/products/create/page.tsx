import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ProductForm from "./ProductForm";
import { getBrands } from "@/lib/brands";
import { getCategories } from "@/lib/categories";

const page = async () => {

const brandsData = getBrands();
const categoriesData = getCategories();

const [brands, categories] = await Promise.all([brandsData, categoriesData])


  return (
    <div className="w-full flex gap-6 justify-between">
      <ProductForm brands={brands} categories={categories} />
    </div>
  );
};
export default page;
