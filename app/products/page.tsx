import {  getProducts } from "@/lib/products";

const page = async () => {

  const productsData = getProducts(1, 12)

  const [products] = await Promise.all([productsData]);


  return <main className="container py-6">Products</main>;
};
export default page;
