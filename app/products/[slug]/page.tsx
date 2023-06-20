import Link from "next/link";
import Image from 'next/image'
import { getProductBySlug } from "@/lib/products";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProductDetails from "./ProductDetails";

type PageProps = {
  params: {
    slug: string;
  }
}

const page = async({params: {slug}}:PageProps) => {

const product = await getProductBySlug(slug)

  return (
    <main className="container my-6">
     <ProductDetails product={product} />
    </main>
  );
};
export default page;
