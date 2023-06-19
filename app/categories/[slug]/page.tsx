import ProductItem from "@/components/Products/ProductItem";
import { Separator } from "@/components/ui/separator";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategoryBySlug } from "@/lib/products";

const page = async ({params: {slug}}:{params:{slug:string}}) => {


const categoryData =  getCategoryBySlug(slug);

const productsData =  getProductsByCategoryBySlug(slug);

const [category, products] = await Promise.all([categoryData, productsData])

  return <main className="container my-6">
    <h1 className="text-2xl md:text-4xl font-medium">{category.name}</h1>
    <Separator />
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>

  </main>;
};
export default page;
