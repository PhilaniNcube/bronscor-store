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
      <div className="w-full p-4 bg-slate-300 rounded-lg">
        <h1 className="text-3xl font-semibold text-black">
          Create New Product
        </h1>
        <Separator className="w-full my-4 text-bronscor" />

       <ProductForm brands={brands} categories={categories} />
      </div>
      <div className="w-1/3 bg-slate-100 border border-slate-400 rounded-lg"></div>
    </div>
  );
};
export default page;
