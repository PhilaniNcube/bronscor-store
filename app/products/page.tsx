import ProductItem from "@/components/Products/ProductItem";
import {  getProducts } from "@/lib/products";



const page = async () => {

  const productsData = getProducts(1, 12);

  const [{products, count}] = await Promise.all([productsData]);


  return (
    <main className="container py-6">
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};
export default page;
