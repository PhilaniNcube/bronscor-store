import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Database } from "@/schema";
import { type } from "os";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  products: Database["public"]["Tables"]["products"]["Row"][];
}

const FeaturedProducts = ({products}:Props) => {
  return <section className="py-8">
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <Separator className="" />
      <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))
        }
      </div>
    </div>
  </section>;
};
export default FeaturedProducts


type ProductProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
}

const Product = ({product}:ProductProps) => {
  return (
    <div className="relative rounded-md text-white overflow-clip border border-slate-300 flex flex-col @container ">
      <div className="flex w-full flex-col @sm:flex-row @lg:flex-col">
        <Image
          src={product.image}
          width={600}
          height={600}
          alt={product.name}
          className=" w-full @sm:w-1/3 @sm:p-2 h-full object-cover aspect-square"
        />
        <div className=" z-10 flex flex-col @sm:justify-center w-full p-4">
          <h3 className="text-lg font-semibold text-black">{product.name}</h3>
          <p className="text-sm text-gray-500">
            {formatCurrency(product.price)}
          </p>
          <Link href={`/products/${product.slug}`}>
            <Button className="mt-3 bg-bronscor hover:shadow-md hover:bg-black">View Product</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
